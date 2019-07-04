import React from "react";
import Sidebar from "./Sidebar";
import {
  CssBaseline
} from '@material-ui/core';
import firebase from "firebase";
import { Dispatch, bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as userActions from '../../store/users/userActions';
import Header from "./Header";
import { ApplicationState } from "../..";
import { Loader } from "semantic-ui-react";

type StateProps = {
  signedIn: boolean;
  loadingUser: boolean;
}

type DispatchProps = {
  userSignIn: typeof userActions.userSignIn;
  userSignOut: typeof userActions.userSignOut;
};

type Props = StateProps & DispatchProps;

class MainLayoutBase extends React.Component<Props> {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        //TODO on user registering, create a db user for it
        if (user) {
          if (!this.props.signedIn) {
            this.props.userSignIn(user.uid);
          }
        } else {
          // this.props.userSignOut();
        }
      }
    );
  }

  render() {
    const { signedIn, loadingUser } = this.props;
    const user = firebase.auth().currentUser;

    return (
      <div style={{ display: 'flex' }}>
        {loadingUser ?
          <Loader />
          :
          <>
            <CssBaseline />
            <Header />
            {signedIn && user && <Sidebar />}
            <main style={{ flexGrow: 1, padding: 5, marginTop: 70 }}>
              {this.props.children}
            </main>
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  signedIn: state.user.signedIn,
  loadingUser: state.user.loadingUser
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userSignIn: bindActionCreators(userActions.userSignIn, dispatch),
  userSignOut: bindActionCreators(userActions.userSignOut, dispatch)
});

const MainLayout = compose(
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(MainLayoutBase);

export default MainLayout;