import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDMC67d4SBCFgvchKFf-oI86-h-xQfyq84",
    authDomain: "react-spa-ef002.firebaseapp.com",
    databaseURL: "https://react-spa-ef002.firebaseio.com",
    projectId: "react-spa-ef002",
    storageBucket: "react-spa-ef002.appspot.com",
    messagingSenderId: "183682296225",
    appId: "1:183682296225:web:19b3659242483081fd83e0",
    measurementId: "G-YM1QT6TBCC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;