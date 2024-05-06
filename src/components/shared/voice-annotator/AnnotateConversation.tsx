import Button from '@/components/partials/buttons/Button';
import { QuestionAnswer as QuestionType } from '@/interfaces/question.answer.type';
import { IAnnotation } from '@/interfaces/rating.type';
import {
  annotate,
  getRandomQuestion,
} from '@/redux/features/question-answer/question.answer.thunk';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { FormEvent, useEffect, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { updateRating } from '@/redux/features/ratings/rating.thunk';
import { Link, useNavigate } from 'react-router-dom';
import Secure from '@/helpers/secureLS';
import { roleToPath } from '@/helpers/isAuth';
import { RATE_VALUES } from '@/constants/rating';
import { Label, Modal, Radio, Textarea } from 'flowbite-react';
import QuestionAnswer from './QuestionAnswer';
import { provideBetterResponse } from '@/redux/features/better-response/better-response.thunk';
import { IBetterResponse } from '@/interfaces/better-response';
import { updateRandomQuestion } from '@/redux/features/question-answer/question.answer.slice';

enum BetterResponse {
  BETTER_QUESTION = 'BETTER_QUESTION',
  BETTER_ANSWER = 'BETTER_ANSWER',
}

const VoiceAnnotateConversation = ({
  data,
}: {
  data: QuestionType;
}) => {
  const [openModal, setOpenModal] = useState<BetterResponse>();
  const [translation, setTranslation] = useState<string>('');

  const profile = Secure.getProfile();
  const navigate = useNavigate();
  const [annotation, setAnnotation] = useState<IAnnotation>({
    comment: '',
  });
  const { loading: loadingBetterResponse } = useAppSelector(
    state => state.betterResponse,
  );
  const { loading } = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();
  const onRefresh = () => {
    dispatch(getRandomQuestion(null));
  };

  const handleAnnotation = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      if (data.ratings?.length) {
        await dispatch(
          updateRating({
            ...annotation,
            id: data.ratings[0].id,
          }),
        ).unwrap();
        toast.success('Annotation updated');
        navigate(`/${roleToPath(profile?.role as string)}/dashboard`);
      } else {
        await dispatch(
          annotate({
            ...annotation,
            messageId: data.id,
          }),
        ).unwrap();
        toast.success('The message has been annotated successfully.');
        setAnnotation({
          comment: '',
        });
        onRefresh();
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  const handleBetterResponse = async () => {
    try {
      const betterResponse: IBetterResponse = {};
      if (openModal === BetterResponse.BETTER_QUESTION) {
        betterResponse.kinyarwanda_better_question = translation;
      } else if (openModal === BetterResponse.BETTER_ANSWER) {
        betterResponse.kinyarwanda_better_response = translation;
      } else {
        return;
      }
      await dispatch(
        provideBetterResponse({
          betterResponse,
          messageId: data.id,
        }),
      ).unwrap();
      toast.success('Better translation submitted');
      setTranslation('');
      dispatch(
        updateRandomQuestion({
          ...data,
          kinyarwanda_question:
            openModal === BetterResponse.BETTER_QUESTION
              ? translation
              : data.kinyarwanda_question,
          kinyarwanda_response:
            openModal === BetterResponse.BETTER_ANSWER
              ? translation
              : data.kinyarwanda_response,
        }),
      );
      setOpenModal(undefined);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (data.ratings?.length) {
      const [first] = data.ratings;
      setAnnotation({
        comment: first.comment || '',
        question_audio_mean_opinion_score:
          first.question_audio_mean_opinion_score,
        response_audio_mean_opinion_score:
          first.response_audio_mean_opinion_score,
      });
    }
  }, [data]);

  return (
    <>
      <div className="gap-4 flex flex-col md:flex-row w-full md:min-h-[80vh]">
        <div className="relative md:w-[60%] lg:w-[70%] bg-white rounded-2xl border flex flex-col">
          <h1 className="text-slate-600 text-xl font-medium font-['Inter'] p-4 border-b border-blue-500/20">
            Annotate this conversation
          </h1>
          {!data.ratings?.length ? (
            <button
              type="button"
              disabled={loading}
              onClick={onRefresh}
              className="group disabled:cursor-not-allowed p-2 right-4 top-2 absolute bg-opacity-10 bg-blue-500 rounded-lg border"
            >
              <HiOutlineRefresh
                size={24}
                className="text-blue-500 group-disabled:text-opacity-25"
              />
            </button>
          ) : null}

          <div className="lg:grid lg:grid-cols-2 flex-grow">
            <QuestionAnswer
              className="border-b md:border-b-0 md:border-r border-blue-500/20"
              type="Question"
              text={data?.kinyarwanda_question}
              audio={data?.audio_question}
              onBetterTranslation={() => {
                setOpenModal(BetterResponse.BETTER_QUESTION);
                setTranslation('');
              }}
            />
            <QuestionAnswer
              type="Answer"
              text={data?.kinyarwanda_response}
              audio={data?.audio_responses?.[0]}
              onBetterTranslation={() => {
                setOpenModal(BetterResponse.BETTER_ANSWER);
                setTranslation('');
              }}
            />
          </div>
        </div>
        <form
          onSubmit={handleAnnotation}
          className="md:w-[40%] lg:w-[30%] bg-white rounded-2xl border"
        >
          {data?.audio_question && (
            <>
              <h1 className="text-slate-600 text-base font-medium font-['Inter'] p-4">
                Rate Question
              </h1>

              <p className="text-slate-600 text-sm font-['Inter'] px-4">
                Mean Opinion Score
              </p>
              <div className="mt-2 flex items-center flex-wrap gap-x-4 gap-y-3 px-4">
                {RATE_VALUES.map(item => (
                  <div className="flex items-center" key={item}>
                    <Radio
                      id={`question_audio_mean_opinion_score_${item}`}
                      name="question_audio_mean_opinion_score"
                      value={item}
                      checked={
                        annotation.question_audio_mean_opinion_score ===
                        item
                      }
                      onChange={() =>
                        setAnnotation(prev => ({
                          ...prev,
                          question_audio_mean_opinion_score: item,
                        }))
                      }
                      className="checked:bg-yellow-400 checked:ring-yellow-500 focus:ring-yellow-500"
                    />
                    <Label
                      htmlFor={`question_audio_mean_opinion_score_${item}`}
                      className="pl-2"
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Answer */}
          <h1 className="text-slate-600 text-base font-medium font-['Inter'] p-4 mt-2">
            Rate Answer
          </h1>

          <p className="text-slate-600 text-sm font-['Inter'] px-4">
            Mean Opinion Score
          </p>

          <div className="mt-2 flex items-center flex-wrap gap-x-4 gap-y-3 px-4">
            {RATE_VALUES.map(item => (
              <div className="flex items-center" key={item}>
                <Radio
                  id={`response_audio_mean_opinion_score_${item}`}
                  name="response_audio_mean_opinion_score"
                  value={item}
                  checked={
                    annotation.response_audio_mean_opinion_score ===
                    item
                  }
                  onChange={() =>
                    setAnnotation(prev => ({
                      ...prev,
                      response_audio_mean_opinion_score: item,
                    }))
                  }
                  className="checked:bg-yellow-400 checked:ring-yellow-500 focus:ring-yellow-500"
                />
                <Label
                  htmlFor={`response_audio_mean_opinion_score_${item}`}
                  className="pl-2"
                >
                  {item}
                </Label>
              </div>
            ))}
          </div>

          <div className="px-4 pb-4 mt-6">
            <label
              htmlFor="comment"
              className="text-slate-600 text-base font-medium font-['Inter'] mb-1"
            >
              Leave a comment
            </label>
            <textarea
              id="comment"
              rows={4}
              value={annotation.comment}
              onChange={e => {
                setAnnotation(prev => ({
                  ...prev,
                  comment: e.target.value,
                }));
              }}
              className="resize-none px-4 py-3 w-full bg-white rounded-lg border outline-none border-blue-500/30 focus:border-blue-500 placeholder:text-slate-600 placeholder:text-sm font-normal font-['Inter']"
              placeholder="Type your comment here..."
            />

            <Button
              type="submit"
              label={data.ratings?.length ? 'Update' : 'Submit'}
              disabled={
                loading ||
                Object.keys(annotation).length <
                  (data?.audio_question ? 3 : 2)
              }
              className="uppercase mt-8 w-full disabled:bg-opacity-60 disabled:cursor-not-allowed"
            />

            <Link
              to={`/${roleToPath(profile?.role as string)}/dashboard`}
              className="block text-center mt-6 text-slate-600 text-sm font-bold font-['Inter'] underline"
            >
              Annotation History
            </Link>
          </div>
        </form>
      </div>

      <Modal
        show={!!openModal}
        onClose={() => {
          if (!loadingBetterResponse) {
            setOpenModal(undefined);
          }
        }}
        size="7xl"
      >
        <Modal.Header>
          {openModal === BetterResponse.BETTER_QUESTION
            ? 'Better Question'
            : 'Better Answer'}
        </Modal.Header>
        <Modal.Body>
          <div className="flex h-full">
            <div className="flex flex-col w-1/2">
              <h3 className="font-semibold text-[#3D576F] px-4">
                AI Translation
              </h3>
              <QuestionAnswer
                className="border-b md:border-b-0 md:border-r border-blue-500/20"
                type={
                  openModal === BetterResponse.BETTER_QUESTION
                    ? 'Question'
                    : 'Answer'
                }
                text={
                  openModal === BetterResponse.BETTER_QUESTION
                    ? data?.kinyarwanda_question
                    : data?.kinyarwanda_response
                }
                audio={
                  openModal === BetterResponse.BETTER_QUESTION
                    ? data?.audio_question
                    : data?.audio_responses?.[0]
                }
              />
            </div>

            <div className="flex flex-col w-1/2 space-y-3 px-4">
              <h3 className="font-semibold text-[#3D576F]">
                Provide better translation
              </h3>
              <Textarea
                className="flex-grow focus:ring-[#3D576F]"
                placeholder="Type your better translation here..."
                value={translation}
                onChange={e => setTranslation(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-end">
          <Button
            type="button"
            label="Submit"
            disabled={!translation || loadingBetterResponse}
            className="uppercase mt-8 disabled:bg-opacity-60 disabled:cursor-not-allowed"
            onClick={handleBetterResponse}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VoiceAnnotateConversation;
