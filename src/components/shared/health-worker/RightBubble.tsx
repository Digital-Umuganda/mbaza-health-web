import CustomMarkdown from '@/components/partials/markdown/CustomMarkdown';

const RightBubble = ({ message }: { message: string }) => {
  return (
    <div className="ml-auto w-fit max-w-[70%] mb-8 bg-slate-200 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl border border-blue-500/30">
      <h3 className="flex items-center space-x-3 px-3 py-2 border-b border-blue-500/30 text-green-500">
        User
      </h3>
      <CustomMarkdown
        markdown={message}
        className="px-3 py-2 text-slate-600 font-['Inter'] leading-normal"
      />
    </div>
  );
};

export default RightBubble;
