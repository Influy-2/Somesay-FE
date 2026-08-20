export type CommentReactionType = 'AGREE' | 'DISAGREE' | 'SKIP';

export interface CommentPreviewType {
  reactionId: number;
  userId: number;
  nickname: string;
  profileImgUrl: string;
  reactionType: CommentReactionType;
  comment: string;
  createdAt: string;
  skinTypes: string[];
  skinExpectations: string[];
}
