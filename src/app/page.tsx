// 'use client';
// import Chatbox from '@/components/Chatbox';
// import React, { useEffect } from 'react';
// import { useAuth } from './context/AuthContext';
// import { useRouter } from 'next/navigation';

// const App = () => {
//   const router = useRouter();
//   const {
//     user,
//     totalAttemptsPerDay,
//     attemptsLeft,
//     accountVerifiedAt,
//     isAuthenticated,
//     logout,
//   } = useAuth();
//   useEffect(() => {
//     console.log({ isAuthenticated, user, totalAttemptsPerDay, attemptsLeft });
//     if (!isAuthenticated) {
//       console.log('Not Authenticated');
//       router.push('/login');
//     }
//   }, [isAuthenticated]);

//   return <Chatbox />;
// };

// export default App;

'use client';
import Chatbox from '@/components/Chatbox';
import React, { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';

const App = () => {
  const router = useRouter();
  const {
    user,
    totalAttemptsPerDay,
    attemptsLeft,
    accountVerifiedAt,
    isAuthenticated,
    logout,
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

  // if(!isAuthenticated) {
  //   return null
  // }

  return <Chatbox />;
};

export default App;
