import React from "react";
import Sidebar from "./Sidebar";
import { CssBaseline, Toolbar } from '@material-ui/core';
import { compose } from "redux";
import { connect } from "react-redux";
import Header from "./Header";
import { Loader } from "semantic-ui-react";
import { Wrapper } from "./Styles/Wrapper";
import { ApplicationState } from "..";

type StateProps = {
  auth: any;
}

type State = {
  drawerOpen: boolean;
}

type Props = StateProps;

class MainLayoutBase extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
  }

  toggleDrawer = () => {
    this.setState(prevProps => ({
      drawerOpen: !prevProps.drawerOpen
    }))
  }

  render() {
    const { auth } = this.props;
    const { drawerOpen } = this.state;

    return (
      <Wrapper>
        {!auth.isLoaded ?
          <Loader active inline='centered' />
          :
          <>
            <CssBaseline />
            <Header toggleDrawer={this.toggleDrawer} />
            {!auth.isEmpty && <Sidebar drawerOpen={drawerOpen} toggleDrawer={this.toggleDrawer} />}
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