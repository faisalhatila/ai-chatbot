import React, { useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore'; // Import your firebase config
import { auth, firestore } from '../../../utils/firebaseConfig'; // Import your firebase config
import AuthInput from '../ui-elements/AuthInput';
import Button from '../ui-elements/Button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const validateForm = () => {
    const newErrors: { email: string; password: string } = {
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
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Check if email is verified
        if (user.emailVerified) {
          // alert('Login Successful');
          onAuthStateChanged(auth, async (user) => {
            if (user && user.emailVerified) {
              const userRef = doc(firestore, 'users', user.uid);
              const userDoc = await getDoc(userRef);
              if (userDoc.exists() && !userDoc.data().totalAttemptsPerDay) {
                // Add totalAttemptsPerDay and attemptsLeft
                await updateDoc(userRef, {
                  totalAttemptsPerDay: 10,
                  attemptsLeft: 10,
                  accountVerifiedAt: new Date().toISOString(),
                });
                console.log('User document updated with attempts.');
              }
              toast.success('Login Successful');
              router.push('/');
            }
          });
        } else {
          toast.error('Please verify your email first.');
        }
      } catch (err) {
        console.log({ err });
        toast.success('Error during login: ' + err);
      }
      // Perform further actions (e.g., API calls) here
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
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

export default LoginForm;
