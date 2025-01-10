import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface AuthProps {
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
  error: string;
  onChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
  // onChange: any;
  name: string;
}

const renderEye = (type: string, setType: (val: string) => void) => {
  if (type === 'password')
    return (
      <FaEyeSlash onClick={() => setType('text')} className="cursor-pointer" />
    );
  return (
    <FaEye
      onClick={() => setType('password')}
      className="cursor-pointer"
    />
  );
};
const AuthInput = ({
  label,
  placeholder,
  type,
  error,
  onChange,
  name,
}: AuthProps) => {
  const [inputType, setInputType] = useState(type);
  return (
    <div className="flex flex-col w-full gap-[5px]">
      <label className="text-[14px]">{label}</label>
      <div
        className={`flex items-center border p-2 rounded ${
          !!error ? 'border-red-600 border-2' : 'border-[#000] border-2'
        }`}
      >
        <input
          placeholder={placeholder}
          type={inputType}
          className={`bg-transparent placeholder-[#414141] text-[14px] focus:outline-none flex-1`}
          name={name}
          onChange={onChange}
        />
        {type === 'password' && renderEye(inputType, setInputType)}
      </div>
      {error && (
        <span className="text-[12px] text-red-600 font-bold">{error}</span>
      )}
    </div>
  );
};

export default AuthInput;
