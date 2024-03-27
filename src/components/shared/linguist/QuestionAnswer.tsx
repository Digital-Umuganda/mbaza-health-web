import CustomMarkdown from '@/components/partials/markdown/CustomMarkdown';

const QuestionAnswer = ({
  className = '',
  type = 'Question',
  text = 'Nigute nafasha umuntu ufite ubumuga bwo kutabona mugihe akeneye amakuru?',
  translation = 'Can you help a visually impaired person when they need information?',
}) => {
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
        markdown={translation}
        className="mt-6 text-[#478CCA] font-['Inter'] bg-[#EAF0F5] prose-headings:text-[#478CCA] rounded-lg p-4"
      />
    </div>
  );
};

export default QuestionAnswer;
