// 'use client';
// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';
// import { auth, firestore } from '../../utils/firebaseConfig'; // Import Firebase instance
// import {
//   User as FirebaseUser,
//   onAuthStateChanged,
//   signOut as firebaseSignOut,
// } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';

// interface AuthContextType {
//   user: FirebaseUser | null;
//   totalAttemptsPerDay: number | null;
//   attemptsLeft: number | null;
//   accountVerifiedAt: Date | null;
//   isAuthenticated: boolean;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<FirebaseUser | null>(null);
//   const [totalAttemptsPerDay, setTotalAttemptsPerDay] = useState<number | null>(null);
//   const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
//   const [accountVerifiedAt, setAccountVerifiedAt] = useState<Date | null>(null);
//   const router = useRouter();

//   // Fetch user-related data from Firestore
//   const fetchUserData = async (userId: string) => {
//     const userDocRef = doc(firestore, 'users', userId);
//     const userDoc = await getDoc(userDocRef);

//     if (userDoc.exists()) {
//       const data = userDoc.data();
//       setTotalAttemptsPerDay(data.totalAttemptsPerDay || 0);
//       setAttemptsLeft(data.attemptsLeft || 0);
//       setAccountVerifiedAt(data.accountVerifiedAt ? new Date(data.accountVerifiedAt) : null);
//     }
//   };

//   // Monitor Firebase authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         setUser(firebaseUser);
//         await fetchUserData(firebaseUser.uid); // Fetch Firestore data for the user
//       } else {
//         setUser(null);
//         setTotalAttemptsPerDay(null);
//         setAttemptsLeft(null);
//         setAccountVerifiedAt(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const logout = async () => {
//     await firebaseSignOut(auth);
//     setUser(null);
//     setTotalAttemptsPerDay(null);
//     setAttemptsLeft(null);
//     setAccountVerifiedAt(null);
//     router.push('/login'); // Redirect to login
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         totalAttemptsPerDay,
//         attemptsLeft,
//         accountVerifiedAt,
//         isAuthenticated: !!user,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { auth, firestore } from '../../utils/firebaseConfig'; // Import Firebase instance
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: FirebaseUser | null;
  totalAttemptsPerDay: number | null;
  fullName:string;
  attemptsLeft: number | null;
  accountVerifiedAt: Date | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [totalAttemptsPerDay, setTotalAttemptsPerDay] = useState<number | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [fullName, setFullName] = useState<string>('');
  const [accountVerifiedAt, setAccountVerifiedAt] = useState<Date | null>(null);
  const [authChecked, setAuthChecked] = useState(false); // State to ensure auth status is resolved
  const router = useRouter();

  // Fetch user-related data from Firestore
  const fetchUserData = async (userId: string) => {
    const userDocRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      setTotalAttemptsPerDay(data.totalAttemptsPerDay || 0);
      setAttemptsLeft(data.attemptsLeft || 0);
      setFullName(data.fullName || '')
      setAccountVerifiedAt(data.accountVerifiedAt ? new Date(data.accountVerifiedAt) : null);
    }
  };

  // Monitor Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchUserData(firebaseUser.uid); // Fetch Firestore data for the user
        router.push('/'); // Redirect to home page if authenticated
      } else {
        setUser(null);
        setTotalAttemptsPerDay(null);
        setAttemptsLeft(null);
        setFullName('')
        setAccountVerifiedAt(null);
        router.push('/login'); // Redirect to login if not authenticated
      }
      setAuthChecked(true); // Mark authentication as checked
    });

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setTotalAttemptsPerDay(null);
    setAttemptsLeft(null);
    setFullName('')
    setAccountVerifiedAt(null);
    router.push('/login'); // Redirect to login
  };

  if (!authChecked) {
    // Optional loading state while auth is being checked
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        totalAttemptsPerDay,
        attemptsLeft,
        accountVerifiedAt,
        isAuthenticated: !!user,
        fullName,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
