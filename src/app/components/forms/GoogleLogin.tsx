import { useState } from 'react';
import {
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import { auth, firestore } from '../../../utils/firebaseConfig';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/context/AuthContext';

const GoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setFullName, setAttemptsLeft } = useAuth();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const userCredentials = await signInWithPopup(auth, provider);
      const user = userCredentials.user;

      if (user.emailVerified) {
        onAuthStateChanged(auth, async (user) => {
          if (user && user.emailVerified) {
            const userRef = doc(firestore, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            const currentTime = new Date();
            const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

            if (userDoc.exists()) {
              const userData = userDoc.data();
              const accountVerifiedAt = userData.accountVerifiedAt?.toDate(); // Firestore timestamp to JS Date

              if (accountVerifiedAt) {
                const timeSinceVerification =
                  currentTime.getTime() - accountVerifiedAt.getTime();

                if (timeSinceVerification >= twentyFourHoursInMs) {
                  // Reset attemptsLeft to 10 after 24 hours
                  await updateDoc(userRef, { attemptsLeft: 10 });
                  setAttemptsLeft(10);
                  toast.success('Attempts reset to 10 after 24 hours.');
                } else {
                  setAttemptsLeft(userData.attemptsLeft);
                }
              }
            } else {
              // Create user document with initial data
              const fullName =
                user?.displayName ||
                `Guest-${Math.random().toString(36).substr(2, 5)}`;
              await setDoc(userRef, {
                fullName,
                userId: user.uid,
                totalAttemptsPerDay: 10,
                attemptsLeft: 10,
                accountVerifiedAt: currentTime,
              });

              setAttemptsLeft(10);
              setFullName(fullName);
              toast.success('New user created successfully.');
            }

            window.location.reload();
          }
        });
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={googleSignIn}
      disabled={loading}
      className="flex items-center border-2 border-[#353535] flex-1 p-2 rounded gap-[10px]"
    >
      <FaGoogle />
      <p>{loading ? 'Please wait...' : 'Google Auth'}</p>
    </button>
  );
};

export default GoogleLogin;
