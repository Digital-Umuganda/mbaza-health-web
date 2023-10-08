import { InputHTMLAttributes } from 'react';

interface SelectInputProps
  extends InputHTMLAttributes<HTMLSelectElement> {
  leftIcon: React.ReactNode;
  options: {
    value: string;
    label: string;
  }[];
}
const SelectInput = ({
  className = '',
  placeholder = 'Email',
  leftIcon,
  options,
  ...rest
}: SelectInputProps) => {
  return (
    <div className={`flex items-center relative ${className}`}>
      <select
        {...rest}
        placeholder={placeholder}
        className="disabled:bg-gray-100 disabled:cursor-not-allowed px-10 py-3 w-full bg-white rounded-lg border outline-none border-blue-500/30 focus:border-blue-500 placeholder:text-slate-600 placeholder:text-sm font-normal font-['Inter']"
      >
        {options.map((option, index) => (
          <option
            value={option.value}
            key={`${index}_${option.label}`}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute left-4 text-slate-600">{leftIcon}</div>
    </div>
  );
};

export default SelectInput;
