
'use client';
import Chatbox from '@/components/Chatbox';
import React, { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';

const App = () => {
  const router = useRouter();
  const {
    isAuthenticated,
  } = useAuth();

  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      setIsAuthChecked(true);
      if (!isAuthenticated) {
        console.log('Not Authenticated');
        // router.push('/login');
      }
    }
  }, [isAuthenticated]);

  // Show a loading indicator or nothing while authentication state is being resolved
  if (!isAuthChecked || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <Chatbox />;
};

export default App;
