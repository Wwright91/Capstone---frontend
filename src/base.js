import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_Key,
  authDomain: process.env.REACT_APP_FIREBASE_Domain,
  projectId: process.env.REACT_APP_FIREBASE_Project_Id,
  storageBucket: process.env.REACT_APP_FIREBASE_Storage_Bucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MessagingSenderId,
});
const auth = getAuth(app);
export default auth;
