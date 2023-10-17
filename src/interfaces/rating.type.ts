export type Rate =
  | 'GOOD'
  | 'FAIR'
  | 'BAD'
  | 'MISLEADING'
  | 'VERY_GOOD';

export const chatRatings: Rate[] = [
  'VERY_GOOD',
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
  chat_id: string;
}

export interface RatingResponse {
  Ratings: IRating;
  kinyarwanda_question: string;
  english_question: string;
  title: string;
}
