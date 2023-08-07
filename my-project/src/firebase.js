// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDx3O8TvF-cl8Vvl8KZQWZirQMLkoyerKc",
  authDomain: "teestyle-react.firebaseapp.com",
  projectId: "teestyle-react",
  storageBucket: "teestyle-react.appspot.com",
  messagingSenderId: "418481137202",
  appId: "1:418481137202:web:6c9bee3d7a021df399be2b",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
