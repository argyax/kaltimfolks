// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUWdn2_y4gIC0PweicJ2123RVxXmPubbY",
  authDomain: "kaltimfolks-33a38.firebaseapp.com",
  projectId: "kaltimfolks-33a38",
  storageBucket: "kaltimfolks-33a38.appspot.com",
  messagingSenderId: "739037118427",
  appId: "1:739037118427:web:29c447c1978266b1f5b1fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };