import * as firebase from "firebase";

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

const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage, firebase };