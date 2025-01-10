import { auth, firestore } from '../utils/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
export const updateAttempts = async () => {
  try {
    const user = auth.currentUser; // Get the currently logged-in user
    if (!user) {
      throw new Error('No authenticated user found.');
    }

    const userRef = doc(firestore, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentAttemptsLeft = userData.attemptsLeft;

      if (currentAttemptsLeft > 0) {
        await updateDoc(userRef, { attemptsLeft: currentAttemptsLeft - 1 });
        console.log('Attempts decremented by 1.');
      } else {
        console.warn('No remaining attempts to decrement.');
      }
    } else {
      console.warn('User document does not exist in Firestore.');
    }
  } catch (firestoreError) {
    console.error('Error updating attempts in Firestore:', firestoreError);
  }
};
