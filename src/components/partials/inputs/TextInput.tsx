import { InputHTMLAttributes, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon: React.ReactNode;
}
const TextInput = ({
  className = '',
  placeholder = 'Email',
  leftIcon,
  type = 'text',
  ...rest
}: TextInputProps) => {
  const [toggleEye, setToggleEye] = useState(false);

  const onToggle = () => {
    setToggleEye(prev => !prev);
  };
  return (
    <div className={`flex items-center relative ${className}`}>
      <input
        {...rest}
        placeholder={placeholder}
        type={
          type === 'password'
            ? toggleEye
              ? 'text'
              : 'password'
            : type
        }
        className="px-10 py-3 w-full bg-white rounded-lg border outline-none border-blue-500/30 focus:border-blue-500 placeholder:text-slate-600 placeholder:text-sm font-normal font-['Inter']"
      />
      <div className="absolute left-4 text-slate-600">{leftIcon}</div>
      {type === 'password' && (
        <button
          type="button"
          className="absolute right-4 text-slate-600 cursor-pointer py-2"
          onClick={onToggle}
        >
          {toggleEye ? <HiEye size={24} /> : <HiEyeOff size={24} />}
        </button>
      )}
    </div>
  );
};

export default TextInput;
