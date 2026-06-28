export interface CommentPreviewDto {
  commentId: number;
  nickname: string;
  profileImageUrl: string;
  reactionType: 'AGREE' | 'DISAGREE' | 'SKIP';
  comment: string;
  createdAt: string;
}
