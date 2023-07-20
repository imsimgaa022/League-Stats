import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyACvAH0kyypccs5YMgFnKV_Idofr3SmtV0",
  authDomain: "league-stats-71995.firebaseapp.com",
  projectId: "league-stats-71995",
  storageBucket: "league-stats-71995.appspot.com",
  messagingSenderId: "910079036343",
  appId: "1:910079036343:web:59ffaddb5a19282cdcf632",
  measurementId: "G-32PMTSV5RE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the Firebase authentication module
export const auth = firebase.auth();