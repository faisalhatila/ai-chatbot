import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
// import { auth } from '../../../utils/firebaseConfig'; // Import your firebase config
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../../../utils/firebaseConfig'; // Import your firebase config
import AuthInput from '../ui-elements/AuthInput';
import Button from '../ui-elements/Button';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const validateForm = () => {
    const newErrors: { email: string; password: string; fullName: string } = {
      fullName: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { email, password, fullName } = values;
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Send verification email
        await sendEmailVerification(user);
        await setDoc(doc(firestore, "users", user.uid), {
          fullName,
          email,
          userId: user.uid,
        });
        setLoading(false);
        toast.success('Verification email sent! Please check your inbox.');
      } catch (error) {
        setLoading(false);
        console.log({ error });
        toast.error('Error during signup: ' + error);
        // setError('Error during signup: ' + err.message);
      }
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
