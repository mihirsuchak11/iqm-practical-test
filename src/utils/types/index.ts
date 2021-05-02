export interface ModalQuestionProps {
  link: string;
  body: string;
  title: string;
}

export interface QuestionProps {
  title: string;
  link: string;
  creation_date: string;
  body: string;
  question_id: number;
  tags: string[];
  answer_count: number;
  score: number;
  view_count: number;
  owner: {
    display_name: string;
  };
}

export interface QuestionsApiErrorProps {
  error_id?: number;
  error_message: string;
  error_name: string;
}
