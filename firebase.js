import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPrHmKsZjmdpcErmEgK27UTI57-jyX-xw",
  authDomain: "whatsapp-2-93873.firebaseapp.com",
  projectId: "whatsapp-2-93873",
  storageBucket: "whatsapp-2-93873.appspot.com",
  messagingSenderId: "45337215781",
  appId: "1:45337215781:web:b500b7443f9540e351d0cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
