import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB9I9Yqh7xIuY3UE98M84DHTJs2qCFIT3s",
  authDomain: "shopping-cart-78928.firebaseapp.com",
  databaseURL: "https://shopping-cart-78928.firebaseio.com",
  projectId: "shopping-cart-78928",
  storageBucket: "shopping-cart-78928.appspot.com",
  messagingSenderId: "29696330192",
  appId: "1:29696330192:web:b87027a229b247ffd911d5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export default db;
