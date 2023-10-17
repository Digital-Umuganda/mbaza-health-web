import DataWidget from '@/components/shared/data/DataWidget';
import AnnotateConversation from '@/components/shared/health-worker/AnnotateConversation';
import { getRandomChat } from '@/redux/features/question-answer/question.answer.thunk';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const HealthWorkerHomePage = () => {
  const { data, loading } = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    dispatch(getRandomChat(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default HealthWorkerHomePage;
