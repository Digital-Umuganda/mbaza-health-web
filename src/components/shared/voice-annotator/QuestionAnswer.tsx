import CustomMarkdown from '@/components/partials/markdown/CustomMarkdown';
import { BASE_AUDIO_URL } from '@/constants/keys';

interface QuestionAnswerProps {
  className?: string;
  type?: 'Question' | 'Answer';
  text?: string;
  audio?: string;
  onBetterTranslation?: () => void;
}

const QuestionAnswer = ({
  className = '',
  type = 'Question',
  text = 'Nigute nafasha umuntu ufite ubumuga bwo kutabona mugihe akeneye amakuru?',
  audio,
  onBetterTranslation,
}: QuestionAnswerProps) => {
  return (
    <div className={`p-4 ${className}`}>
      <p className="text-slate-600 font-semibold font-['Inter']">
        {type}
      </p>

      {type === 'Question' && audio && (
        <div className="px-2 mt-4">
          <p className="my-4 text-blue-500 font-normal font-['Inter']">
            Voice
          </p>
          <audio
            controls
            src={`${BASE_AUDIO_URL}/${audio}`}
            className="w-full"
          />
          <p className="text-blue-500 font-normal font-['Inter'] mt-4">
            Text
          </p>
        </div>
      )}

      {type === 'Answer' && (
        <div className="px-2">
          <p className="my-4 text-blue-500 font-normal font-['Inter']">
            Audio
          </p>
          {audio ? (
            <audio
              controls
              src={`${BASE_AUDIO_URL}/${audio}`}
              className="w-full"
            />
          ) : (
            <p className="text-slate-400">No audio response</p>
          )}
          <p className="mt-4 text-blue-500 font-normal font-['Inter']">
            Text
          </p>
        </div>
      )}

      <div className="mt-2 font-['Inter'] flex flex-col gap-y-2 px-2">
        <CustomMarkdown markdown={text} />

        {onBetterTranslation && (
          <button
            type="button"
            className="mt-3 text-[#4CD964] hover:text-green-500 mr-auto"
            onClick={onBetterTranslation}
          >
            Provide better translation (Optional)
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionAnswer;
