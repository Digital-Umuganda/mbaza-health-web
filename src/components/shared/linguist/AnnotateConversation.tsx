import Button from '@/components/partials/buttons/Button';
import QuestionAnswer from '@/components/shared/linguist/QuestionAnswer';
import { roleToPath } from '@/helpers/isAuth';
import Secure from '@/helpers/secureLS';
import { QuestionAnswer as QuestionType } from '@/interfaces/question.answer.type';
import { Rate, chatRatings } from '@/interfaces/rating.type';
import {
  annotate,
  getRandomQuestion,
} from '@/redux/features/question-answer/question.answer.thunk';
import { updateRating } from '@/redux/features/ratings/rating.thunk';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { FormEvent, useEffect, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AnnotateConversation = ({ data }: { data: QuestionType }) => {
  const profile = Secure.getProfile();
  const navigate = useNavigate();
  const [annotation, setAnnotation] = useState({
    rating: '' as Rate,
    comment: '',
  });
  const { loading } = useAppSelector(state => state.questionAnswer);
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
        toast.success(
          'The translation has been annotated successfully.',
        );
        setAnnotation({
          rating: '' as Rate,
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
        rating: first.rating,
        comment: first.comment || '',
      });
    }
  }, [data]);

  return (
    <div className="gap-4 flex flex-col md:flex-row w-full md:min-h-[80vh]">
      <div className="relative md:w-[60%] lg:w-[70%] bg-white rounded-2xl border flex flex-col">
        <h1 className="text-slate-600 text-xl font-medium font-['Inter'] p-4 border-b border-blue-500/20">
          Help us Annotate this translation
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
            language="Kinyarwanda"
            question={data?.kinyarwanda_question}
            answer={data?.kinyarwanda_response}
          />
          <QuestionAnswer
            language="English"
            answer={data?.english_response}
            question={data?.english_question}
          />
        </div>
      </div>
      <form
        onSubmit={handleAnnotation}
        className="md:w-[40%] lg:w-[30%] bg-white rounded-2xl border"
      >
        <h1 className="text-slate-600 text-xl font-medium font-['Inter'] p-4 border-b border-blue-500/20">
          Rate translation
        </h1>

        <div className="p-4 flex flex-col space-y-3">
          {chatRatings.map(item => (
            <button
              type="button"
              key={item}
              onClick={() =>
                setAnnotation(prev => ({ ...prev, rating: item }))
              }
              className={`px-6 py-3 bg-white rounded border flex items-center space-x-4 ${
                annotation.rating === item
                  ? 'border-green-500 outline outline-1 outline-green-500'
                  : 'border-blue-500/20'
              }`}
            >
              <p className="w-6 h-6 relative flex flex-col items-center justify-center">
                <span
                  className={`w-6 h-6 left-0 top-0 absolute bg-opacity-25 rounded-full border ${
                    annotation.rating === item
                      ? 'bg-green-500'
                      : 'bg-blue-500 opacity-30'
                  }`}
                />
                <span
                  className={`w-3 h-3 left-[6px] top-[6px] absolute rounded-full border ${
                    annotation.rating === item
                      ? 'border-green-500 bg-green-500'
                      : 'border-blue-500/20'
                  }`}
                />
              </p>
              <span>{item}</span>
            </button>
          ))}
        </div>

        <div className="px-4 pb-4">
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
            disabled={loading || !annotation.rating}
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
