import React, { PureComponent } from "react";
import { RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import { compose, bindActionCreators, Dispatch } from "redux";
import * as userActions from "../userActions";
import { StyledFirebaseAuth } from "react-firebaseui";
import { authConfig } from "../../../config";
import firebase from "firebase";

type StateProps = {
    signedIn: boolean;
};

type DispatchProps = {
    userSignIn: typeof userActions.userSignIn;
};

type Props = StateProps & DispatchProps & RouteProps;

class LoginViewBase extends PureComponent<Props> {
    componentDidMount() {
        
    }

    render() {
        return (
            <>
                <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={firebase.auth()} />                
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        signedIn: state.user.signedIn
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        userSignIn: bindActionCreators(userActions.userSignIn, dispatch)
    };
};

const LoginView = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(LoginViewBase);

export default LoginView;