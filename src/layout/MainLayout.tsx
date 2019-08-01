import { CssBaseline } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { ApplicationState } from "..";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Wrapper } from "./Styles/Wrapper";

interface StateProps {
  auth: any;
}

interface State {
  drawerOpen: boolean;
}

type Props = StateProps;

class MainLayoutBase extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
  }

  public toggleDrawer = () => {
    this.setState((prevProps) => ({
      drawerOpen: !prevProps.drawerOpen,
    }));
  }

  public render() {
    const { auth } = this.props;
    const { drawerOpen } = this.state;

    return (
      <Wrapper>
        <CssBaseline />
        <Header toggleDrawer={this.toggleDrawer} />
        {!auth.isEmpty &&
          <Sidebar
            drawerOpen={drawerOpen}
            toggleDrawer={this.toggleDrawer}
          />
        }
        <div className="main">
          {this.props.children}
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.firebase.auth,
});

const MainLayout = compose(
  connect<StateProps>(mapStateToProps),
)(MainLayoutBase);

export default MainLayout;
