// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "kaltimfolks-7a178.firebaseapp.com",
  projectId: "kaltimfolks-7a178",
  storageBucket: "kaltimfolks-7a178.appspot.com",
  messagingSenderId: "511642203085",
  appId: "1:511642203085:web:56ee251e77ed5e63a64a84",
  measurementId: "G-BR0NZ6MECV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);