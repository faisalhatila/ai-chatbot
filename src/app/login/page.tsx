'use client';
import React, { useState} from 'react';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import GuestLogin from '../components/forms/GuestLogin';
import GoogleLogin from '../components/forms/GoogleLogin';


const Login = () => {
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
            <GoogleLogin />
            <GuestLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
