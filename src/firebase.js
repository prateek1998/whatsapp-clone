import firebase from "firebase"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBHjclAwKFsBbUgvnKrbjuVyaSwDjo0WXw",
  authDomain: "whatsapp-clone-f7e40.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-f7e40.firebaseio.com",
  projectId: "whatsapp-clone-f7e40",
  storageBucket: "whatsapp-clone-f7e40.appspot.com",
  messagingSenderId: "915606558777",
  appId: "1:915606558777:web:8ccf09470d0ae7f892d5e8",
  measurementId: "G-9MG9CKSWF6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider};
export default db;