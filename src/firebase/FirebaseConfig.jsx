import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrADEuejsHhG_ss5j5TLN3sYlRNfmqqjc",
  authDomain: "ecommerceapp-9dcd3.firebaseapp.com",
  projectId: "ecommerceapp-9dcd3",
  storageBucket: "ecommerceapp-9dcd3.appspot.com",
  messagingSenderId: "672482650590",
  appId: "1:672482650590:web:dcf50bbbe0cf7dab65d54f"
};


const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;