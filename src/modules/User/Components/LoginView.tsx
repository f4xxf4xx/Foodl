import firebase from "firebase";
import * as firebaseui from "firebaseui";
import React from "react";
import { StyledLogin } from "./Styles/StyledLogin";

const LoginView = () => {
    const authConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
        // Popup signin flow rather than redirect flow.
        signInFlow: "popup",
        // Redirect to /recipes after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: "/recipes",
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: (authResult) => {
                if (authResult.additionalUserInfo.isNewUser) {
                    console.log("new user");
                }

                // TODO verify if user exists in db
                console.log("success");
                return true;
            },
            signInFailure: (error) => {
                console.log("fail");
                return error;
            },
        },
    };

    return (
        <StyledLogin uiConfig={authConfig} firebaseAuth={firebase.auth()} />
    );

}

export default LoginView;
