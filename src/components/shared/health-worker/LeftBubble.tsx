import verified from '@/assets/images/verified.svg';
import rbc from '@/assets/images/rbc.svg';

const LeftBubble = ({ message }: { message: string }) => {
  return (
    <div className="w-fit max-w-[70%] mb-8 bg-white rounded-tr-2xl rounded-bl-2xl rounded-br-2xl border border-blue-500/30">
      <h3 className="flex items-center space-x-3 px-3 py-2 border-b border-blue-500/30">
        <img
          src={rbc}
          alt=""
          className="h-[16px] w-[21px] pointer-events-none"
        />
        <img
          src={verified}
          alt=""
          className="h-[12.13px] w-[12.13px] pointer-events-none"
        />
      </h3>
      <div
        className="px-3 py-2 text-slate-600 font-['Inter'] leading-normal"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
};

export default LeftBubble;
