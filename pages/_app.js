import { useEffect } from 'react';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Loading from '../components/Loading';
import Login from './login';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // useAuthState hook monitors user authentication status
  const [user, loading, error] = useAuthState(auth);
  // useEffect hook updates the firebase DB every time the user
  // authentication status changes
  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, 'users', user.uid),
        {
          email: user.email,
          lastSeen: Timestamp.now(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);
  if (loading) return <Loading />;
  if (!user) {
    return <Login />;
  } else {
    return <Component {...pageProps} />;
  }
}

export default MyApp;
