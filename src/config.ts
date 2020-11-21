import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const config = {
    apiKey: "AIzaSyAvdF-pxNDyB4ZmcAHOscjrgn5OntQBLqM",
    authDomain: "foodl-396b6.firebaseapp.com",
    databaseURL: "https://foodl-396b6.firebaseio.com",
    projectId: "foodl-396b6",
    storageBucket: "foodl-396b6.appspot.com",
    messagingSenderId: "706507477963",
    appId: "1:706507477963:web:fde416d4d549c347",
};

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

if (process.env.NODE_ENV !== 'production') {
    db.settings({
        host: 'localhost:8080',
        ssl: false
    });
}

export { auth, db, storage, firebase };