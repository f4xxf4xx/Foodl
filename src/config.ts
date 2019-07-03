import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

export const config = {
    apiKey: "AIzaSyAvdF-pxNDyB4ZmcAHOscjrgn5OntQBLqM",
    authDomain: "foodl-396b6.firebaseapp.com",
    databaseURL: "https://foodl-396b6.firebaseio.com",
    projectId: "foodl-396b6",
    storageBucket: "foodl-396b6.appspot.com",
    messagingSenderId: "706507477963",
    appId: "1:706507477963:web:fde416d4d549c347"
};

export const authConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /recipes after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/recipes',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      if(authResult.additionalUserInfo.isNewUser) {
        console.log("new user");
      }

      //TODO verify if user exists in db
      console.log("succes");
      return true;
    },
    signInFailure: (error) => {
      console.log("fail");

      return error;
    }
  }
};  

firebase.initializeApp(config);

const db = firebase.firestore();
export { db };