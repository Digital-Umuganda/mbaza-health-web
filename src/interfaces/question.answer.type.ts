import { IRating } from './rating.type';

export interface QuestionAnswer {
  id: string;
  kinyarwanda_question: string;
  kinyarwanda_response: string;
  created_at: string;
  requested_at: string;
  count_tokens: number;
  user_id: string;
  english_question: string;
  english_response: string;
  updated_at: string | null;
  chat_id: string;
  ratings: IRating[];
  audio_responses?: string[];
  audio_question?: string;
}

export interface IChat {
  id: string;
  title: string;
  question_answers: QuestionAnswer[];
  ratings: IRating[];
}
