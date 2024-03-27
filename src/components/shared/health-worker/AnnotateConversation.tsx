import Button from '@/components/partials/buttons/Button';
import { IChat } from '@/interfaces/question.answer.type';
import { IAnnotation } from '@/interfaces/rating.type';
import {
  annotate,
  getRandomChat,
} from '@/redux/features/question-answer/question.answer.thunk';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { FormEvent, Fragment, useEffect, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import { toast } from 'react-toastify';
import imigongo from '@/assets/images/imigongo1.svg';
import LeftBubble from './LeftBubble';
import RightBubble from './RightBubble';
import { updateRating } from '@/redux/features/ratings/rating.thunk';
import { Link, useNavigate } from 'react-router-dom';
import Secure from '@/helpers/secureLS';
import { roleToPath } from '@/helpers/isAuth';
import { RATE_VALUES } from '@/constants/rating';
import { Label, Radio } from 'flowbite-react';

const AnnotateConversation = ({ data }: { data: IChat }) => {
  const profile = Secure.getProfile();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'rw'>(
    'en',
  );
  const [annotation, setAnnotation] = useState<IAnnotation>({
    comment: '',
  });
  const { loading } = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();
  const onRefresh = () => {
    dispatch(getRandomChat(null));
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
        toast.success(
          'The conversation has been annotated successfully.',
        );
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

  useEffect(() => {
    if (data.ratings?.length) {
      const [first] = data.ratings;
      setAnnotation({
        comment: first.comment || '',
        reponse_helpfulness: first.reponse_helpfulness,
        response_correctness: first.response_correctness,
        response_coherence: first.response_coherence,
      });
    }
  }, [data]);

  return (
    <div className="gap-4 flex flex-col md:flex-row w-full md:min-h-[80vh]">
      <div className="relative md:w-[60%] lg:w-[70%] bg-white rounded-2xl border flex flex-col">
        <h1 className="text-slate-600 text-xl font-medium font-['Inter'] p-4 border-b border-blue-500/20">
          Help us Annotate this conversation
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

        <div className="px-4 py-2 bg-white flex items-center justify-end border-b border-blue-500/30 w-full">
          <span className="text-slate-400">Lang: </span>
          <select
            className="ml-2 py-3 rounded-lg border outline-none border-blue-500/30 focus:border-blue-500 placeholder:text-slate-600 placeholder:text-sm font-normal font-['Inter']"
            onChange={event => {
              setCurrentLanguage(event.target.value as 'en' | 'rw');
            }}
          >
            <option value="en">English</option>
            <option value="rw">Kinyarwanda</option>
          </select>
        </div>

        <div
          className="flex flex-col p-4 md:px-8 bg-no-repeat bg-center bg-cover flex-grow"
          style={{ backgroundImage: `url(${imigongo})` }}
        >
          {!data.question_answers?.length && (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-slate-600 text-xl font-medium font-['Inter']">
                No conversations to annotate, please refresh
              </p>
            </div>
          )}
          {data?.question_answers?.map(item => (
            <Fragment key={item.id}>
              <RightBubble
                key={item.id}
                message={
                  currentLanguage === 'en'
                    ? item.english_question
                    : item.kinyarwanda_question
                }
              />
              <LeftBubble
                key={item.id}
                message={
                  currentLanguage === 'en'
                    ? item.english_response
                    : item.kinyarwanda_response
                }
              />
            </Fragment>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleAnnotation}
        className="md:w-[40%] lg:w-[30%] bg-white rounded-2xl border"
      >
        <h1 className="text-slate-600 text-base font-medium font-['Inter'] p-4">
          Rate Question
        </h1>

        <p className="text-slate-600 text-sm font-['Inter'] px-4">
          Helpfulness
        </p>
        <div className="mt-2 flex items-center flex-wrap gap-x-4 gap-y-3 px-4">
          {RATE_VALUES.map(item => (
            <div className="flex items-center" key={item}>
              <Radio
                id={`reponse_helpfulness_${item}`}
                name="reponse_helpfulness"
                value={item}
                checked={annotation.reponse_helpfulness === item}
                onChange={() =>
                  setAnnotation(prev => ({
                    ...prev,
                    reponse_helpfulness: item,
                  }))
                }
                className="checked:bg-yellow-400 checked:ring-yellow-500 focus:ring-yellow-500"
              />
              <Label
                htmlFor={`reponse_helpfulness_${item}`}
                className="pl-2"
              >
                {item}
              </Label>
            </div>
          ))}
        </div>

        <p className="text-slate-600 text-sm font-['Inter'] px-4 mt-3">
          Correctness
        </p>
        <div className="mt-2 flex items-center flex-wrap gap-x-4 gap-y-3 px-4">
          {RATE_VALUES.map(item => (
            <div className="flex items-center" key={item}>
              <Radio
                id={`response_correctness_${item}`}
                name="response_correctness"
                value={item}
                checked={annotation.response_correctness === item}
                onChange={() =>
                  setAnnotation(prev => ({
                    ...prev,
                    response_correctness: item,
                  }))
                }
                className="checked:bg-yellow-400 checked:ring-yellow-500 focus:ring-yellow-500"
              />
              <Label
                htmlFor={`response_correctness_${item}`}
                className="pl-2"
              >
                {item}
              </Label>
            </div>
          ))}
        </div>

        <p className="text-slate-600 text-sm font-['Inter'] px-4 mt-3">
          Coherence
        </p>
        <div className="mt-2 flex items-center flex-wrap gap-x-4 gap-y-3 px-4">
          {RATE_VALUES.map(item => (
            <div className="flex items-center" key={item}>
              <Radio
                id={`response_coherence_${item}`}
                name="response_coherence"
                value={item}
                checked={annotation.response_coherence === item}
                onChange={() =>
                  setAnnotation(prev => ({
                    ...prev,
                    response_coherence: item,
                  }))
                }
                className="checked:bg-yellow-400 checked:ring-yellow-500 focus:ring-yellow-500"
              />
              <Label
                htmlFor={`response_coherence_${item}`}
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
            disabled={loading || Object.keys(annotation).length < 4}
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
  );
};

export default AnnotateConversation;
