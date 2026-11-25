// 팀웹 기능 목록 JSON 을 stdin 으로 받아 스냅샷(features/features.json)으로 저장하고 타입을 다시 만듭니다.
// 팀웹은 SSH 로만 닿아서 fetch 대신 붙여 넣기를 받습니다. 스냅샷을 커밋해 두면 기능 변경이 PR diff 로 드러납니다.
// 사용: pbpaste | pnpm --filter @somesay/shared features:update
//       ssh … | pnpm --filter @somesay/shared features:update
import { writeFile } from 'node:fs/promises';
import { text } from 'node:stream/consumers';

import { generateFeatureTypes } from './gen-features.mjs';

const OUTPUT_PATH = new URL('../features/features.json', import.meta.url);
const ID_PATTERN = /^F-\d{4}$/;
const DISPLAY_NO_PATTERN = /^\d+(\.\d+){0,2}$/;

const fail = (message) => {
  console.error(`기능 목록을 저장하지 않았습니다: ${message}`);
  process.exit(1);
};

const input = (await text(process.stdin)).trim();
if (!input)
  fail('입력이 비어 있습니다. 팀웹에서 복사한 JSON 을 파이프로 넘겨 주세요.');

let features;
try {
  features = JSON.parse(input);
} catch (error) {
  fail(`JSON 이 아닙니다 (${error.message})`);
}

if (!Array.isArray(features) || features.length === 0) {
  fail('기능 객체 배열이어야 합니다.');
}

const seenIds = new Set();
const seenDisplayNos = new Set();

features.forEach((feature, index) => {
  const where = `${index}번째 항목`;
  if (typeof feature !== 'object' || feature === null)
    fail(`${where}이 객체가 아닙니다.`);

  const { id, display_no: displayNo, title } = feature;
  if (typeof id !== 'string' || !ID_PATTERN.test(id))
    fail(`${where}의 id(${id})가 F-0000 형식이 아닙니다.`);
  if (typeof displayNo !== 'string' || !DISPLAY_NO_PATTERN.test(displayNo)) {
    fail(`${id}의 display_no(${displayNo})가 1 / 1.1 / 1.1.1 형식이 아닙니다.`);
  }
  if (typeof title !== 'string' || !title.trim())
    fail(`${id}의 title 이 비어 있습니다.`);
  if (seenIds.has(id)) fail(`id ${id}가 중복됩니다.`);
  if (seenDisplayNos.has(displayNo))
    fail(`display_no ${displayNo}가 중복됩니다.`);

  seenIds.add(id);
  seenDisplayNos.add(displayNo);
});

// 팀웹 응답 순서는 기능이 생긴 순서와 표시 순서가 섞여 있어, ID 순으로 고정해 diff 를 안정시킵니다.
const normalized = features
  .map(({ id, display_no, title }) => ({ id, display_no, title: title.trim() }))
  .sort((a, b) => a.id.localeCompare(b.id));

await writeFile(OUTPUT_PATH, `${JSON.stringify(normalized, null, 2)}\n`);
console.log(`저장 완료: ${normalized.length}건 → features/features.json`);

await generateFeatureTypes();
