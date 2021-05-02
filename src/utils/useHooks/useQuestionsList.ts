import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { baseURL, defaultPageSize, filter, key } from '../config/apiEndPoints';
import { QuestionProps, QuestionsApiErrorProps } from '../types';

const defaultQuestions: QuestionProps[] = [];

interface UseQuestionsListProps {
  has_more: boolean;
  items: QuestionProps[];
}

/**
 * useQuestionsList is a custom hook to call an api.
 * @param pageNumber - { Number } that will be used for api calling.
 * @returns { loading, questions, error, hasMore }
 */

export default function useQuestionsList(
  pageNumber: number,
): { loading: boolean; questions: QuestionProps[]; error: QuestionsApiErrorProps | null; hasMore: boolean } {
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(true);
  const [questions, setQuestions]: [QuestionProps[], Dispatch<SetStateAction<QuestionProps[]>>] = useState<QuestionProps[]>(
    defaultQuestions,
  );
  const [error, setError]: [
    QuestionsApiErrorProps | null,
    Dispatch<SetStateAction<QuestionsApiErrorProps | null> | null>,
  ] = useState<QuestionsApiErrorProps | null>(null);
  const [hasMore, setHasMore]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // In an api `key` will help to quota_max=10000, without key it'll be 300 only.
    // In an api `filter` will help to to call api with the body.
    axios
      .get<UseQuestionsListProps>(
        `${baseURL}/questions?page=${pageNumber}&pagesize=${defaultPageSize}&order=desc&site=stackoverflow.com&key=${key}&filter=${filter}`,
      )
      .then(response => {
        setQuestions(prevState => {
          return [
            ...prevState,
            ...response.data.items.map((item: QuestionProps) => {
              return {
                title: item.title,
                link: item.link,
                creation_date: item.creation_date,
                body: item.body,
                question_id: item.question_id,
                answer_count: item.answer_count,
                score: item.score,
                view_count: item.view_count,
                tags: item.tags.splice(0, 3),
                owner: {
                  display_name: item.owner.display_name,
                },
              };
            }),
          ];
        });
        setHasMore(response.data?.has_more);
        setLoading(false);
        setLoading(false);
      })
      .catch(error => {
        if (error.message !== 'Network Error') {
          setError(error.response.data);
        } else {
          setError({
            error_name: 'Network Error',
            error_message: 'Network Error',
          });
        }
      });
  }, [pageNumber]);

  return { loading, questions, error, hasMore };
}
