import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyDB75_JAYGKciHl-K4XUSVC9NxS7TDWXjE",
  authDomain: "multiapp-dev-dd122.firebaseapp.com",
  projectId: "multiapp-dev-dd122",
  storageBucket: "multiapp-dev-dd122.appspot.com",
  messagingSenderId: "665532418682",
  appId: "1:665532418682:web:dda45edbbf5fca964c49c3"
};


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
  firebase.app(); // if already initialized, use that one
}

export {firebase};

export const fb = firebase.firestore;
export const auth = firebase.auth()
export const db = firebase.firestore()