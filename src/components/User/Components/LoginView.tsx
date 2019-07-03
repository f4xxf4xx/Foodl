import React, { PureComponent } from "react";
import { RouteProps } from "react-router-dom";
import { FirebaseAuth } from "react-firebaseui";
import firebase from "firebase";
import * as firebaseui from 'firebaseui';

type Props = RouteProps;

class LoginView extends PureComponent<Props> {
    authConfig = {
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
                if (authResult.additionalUserInfo.isNewUser) {
                    console.log("new user");
                }

                //TODO verify if user exists in db
                console.log("success");
                return true;
            },
            signInFailure: (error) => {
                console.log("fail");

                return error;
            }
        }
    };

    componentDidMount() {

    }

    render() {
        return (
            <FirebaseAuth uiConfig={this.authConfig} firebaseAuth={firebase.auth()} />
        );
    }
}

export default LoginView;