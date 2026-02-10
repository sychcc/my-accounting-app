// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGAnm3dIaO6NqumeowNLWNir0KIcp5jCA",
  authDomain: "my-accounting-app-da8cd.firebaseapp.com",
  projectId: "my-accounting-app-da8cd",
  storageBucket: "my-accounting-app-da8cd.firebasestorage.app",
  messagingSenderId: "790041126449",
  appId: "1:790041126449:web:8b9787c86f66ba51ab9710",
  measurementId: "G-S7839XX30R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//初始化並且export 這樣其他頁面才可以用
export const auth=getAuth(app)
export const db=getFirestore(app)