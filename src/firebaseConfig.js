// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1ou4nEKHiMcT90n1H6EeKGK9rr9P9j9o",
  authDomain: "alchainx.firebaseapp.com",
  projectId: "alchainx",
  storageBucket: "alchainx.firebasestorage.app",
  messagingSenderId: "468464805308",
  appId: "1:468464805308:web:2566e9ccaa77c73a2177b9",
  measurementId: "G-375JXPMKR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
