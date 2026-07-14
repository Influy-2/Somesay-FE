export type CommentReactionType = 'AGREE' | 'DISAGREE' | 'SKIP';

export interface CommentPreviewType {
  commentId: number;
  nickname: string;
  profileImageUrl: string;
  reactionType: CommentReactionType;
  comment: string;
  createdAt: string;
}
