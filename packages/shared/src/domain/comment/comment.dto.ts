import type { CommentReactionType } from './comment.types';

// 리뷰 미리보기 코멘트의 백엔드 응답 DTO입니다.
export interface CommentPreviewDto {
  commentId: number;
  nickname: string;
  profileImgUrl: string;
  reactionType: CommentReactionType;
  content: string;
  createdAt: string;
}
