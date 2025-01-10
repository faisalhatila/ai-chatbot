import { useState } from 'react';
import { signInAnonymously, UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { auth, firestore } from '../../../utils/firebaseConfig'; // Import your firebase config
import { toast } from 'react-toastify';

const GuestLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generateGuestFullName = () => {
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();
    return `Guest-${randomString}`;
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      // Step 1: Sign in anonymously
      const userCredential: UserCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      // Step 2: Save the guest user to Firestore with additional data
      const fullName = generateGuestFullName();
      const userId = user.uid;

      await setDoc(doc(firestore, 'users', userId), {
        fullName,
        userId,
        totalAttemptsPerDay: 3, // For guest login
        attemptsLeft: 3, // Initial attempts for guest
        accountVerifiedAt: new Date(), // Set the current date
      });

      // Step 3: Redirect to the main page after successful login
      toast.success('Login Successful');
      router.push('/'); // Or wherever you want the user to be redirected
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGuestLogin}
      disabled={loading}
      className="flex items-center border-2 border-[#353535] flex-1 p-2 rounded gap-[10px]"
    >
      <FaUser />
      <p>Guest Login</p>
    </button>
  );
};

export default GuestLogin;
