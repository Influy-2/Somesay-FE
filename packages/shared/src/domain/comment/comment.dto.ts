import type { CommentReactionType } from './comment.types';

// 리뷰 미리보기 코멘트의 백엔드 응답 DTO입니다.
export interface CommentPreviewDto {
  reactionId: number;
  userId: number;
  nickname: string;
  profileImgUrl: string;
  reactionType: CommentReactionType;
  comment: string;
  createdAt: string;
  skinTypeIds: number[];
  skinExpectationIds: number[];
}

export interface CommentPageDto {
  content: CommentPreviewDto[];
  pageNumber: number;
  pageSize: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
}
