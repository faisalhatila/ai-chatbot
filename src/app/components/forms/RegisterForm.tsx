import React, { useState } from 'react';
import AuthInput from '../ui-elements/AuthInput';
import Button from '../ui-elements/Button';

const RegisterForm = () => {
  const [values, setValues] = useState({
    fullName:'',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    fullName:'',
    email: '',
    password: '',
  });
  const validateForm = () => {
    const newErrors: { email: string; password: string, fullName:string } = {
      fullName:'',
      email: '',
      password: '',
    };
    let isValid = true;

    // Email validation
    if (!values.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Enter a valid email address.';
      isValid = false;
    }

    // Password validation
    if (!values.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }
    if (!values.fullName) {
      newErrors.fullName = 'Fullname is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((ps) => ({
      ...ps,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log({ values });
      // Perform further actions (e.g., API calls) here
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
      <AuthInput
        label="Full Name"
        placeholder="Enter Full Name"
        type="text"
        required
        name="fullName"
        // {...register('email')}
        error={errors['fullName']}
        onChange={handleChange}
      />
      <AuthInput
        label="Email"
        placeholder="Enter Email"
        type="text"
        required
        name="email"
        // {...register('email')}
        error={errors['email']}
        onChange={handleChange}
      />
      <AuthInput
        label="Password"
        placeholder="Enter Password"
        type="password"
        required
        // {...register('password')}
        name="password"
        onChange={handleChange}
        error={errors['password']}
      />
      <Button type="submit" />
    </form>
  );
};

export default RegisterForm;
