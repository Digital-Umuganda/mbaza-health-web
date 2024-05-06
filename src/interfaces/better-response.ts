export interface IBetterResponse {
  kinyarwanda_better_response?: string;
  english_better_response?: string;
  english_better_question?: string;
  kinyarwanda_better_question?: string;
}

export enum BetterResponse {
  BETTER_QUESTION = 'BETTER_QUESTION',
  BETTER_ANSWER = 'BETTER_ANSWER',
}
