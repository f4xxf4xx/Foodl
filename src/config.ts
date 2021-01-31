import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

if (process.env.NODE_ENV !== "production") {
  db.settings({
    host: "localhost:8080",
    ssl: false,
  });
}

export { auth, db, storage, firebase };
