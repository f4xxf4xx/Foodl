import React, { PureComponent } from "react";
import { RouteProps } from "react-router-dom";
import { FirebaseAuth } from "react-firebaseui";
import firebase from "firebase";
import * as firebaseui from 'firebaseui';
import { bindActionCreators, Dispatch, compose } from "redux";
import { connect } from "react-redux";
import * as userActions from './../../../store/users/userActions';

type DispatchProps = {
    userLoadStart: typeof userActions.userLoadStart;
    userLoadStop: typeof userActions.userLoadStop;

}

type Props = RouteProps & DispatchProps;

class LoginViewBase extends PureComponent<Props> {
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
                this.props.userLoadStart();
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

    render() {
        return (
            <FirebaseAuth uiConfig={this.authConfig} firebaseAuth={firebase.auth()} />
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    userLoadStart: bindActionCreators(userActions.userSignIn, dispatch),
    userLoadStop: bindActionCreators(userActions.userSignOut, dispatch)
});

const LoginView = compose(
    connect<{}, DispatchProps>(null, mapDispatchToProps)
)(LoginViewBase);

export default LoginView;