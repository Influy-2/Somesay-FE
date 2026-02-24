export type ID = number;
export type ISODateTimeString = string;

export interface Creator {
  creatorId: ID; // BIGINT
  nickname: string; // VARCHAR(50)
  profileImage: string; // VARCHAR(500)
  youtubeLink: string; // VARCHAR(500)
  trustScore: number; // DECIMAL(5,2)
  skinType: string; // ENUM (values not provided)
  personalColor: string; // ENUM (values not provided)
  birthYear: number; // YEAR
  subscriberNum: ID; // BIGINT
  ranking: number; // INT
  skinTypeId: ID; // BIGINT
  personalColorId: ID; // BIGINT
}

export interface CreatorProfile {
  creatorId: ID; // BIGINT
  nickname: string; // VARCHAR(50)
  profileImage: string; // VARCHAR(500)
  trustScore: number; // DECIMAL(5,2)
  skinType: string; // ENUM (values not provided)
  subscriberNum: ID; // BIGINT
}

export interface CreatorReview {
  creatorReviewId: ID; // BIGINT
  content: string; // TEXT
  rating: number; // DECIMAL(2,1)
  agreeCount: number; // INT
  disagreeCount: number; // INT
  createdAt: ISODateTimeString; // DATETIME
  updatedAt: ISODateTimeString; // DATETIME
  youtubeUrl: string; // VARCHAR(200)
  creatorId: ID; // BIGINT
  productId: ID; // BIGINT
}
