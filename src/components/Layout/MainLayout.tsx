import React from "react";
import Sidebar from "./Sidebar";
import { CssBaseline } from '@material-ui/core';
import { compose } from "redux";
import { connect } from "react-redux";
import Header from "./Header";
import { ApplicationState } from "../..";
import { Loader } from "semantic-ui-react";

type StateProps = {
  auth: any;
}

type Props = StateProps;

class MainLayoutBase extends React.Component<Props> {
  render() {
    const { auth } = this.props;

    return (
      <div style={{ display: 'flex' }}>
        {!auth.isLoaded ?
          <Loader />
          :
          <>
            <CssBaseline />
            <Header />
            {!auth.isEmpty && <Sidebar />}
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
  auth: state.firebase.auth
});


const MainLayout = compose(
  connect<StateProps>(mapStateToProps)
)(MainLayoutBase);

export default MainLayout;