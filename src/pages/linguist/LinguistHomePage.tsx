import DataWidget from '@/components/shared/data/DataWidget';
import AnnotateConversation from '@/components/shared/linguist/AnnotateConversation';
import { getRandomQuestion } from '@/redux/features/question-answer/question.answer.thunk';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const LinguistHomePage = () => {
  const { data, loading } = useAppSelector(
    state => state.questionAnswer,
  );
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    dispatch(getRandomQuestion(id));
  }, [id]);

  return (
    <>
      <DataWidget isLoading={loading && !data?.id}>
        {data ? (
          <AnnotateConversation data={data} />
        ) : (
          <p className="text-center text-xl font-medium">
            No data to display
          </p>
        )}
      </DataWidget>
    </>
  );
};

export default LinguistHomePage;
