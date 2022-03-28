import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyC-IFtsSnIzoHLAU5NgBitiDIBTXPRLDoE",
  authDomain: "multiapp-staging.firebaseapp.com",
  projectId: "multiapp-staging",
  storageBucket: "multiapp-staging.appspot.com",
  messagingSenderId: "609024697656",
  appId: "1:609024697656:web:ce2bcdd29b4c7969368dcd"
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