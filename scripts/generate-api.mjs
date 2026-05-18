#!/usr/bin/env node
// pnpm api:generate:custom -- --input ./api.json
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'];
const API_PREFIX_PATTERN = /^\/api\/v\d+/;

const args = parseArgs(process.argv.slice(2));
const apiRoot = path.resolve(args.output ?? 'packages/shared/src/api');
const shouldUpdateEndpoints = !args.output || Boolean(args.endpoints);
const endpointsFile = path.resolve(
  args.endpoints ?? 'packages/shared/src/constants/endpoints.ts'
);
const folderFilter = args.folder ? normalizeFolderArg(args.folder) : null;

if (!args.input) {
  console.error(
    'Usage: pnpm api:generate:custom -- --input <api-docs-url-or-json-file> [folderName]'
  );
  process.exit(1);
}

const openApi = await loadOpenApi(args.input);
const schemas = openApi.components?.schemas ?? {};
const existingEndpointEntries = shouldUpdateEndpoints
  ? await readEndpointEntries(endpointsFile)
  : new Map();
const existingEndpointKeyByPath = new Map(
  [...existingEndpointEntries].map(([key, value]) => [value, key])
);
const operationsByDtoFile = collectOperations(
  openApi.paths ?? {},
  existingEndpointKeyByPath,
  folderFilter
);
const stats = {
  apiCreated: 0,
  apiSkipped: 0,
  dtoAdded: 0,
};

if (shouldUpdateEndpoints) {
  await writeEndpointEntries(endpointsFile, [
    ...existingEndpointEntries,
    ...collectEndpointEntries(operationsByDtoFile),
  ]);
}

for (const group of operationsByDtoFile.values()) {
  await fs.mkdir(group.dir, { recursive: true });

  const dtoFile = path.join(group.dir, `${group.folderName}.dto.ts`);
  const mapperFile = path.join(group.dir, `${group.folderName}.mapper.ts`);

  const dtoParts = createDtoParts(group);
  stats.dtoAdded += await ensureDtoFile(dtoFile, dtoParts);
  await ensureMapperFile(mapperFile, group.mapperName);

  for (const operation of group.operations) {
    const apiFile = path.join(group.dir, `${operation.functionName}.api.ts`);

    if (await hasApiSource(group.dir, operation.functionName, apiFile)) {
      stats.apiSkipped += 1;
      continue;
    }

    await fs.writeFile(apiFile, createApiSource(operation, group));
    stats.apiCreated += 1;
  }
}

console.log(
  `${folderFilter ? `Folder filter: ${folderFilter}. ` : ''}Created ${stats.apiCreated} API file(s), skipped ${stats.apiSkipped} existing API file(s), added ${stats.dtoAdded} DTO declaration(s).`
);

function parseArgs(argv) {
  const parsed = {
    positional: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--input' || arg === '-i') {
      parsed.input = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith('--input=')) {
      parsed.input = arg.slice('--input='.length);
      continue;
    }

    if (arg === '--output' || arg === '-o') {
      parsed.output = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith('--output=')) {
      parsed.output = arg.slice('--output='.length);
      continue;
    }

    if (arg === '--endpoints') {
      parsed.endpoints = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith('--endpoints=')) {
      parsed.endpoints = arg.slice('--endpoints='.length);
      continue;
    }

    if (arg === '--folder') {
      parsed.folder = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith('--folder=')) {
      parsed.folder = arg.slice('--folder='.length);
      continue;
    }

    if (!arg.startsWith('-')) {
      parsed.positional.push(arg);
    }
  }

  parsed.input ??= process.env.API_DOCS_URL ?? process.env.SWAGGER_URL;
  parsed.folder ??= parsed.positional.at(-1);

  return parsed;
}

async function loadOpenApi(input) {
  if (/^https?:\/\//.test(input)) {
    const response = await fetch(input);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${input}: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  const source = await fs.readFile(path.resolve(input), 'utf8');

  return JSON.parse(source);
}

async function readEndpointEntries(file) {
  try {
    const source = await fs.readFile(file, 'utf8');
    const entries = new Map();
    const objectMatch = source.match(
      /API_ENDPOINTS\s*=\s*\{([\s\S]*?)\}\s*as const/
    );

    if (!objectMatch) {
      return entries;
    }

    for (const match of objectMatch[1].matchAll(
      /([A-Z0-9_]+):\s*['"`]([^'"`]+)['"`]/g
    )) {
      entries.set(match[1], match[2]);
    }

    return entries;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return new Map();
    }

    throw error;
  }
}

async function writeEndpointEntries(file, entries) {
  const merged = new Map(entries);
  const existingSource = await readTextFile(file);
  const existingEntries = await readEndpointEntries(file);
  const missingEntries = [...merged].filter(
    ([key]) => !existingEntries.has(key)
  );

  if (missingEntries.length === 0 && existingSource) {
    return;
  }

  if (merged.size === 0 && !existingSource) {
    return;
  }

  if (existingSource) {
    const missingSource = missingEntries
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, value]) => `  ${key}: '${value}',`)
      .join('\n');

    await fs.writeFile(
      file,
      existingSource.replace(
        /\n?\}\s*as const;/,
        `\n${missingSource}\n} as const;`
      )
    );

    return;
  }

  const source = `// packages/shared/src/constants/endpoints.ts
export const API_ENDPOINTS = {
${[...merged]
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([key, value]) => `  ${key}: '${value}',`)
  .join('\n')}
} as const;
`;

  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, source);
}

function collectEndpointEntries(operationsByDtoFile) {
  const entries = new Map();

  for (const group of operationsByDtoFile.values()) {
    for (const operation of group.operations) {
      entries.set(operation.endpointKey, operation.apiPath);
    }
  }

  return entries;
}

function collectOperations(paths, existingEndpointKeyByPath, folderFilter) {
  const groups = new Map();

  for (const [rawPath, pathItem] of Object.entries(paths)) {
    const resourcePath = stripApiPrefix(rawPath);
    const resourcePascal = toPascalCase(resourcePath);
    const endpointKey =
      existingEndpointKeyByPath.get(resourcePath) ??
      toEndpointKey(resourcePath);

    for (const method of HTTP_METHODS) {
      const operation = pathItem?.[method];

      if (!operation) {
        continue;
      }

      const tag = operation.tags?.[0] ?? 'default-controller';
      const folderName = tagToFolderName(tag);

      if (folderFilter && folderName !== folderFilter) {
        continue;
      }

      const dir = path.join(apiRoot, folderName);
      const groupKey = folderName;

      if (!groups.has(groupKey)) {
        groups.set(groupKey, {
          dir,
          folderName,
          mapperName: `${folderName}Mapper`,
          operations: [],
          referencedSchemas: new Set(),
          dtoImportsApiPage: false,
        });
      }

      const group = groups.get(groupKey);
      const functionName = `${method === 'get' ? 'fetch' : method}${resourcePascal}`;
      const parameters = [
        ...(pathItem.parameters ?? []),
        ...(operation.parameters ?? []),
      ];
      const queryParams = parameters.filter(
        (parameter) => parameter.in === 'query'
      );
      const pathParams = parameters.filter(
        (parameter) => parameter.in === 'path'
      );
      const bodySchema = getRequestBodySchema(operation);
      const responseInfo = getResponseInfo(operation);

      collectSchemaRefs(bodySchema, group.referencedSchemas);
      collectSchemaRefs(responseInfo?.dataSchema, group.referencedSchemas);

      const queryTypeName =
        queryParams.length > 0
          ? `${toPascalCase(functionName)}ParamsDto`
          : null;
      const pathTypeName =
        pathParams.length > 0 ? `${toPascalCase(functionName)}PathDto` : null;
      const bodyTypeName = bodySchema ? schemaToTypeName(bodySchema) : null;

      group.operations.push({
        method,
        rawPath,
        apiPath: resourcePath,
        endpointKey,
        summary: operation.summary,
        functionName,
        queryParams,
        pathParams,
        queryTypeName,
        pathTypeName,
        bodySchema,
        bodyTypeName,
        responseInfo,
      });
    }
  }

  for (const group of groups.values()) {
    for (const schemaName of [...group.referencedSchemas]) {
      collectNestedSchemaRefs(schemaName, group.referencedSchemas);
    }
  }

  return groups;
}

function getRequestBodySchema(operation) {
  return (
    operation.requestBody?.content?.['application/json']?.schema ??
    operation.requestBody?.content?.['*/*']?.schema ??
    null
  );
}

function getResponseInfo(operation) {
  const successResponse =
    operation.responses?.['200'] ??
    operation.responses?.['201'] ??
    operation.responses?.['204'] ??
    Object.entries(operation.responses ?? {}).find(([code]) =>
      code.startsWith('2')
    )?.[1];

  const schema =
    successResponse?.content?.['application/json']?.schema ??
    successResponse?.content?.['*/*']?.schema ??
    null;

  if (!schema) {
    return { wrapper: null, dataSchema: null, apiType: 'void' };
  }

  const resolved = resolveSchema(schema);
  const dataSchema = resolved?.properties?.data ?? schema;
  const wrapperName = refName(schema);
  const dataType = schemaToType(dataSchema);

  return {
    wrapper: isApiResponseSchema(resolved) ? wrapperName : null,
    dataSchema,
    apiType: dataType,
    isPage: isPageSchema(resolveSchema(dataSchema)),
    pageItemType: getPageItemType(resolveSchema(dataSchema)),
  };
}

function createDtoParts(group) {
  const declarations = [];
  const schemaNames = [...group.referencedSchemas].filter((schemaName) => {
    const schema = schemas[schemaName];

    return schema && !isApiResponseSchema(schema);
  });
  const requiresApiPage = schemaNames.some((schemaName) =>
    isPageSchema(schemas[schemaName])
  );

  for (const operation of group.operations) {
    if (operation.queryTypeName) {
      declarations.push(
        createParamsInterface(operation.queryTypeName, operation.queryParams)
      );
    }

    if (operation.pathTypeName) {
      declarations.push(
        createParamsInterface(operation.pathTypeName, operation.pathParams)
      );
    }
  }

  for (const schemaName of schemaNames.sort()) {
    declarations.push(createSchemaDeclaration(schemaName, schemas[schemaName]));
  }

  return {
    requiresApiPage,
    declarations: declarations.filter(Boolean),
  };
}

function createApiSource(operation, group) {
  const dtoImports = [
    operation.queryTypeName,
    operation.pathTypeName,
    operation.bodyTypeName,
    ...responseDtoImports(operation.responseInfo),
  ].filter(Boolean);
  const apiResponseImports = operation.responseInfo?.isPage
    ? ['ApiPageResponse']
    : ['ApiResponse'];
  const params = createFunctionParams(operation);
  const axiosArgs = createAxiosArgs(operation);
  const responseGeneric = createResponseGeneric(operation.responseInfo);
  const comment = operation.summary
    ? `/**\n * ${operation.summary}\n */\n`
    : '';
  const dtoImportSource =
    dtoImports.length > 0
      ? `import type { ${unique(dtoImports).join(', ')} } from './${group.folderName}.dto';\n`
      : '';

  return `import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ${apiResponseImports.join(', ')} } from '../types';
${dtoImportSource}import { ${group.mapperName} } from './${group.folderName}.mapper';

${comment}export const ${operation.functionName} = async (${params}) => {
  const response = await apiClient.${operation.method}<${responseGeneric}>(${axiosArgs});

  return ${group.mapperName}(response.data.data);
};
`;
}

function responseDtoImports(responseInfo) {
  if (!responseInfo || responseInfo.apiType === 'void') {
    return [];
  }

  if (responseInfo.isPage && responseInfo.pageItemType) {
    return [stripDtoSuffix(responseInfo.pageItemType)];
  }

  return getTypeIdentifiers(responseInfo.apiType)
    .map(stripDtoSuffix)
    .filter((name) => name.endsWith('Dto'));
}

function createFunctionParams(operation) {
  const parts = [];

  if (operation.pathTypeName) {
    parts.push(`pathParams: ${operation.pathTypeName}`);
  }

  if (operation.queryTypeName) {
    parts.push(`params: ${operation.queryTypeName}`);
  }

  if (operation.bodyTypeName) {
    parts.push(`body: ${operation.bodyTypeName}`);
  }

  if (parts.length === 0) {
    return '';
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return `options: {\n  ${parts.join(';\n  ')};\n}`;
}

function createAxiosArgs(operation) {
  const accessors = getParamAccessors(operation);
  const pathValue = operation.pathTypeName
    ? createEndpointPathExpression(operation, accessors.pathParams)
    : `API_ENDPOINTS.${operation.endpointKey}`;

  if (operation.method === 'get' || operation.method === 'delete') {
    const config = operation.queryTypeName
      ? createParamsConfig(accessors.params)
      : undefined;

    return config ? `${pathValue}, ${config}` : pathValue;
  }

  if (
    operation.pathTypeName &&
    operation.queryTypeName &&
    operation.bodyTypeName
  ) {
    return `${pathValue}, ${accessors.body}, ${createParamsConfig(accessors.params)}`;
  }

  if (operation.pathTypeName && operation.bodyTypeName) {
    return `${pathValue}, ${accessors.body}`;
  }

  if (operation.queryTypeName && operation.bodyTypeName) {
    return `${pathValue}, ${accessors.body}, ${createParamsConfig(accessors.params)}`;
  }

  if (operation.bodyTypeName) {
    return `${pathValue}, ${accessors.body}`;
  }

  if (operation.queryTypeName) {
    return `${pathValue}, undefined, ${createParamsConfig(accessors.params)}`;
  }

  return pathValue;
}

function createParamsConfig(paramsAccessor) {
  return paramsAccessor === 'params'
    ? '{ params }'
    : `{ params: ${paramsAccessor} }`;
}

function getParamAccessors(operation) {
  const count = [
    operation.pathTypeName,
    operation.queryTypeName,
    operation.bodyTypeName,
  ].filter(Boolean).length;
  const prefix = count > 1 ? 'options.' : '';

  return {
    pathParams: `${prefix}pathParams`,
    params: `${prefix}params`,
    body: `${prefix}body`,
  };
}

function createEndpointPathExpression(operation, pathParamsAccessor) {
  const pathParamNames = [...operation.apiPath.matchAll(/\{([^}]+)\}/g)].map(
    (match) => match[1]
  );

  return pathParamNames.reduce(
    (expression, name) =>
      `${expression}.replace('{${name}}', String(${pathParamsAccessor}.${name}))`,
    `API_ENDPOINTS.${operation.endpointKey}`
  );
}

function createResponseGeneric(responseInfo) {
  if (!responseInfo || responseInfo.apiType === 'void') {
    return 'ApiResponse<void>';
  }

  if (responseInfo.isPage && responseInfo.pageItemType) {
    return `ApiPageResponse<${responseInfo.pageItemType}>`;
  }

  return `ApiResponse<${responseInfo.apiType}>`;
}

async function ensureDtoFile(dtoFile, dtoParts) {
  const source = await readTextFile(dtoFile);
  const existingExportNames = new Set(
    [...source.matchAll(/export\s+(?:interface|type)\s+([A-Za-z0-9_]+)/g)].map(
      (match) => match[1]
    )
  );
  const missingDeclarations = dtoParts.declarations.filter((declaration) => {
    const name = getDeclarationName(declaration);

    return name && !existingExportNames.has(name);
  });

  if (!source) {
    await fs.writeFile(dtoFile, createDtoSource(dtoParts));

    return dtoParts.declarations.length;
  }

  if (missingDeclarations.length === 0) {
    return 0;
  }

  const chunks = [];

  if (dtoParts.requiresApiPage && !hasApiPageImport(source)) {
    chunks.push("import type { ApiPage } from '../types';\n");
  }

  chunks.push(source.trimEnd());
  chunks.push(missingDeclarations.join('\n').trim());

  await fs.writeFile(dtoFile, `${chunks.filter(Boolean).join('\n\n')}\n`);

  return missingDeclarations.length;
}

function createDtoSource(dtoParts) {
  const chunks = [];

  if (dtoParts.requiresApiPage) {
    chunks.push("import type { ApiPage } from '../types';");
  }

  chunks.push(
    ...dtoParts.declarations.map((declaration) => declaration.trim())
  );

  return `${chunks.filter(Boolean).join('\n\n')}\n`;
}

async function hasApiSource(dir, functionName, expectedApiFile) {
  if (await fileExists(expectedApiFile)) {
    return true;
  }

  const entries = await fs.readdir(dir, { withFileTypes: true });
  const exportPattern = new RegExp(
    `export\\s+const\\s+${escapeRegExp(functionName)}\\b`
  );

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.api.ts')) {
      continue;
    }

    const source = await readTextFile(path.join(dir, entry.name));

    if (exportPattern.test(source)) {
      return true;
    }
  }

  return false;
}

async function ensureMapperFile(mapperFile, mapperName) {
  try {
    const source = await fs.readFile(mapperFile, 'utf8');

    if (!source.includes(`export const ${mapperName}`)) {
      await fs.appendFile(
        mapperFile,
        `\nexport const ${mapperName} = <T>(data: T): T => data;\n`
      );
    }
  } catch {
    await fs.writeFile(
      mapperFile,
      `export const ${mapperName} = <T>(data: T): T => data;\n`
    );
  }
}

async function readTextFile(file) {
  try {
    return await fs.readFile(file, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return '';
    }

    throw error;
  }
}

async function fileExists(file) {
  try {
    await fs.access(file);

    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }

    throw error;
  }
}

function hasApiPageImport(source) {
  return /import\s+type\s+\{[^}]*\bApiPage\b[^}]*\}\s+from\s+['"]\.\.\/types['"]/.test(
    source
  );
}

function getDeclarationName(declaration) {
  return declaration.match(
    /export\s+(?:interface|type)\s+([A-Za-z0-9_]+)/
  )?.[1];
}

function createParamsInterface(typeName, params) {
  const properties = params.map((parameter) => {
    const required = parameter.required ? '' : '?';
    const type = schemaToType(parameter.schema ?? {});

    return `  ${parameter.name}${required}: ${type};`;
  });

  return `export interface ${typeName} {\n${properties.join('\n')}\n}\n`;
}

function createSchemaDeclaration(schemaName, schema) {
  const typeName = schemaToTypeName({
    $ref: `#/components/schemas/${schemaName}`,
  });

  if (isPageSchema(schema)) {
    const itemType = getPageItemType(schema) ?? 'unknown';

    return `export type ${typeName} = ApiPage<${itemType}>;\n`;
  }

  if (schema?.type === 'object' || schema?.properties) {
    const required = new Set(schema.required ?? []);
    const properties = Object.entries(schema.properties ?? {}).map(
      ([name, property]) => {
        const optional = required.has(name) ? '' : '?';

        return `  ${name}${optional}: ${schemaToType(property)};`;
      }
    );

    return `export interface ${typeName} {\n${properties.join('\n')}\n}\n`;
  }

  return `export type ${typeName} = ${schemaToType(schema)};\n`;
}

function schemaToType(schema) {
  if (!schema) {
    return 'unknown';
  }

  if (schema.$ref) {
    return schemaToTypeName(schema);
  }

  if (schema.nullable) {
    const clone = { ...schema };
    delete clone.nullable;

    return `${schemaToType(clone)} | null`;
  }

  if (schema.enum) {
    return schema.enum.map((value) => `'${String(value)}'`).join(' | ');
  }

  if (schema.allOf) {
    return schema.allOf.map(schemaToType).join(' & ');
  }

  if (schema.oneOf || schema.anyOf) {
    return (schema.oneOf ?? schema.anyOf).map(schemaToType).join(' | ');
  }

  if (schema.type === 'array') {
    return `${schemaToType(schema.items)}[]`;
  }

  if (schema.type === 'integer' || schema.type === 'number') {
    return 'number';
  }

  if (schema.type === 'string') {
    return 'string';
  }

  if (schema.type === 'boolean') {
    return 'boolean';
  }

  if (schema.type === 'object' || schema.properties) {
    const required = new Set(schema.required ?? []);
    const properties = Object.entries(schema.properties ?? {}).map(
      ([name, property]) => {
        const optional = required.has(name) ? '' : '?';

        return `${name}${optional}: ${schemaToType(property)}`;
      }
    );

    return properties.length > 0
      ? `{ ${properties.join('; ')} }`
      : 'Record<string, unknown>';
  }

  return 'unknown';
}

function schemaToTypeName(schema) {
  const name = refName(schema);

  return name ? `${name}Dto` : schemaToType(schema);
}

function resolveSchema(schema) {
  const name = refName(schema);

  return name ? schemas[name] : schema;
}

function refName(schema) {
  return schema?.$ref?.split('/').at(-1) ?? null;
}

function collectSchemaRefs(schema, refs) {
  if (!schema) {
    return;
  }

  const name = refName(schema);

  if (name) {
    refs.add(name);
    return;
  }

  if (schema.items) {
    collectSchemaRefs(schema.items, refs);
  }

  for (const property of Object.values(schema.properties ?? {})) {
    collectSchemaRefs(property, refs);
  }

  for (const child of [
    ...(schema.allOf ?? []),
    ...(schema.oneOf ?? []),
    ...(schema.anyOf ?? []),
  ]) {
    collectSchemaRefs(child, refs);
  }
}

function collectNestedSchemaRefs(schemaName, refs) {
  const schema = schemas[schemaName];

  if (!schema) {
    return;
  }

  for (const property of Object.values(schema.properties ?? {})) {
    const before = refs.size;
    collectSchemaRefs(property, refs);

    if (refs.size !== before) {
      for (const ref of [...refs]) {
        if (ref !== schemaName) {
          collectNestedSchemaRefs(ref, refs);
        }
      }
    }
  }
}

function isApiResponseSchema(schema) {
  const keys = Object.keys(schema?.properties ?? {});

  return (
    keys.includes('code') && keys.includes('message') && keys.includes('data')
  );
}

function isPageSchema(schema) {
  const properties = schema?.properties ?? {};

  return Boolean(
    properties.content && properties.pageNumber && properties.pageSize
  );
}

function getPageItemType(schema) {
  const content = schema?.properties?.content;

  if (!content || content.type !== 'array') {
    return null;
  }

  return schemaToType(content.items);
}

function stripApiPrefix(rawPath) {
  const withoutPrefix = rawPath.replace(API_PREFIX_PATTERN, '');

  return withoutPrefix || '/';
}

function tagToFolderName(tag) {
  return toCamelCase(tag.replace(/-?controller$/i, ''));
}

function normalizeFolderArg(folder) {
  const withoutTrailingSlash = folder.replace(/\/+$/, '');
  const folderName = path.basename(withoutTrailingSlash);

  return toCamelCase(folderName);
}

function toEndpointKey(value) {
  return value
    .replace(/\{([^}]+)\}/g, '$1')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) =>
      part
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
        .toUpperCase()
    )
    .join('_');
}

function toPascalCase(value) {
  return value
    .replace(/\{([^}]+)\}/g, '$1')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');
}

function toCamelCase(value) {
  const pascal = toPascalCase(value);

  return `${pascal.charAt(0).toLowerCase()}${pascal.slice(1)}`;
}

function unique(items) {
  return [...new Set(items)];
}

function stripDtoSuffix(typeName) {
  return typeName.replace(/\[\]$/, '');
}

function getTypeIdentifiers(type) {
  return type.match(/\b[A-Z][A-Za-z0-9]*Dto\b/g) ?? [];
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
