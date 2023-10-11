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
}
