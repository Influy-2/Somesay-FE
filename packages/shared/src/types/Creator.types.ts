export type ID = number;
export type ISODateTimeString = string;

export interface Creator {
  creatorId: ID; // BIGINT
  nickname: string; // VARCHAR(50)
  profileImageUrl: string; // VARCHAR(500)
  youtubeLink: string; // VARCHAR(500)
  trustScore: number; // DECIMAL(5,2)
  skinType: string; // ENUM (values not provided)
  personalColor: string; // ENUM (values not provided)
  birthYear: number; // YEAR
  subscriberNum: ID; // BIGINT
  ranking: number; // INT
  ageGroup: number; // INT (20, 30, 40...)
}
