import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB10TB_yB9O6_OvqbJjSgASg3RjWE8Lm7A",
    authDomain: "league-stats-766a4.firebaseapp.com",
    projectId: "league-stats-766a4",
    storageBucket: "league-stats-766a4.appspot.com",
    messagingSenderId: "26609538389",
    appId: "1:26609538389:web:4256aa1830609cec41cbdc",
    measurementId: "G-HC6DKCMT79"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;