const QuestionAnswer = ({
  className = '',
  language = 'Kinyarwanda',
  question = 'Nigute nafasha umuntu ufite ubumuga bwo kutabona mugihe akeneye amakuru?',
  answer = 'Menya uburyo bahitamo kwakira amakuru.',
}) => {
  return (
    <div className={`p-4 ${className}`}>
      <p className="mb-8 text-slate-600 text-opacity-60 text-xs font-normal font-['Inter']">
        {language}
      </p>
      <p className="text-blue-500 font-['Inter'] flex space-x-2">
        <span className="text-slate-600 text-opacity-60 font-normal font-['Inter']">
          Q.
        </span>
        <span>{question}</span>
      </p>
      <p className="mt-6 text-slate-600 font-['Inter'] flex space-x-2">
        <span className="text-slate-600 text-opacity-60 font-normal font-['Inter']">
          R.
        </span>
        <span>{answer}</span>
      </p>
    </div>
  );
};

export default QuestionAnswer;
