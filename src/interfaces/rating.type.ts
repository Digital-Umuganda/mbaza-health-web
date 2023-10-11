export type Rate = 'GOOD' | 'FAIR' | 'BAD' | 'MISLEADING';

export const chatRatings: Rate[] = [
  'GOOD',
  'FAIR',
  'BAD',
  'MISLEADING',
];

export interface IRating {
  id: string;
  created_at: string;
  user_id: string;
  question_answer_id: string;
  comment?: string | null;
  updated_at: string | null;
  rating: Rate;
}

export interface RatingResponse {
  Ratings: IRating;
  kinyarwanda_question: string;
  english_question: string;
}
