import type { LeafFeatureId } from '@somesay/shared';

// 기능명세서와 코드를 잇는 표식(data-feature)을 모든 JSX 요소에 허용합니다.
// Attributes 를 넓히면 컴포넌트 props 를 고치지 않고도 기능 ID 를 타입으로 검사할 수 있습니다.
declare module 'react' {
  interface Attributes {
    'data-feature'?: LeafFeatureId | readonly LeafFeatureId[];
  }
}
