import React from "react";
import Sidebar from "./Sidebar";
import { CssBaseline } from '@material-ui/core';
import { compose } from "redux";
import { connect } from "react-redux";
import Header from "./Header";
import { ApplicationState } from "../..";
import { Loader } from "semantic-ui-react";
import { Wrapper } from "./Styles/Wrapper";

type StateProps = {
  auth: any;
}

type Props = StateProps;

class MainLayoutBase extends React.Component<Props> {
  render() {
    const { auth } = this.props;

    return (
      <Wrapper>
        {!auth.isLoaded ?
          <Loader active inline='centered' />
          :
          <>
            <CssBaseline />
            <Header />
            {!auth.isEmpty && <Sidebar />}
            <div className="main">
              {this.props.children}
            </div>
          </>
        }
      </Wrapper>
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