// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Production Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUWdn2_y4gIC0PweicJ2123RVxXmPubbY",
  authDomain: "kaltimfolks-33a38.firebaseapp.com",
  projectId: "kaltimfolks-33a38",
  storageBucket: "kaltimfolks-33a38.appspot.com",
  messagingSenderId: "739037118427",
  appId: "1:739037118427:web:29c447c1978266b1f5b1fe",
};

// Local Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyAQmfrx3CMkYROg6EQVAZYhiQk2z5k2vIk",
//   authDomain: "kaltimfolks-423301.firebaseapp.com",
//   projectId: "kaltimfolks-423301",
//   storageBucket: "kaltimfolks-423301.appspot.com",
//   messagingSenderId: "112865395072",
//   appId: "1:112865395072:web:71643e04160ab89b83c165"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };