// declare module '*.svg' {
//   const content: React.FC<React.SVGProps<SVGElement>>;
//   export default content;
// }
declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FC<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}
