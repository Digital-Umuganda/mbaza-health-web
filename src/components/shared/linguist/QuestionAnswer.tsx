import CustomMarkdown from '@/components/partials/markdown/CustomMarkdown';

interface QuestionAnswerProps {
  className?: string;
  type?: 'Question' | 'Answer';
  translation?: string;
  text?: string;
  audio?: string;
  onBetterQuestionTranslation?: () => void;
  onBetterAnswerTranslation?: () => void;
}

const QuestionAnswer = ({
  className = '',
  type = 'Question',
  text = 'Nigute nafasha umuntu ufite ubumuga bwo kutabona mugihe akeneye amakuru?',
  translation = 'Can you help a visually impaired person when they need information?',
  onBetterQuestionTranslation,
  onBetterAnswerTranslation,
}: QuestionAnswerProps) => {
  return (
    <div className={`p-4 ${className}`}>
      <p className="mb-8 text-slate-600 text-opacity-60 text-xs font-normal font-['Inter']">
        {type}
      </p>
      <div className="text-blue-500 font-['Inter'] flex space-x-2 px-2">
        <span className="text-slate-600 text-opacity-60 font-normal font-['Inter']">
          {type === 'Question' ? 'K.' : 'E.'}
        </span>
        <CustomMarkdown markdown={text} />
      </div>
      <CustomMarkdown
        markdown={
          translation.length ? translation : 'No translation provided'
        }
        className={`mt-6 ${
          translation.length
            ? 'text-[#478CCA] prose-headings:text-[#478CCA]'
            : 'text-gray-400 italic'
        } font-['Inter'] bg-[#EAF0F5] rounded-lg p-4`}
      />

      {onBetterQuestionTranslation && (
        <button
          type="button"
          className="mt-3 text-[#4CD964] hover:text-green-500 mr-auto"
          onClick={onBetterQuestionTranslation}
        >
          Provide better translation (Optional)
        </button>
      )}

      {onBetterAnswerTranslation && (
        <button
          type="button"
          className="mt-3 text-[#4CD964] hover:text-green-500 mr-auto"
          onClick={onBetterAnswerTranslation}
        >
          Provide better translation (Optional)
        </button>
      )}
    </div>
  );
};

export default QuestionAnswer;
