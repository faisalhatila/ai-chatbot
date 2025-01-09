'use client';
import React, { useState, SyntheticEvent } from 'react';
import { FaGoogle, FaUser } from 'react-icons/fa';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
// import { useForm } from 'react-hook-form';
// import { loginFormSchema } from '@/utils/schema';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import AuthInput from '../components/ui-elements/AuthInput';
// import Button from '../components/ui-elements/Button';
// import { useFormik } from 'formik';

const Login = () => {
  // const [values, setValues] = useState({
  //   email: '',
  //   password: '',
  // });
  // const [errors, setErrors] = useState({
  //   email: '',
  //   password: '',
  // });
  // const validateForm = () => {
  //   const newErrors: { email: string; password: string } = {
  //     email: '',
  //     password: '',
  //   };
  //   let isValid = true;

  //   // Email validation
  //   if (!values.email) {
  //     newErrors.email = 'Email is required.';
  //     isValid = false;
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
  //     newErrors.email = 'Enter a valid email address.';
  //     isValid = false;
  //   }

  //   // Password validation
  //   if (!values.password) {
  //     newErrors.password = 'Password is required.';
  //     isValid = false;
  //   } else if (values.password.length < 6) {
  //     newErrors.password = 'Password must be at least 6 characters.';
  //     isValid = false;
  //   }

  //   setErrors(newErrors);
  //   return isValid;
  // };
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setValues((ps) => ({
  //     ...ps,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     console.log({ values });
  //     // Perform further actions (e.g., API calls) here
  //   }
  // };
  const [activeTab, setActiveTab] = useState('Login');
  const tabs = ['Login', 'Register'];

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-w-[100vw] min-h-[100vh] flex items-center justify-center">
      <div className="backdrop-blur-sm bg-white/30 w-[350px] rounded-[10px]">
        <div className="flex items-center gap-[10px] p-3">
          {tabs.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(item)}
              className={`flex-1 cursor-pointer ${
                item === activeTab && 'bg-blue-500 text-white font-bold'
              } rounded py-1`}
            >
              <p className="text-center">{item}</p>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 flex flex-col gap-[20px]">
          {
            activeTab === 'Login' ? <LoginForm /> : <RegisterForm />
          }
          <hr />
          <div className="flex gap-[10px] items-center">
            <div className="flex items-center border border-[#888] flex-1 p-2 rounded gap-[10px]">
              <FaGoogle />
              <p>Google Auth</p>
            </div>
            <div className="flex items-center border border-[#888] flex-1 p-2 rounded gap-[10px]">
              <FaUser />
              <p>Guest Login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
