import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

firebase.initializeApp(config);
const auth = firebase.auth();

const firestore = firebase.firestore();
const storage = firebase.storage();

auth.useDeviceLanguage();
if (process.env.NODE_ENV !== "production") {
  firestore.settings({
    host: "localhost:8080",
    ssl: false,
  });
}

export { auth, firestore, storage };
