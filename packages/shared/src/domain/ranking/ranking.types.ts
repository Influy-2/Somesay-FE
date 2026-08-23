import type { CreatorRankingUpDownType } from '../creator/creator.types';

// 홈 크리에이터 랭킹 화면이 쓰는 타입입니다.
// 연령이 enum으로 통일되기 전까지 이 화면만 문자열을 유지하려고 Omit을 걸어뒀으나,
// 이제 랭킹과 모양이 완전히 같아 별칭으로 둡니다.
export type HomeCreatorRankingType = CreatorRankingUpDownType;
