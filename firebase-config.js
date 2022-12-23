// Import the functions you need from the SDKs you need
//This is a m_mayne139376 code 
//Assignment finished December 4, 2022
//Class mobile development 1 

import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import firebase  from 'firebase/compat/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0r6WDkV4krUCrkKg7u3z0o9RjAyGbZSQ",
  authDomain: "meowp3.firebaseapp.com",
  projectId: "meowp3",
  storageBucket: "meowp3.appspot.com",
  messagingSenderId: "526885804799",
  appId: "1:526885804799:web:563f65127dd56fe6da4aca",
  measurementId: "G-TSMGL3KP9Y",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
//initialize the firestore database 
export const db = firebase.firestore(app);
//initialize the authenticator 
export const auth=firebase.auth(app);

export default firebase;




