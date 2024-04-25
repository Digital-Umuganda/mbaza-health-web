import DataWidget from '@/components/shared/data/DataWidget';
import VoiceAnnotateConversation from '@/components/shared/voice-annotator/AnnotateConversation';
import { getRandomQuestion } from '@/redux/features/question-answer/question.answer.thunk';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const VoiceAnnotatorHomePage = () => {
  const { data, loading } = useAppSelector(
    state => state.questionAnswer,
  );
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    dispatch(getRandomQuestion(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <DataWidget isLoading={loading && !data?.id}>
        {data ? (
          <VoiceAnnotateConversation data={data} />
        ) : (
          <p className="text-center text-xl font-medium">
            No data to display
          </p>
        )}
      </DataWidget>
    </>
  );
};

export default VoiceAnnotatorHomePage;
