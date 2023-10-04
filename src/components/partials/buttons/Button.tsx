import React from 'react';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ label, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`px-4 py-3 bg-blue-500 rounded-lg border text-center text-white text-base font-bold font-['Inter'] uppercase ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
