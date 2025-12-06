// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDowIlX11yN3bE_Vyv1rA1OoyMxiL76Y5U",
  authDomain: "digitallifelessons.firebaseapp.com",
  projectId: "digitallifelessons",
  storageBucket: "digitallifelessons.firebasestorage.app",
  messagingSenderId: "546991854734",
  appId: "1:546991854734:web:a18b64e588d49ecdb7e5df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);