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

export interface IRating extends IAnnotation {
  id: string;
  created_at: string;
  user_id: string;
  question_answer_id: string;
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

export interface IAnnotation {
  comment?: string;
  question_transation_adequacy?: number;
  response_transation_adequacy?: number;
  question_translation_fluency?: number;
  response_translation_fluency?: number;
  reponse_helpfulness?: number;
  response_correctness?: number;
  response_coherence?: number;
  audio_mean_opinion_score?: number;
}
