import React from "react";
import { getLinks, getAdminLinks, getLoggedOnLinks } from "./links";
import { List, ListItem, ListItemIcon, ListItemText, Icon, Divider } from '@material-ui/core';
import { Link } from "react-router-dom";
import { StyledDrawer } from "./Styles/StyledDrawer";
import { compose } from "redux";
import { connect } from "react-redux";
import * as firebase from "firebase";

type State = {
  signedIn: boolean;
}

type Props = {};

class Sidebar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      signedIn: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.setState({ signedIn: true })
        }
      }
    );
  }

  render() {
    const { signedIn } = this.state;

    return (
      <StyledDrawer
        variant="permanent"
      >
        <div style={{ minHeight: 64 }} />
        <List>
          {getLinks().map((prop, key) =>
            <Link key={key} to={prop.path}>
              <ListItem button>
                <ListItemIcon><Icon>{prop.icon}</Icon></ListItemIcon>
                <ListItemText primary={prop.name} />
              </ListItem>
            </Link>
          )}
          {signedIn &&
            getLoggedOnLinks().map((prop, key) =>
              <Link key={key} to={prop.path}>
                <ListItem button>
                  <ListItemIcon><Icon>{prop.icon}</Icon></ListItemIcon>
                  <ListItemText primary={prop.name} />
                </ListItem>
              </Link>
            )
          }
        </List>
        <Divider />
        <List>
          {getAdminLinks().map((prop, key) =>
            <Link key={key} to={prop.path}>
              <ListItem button>
                <ListItemIcon><Icon>{prop.icon}</Icon></ListItemIcon>
                <ListItemText primary={prop.name} />
              </ListItem>
            </Link>
          )}
        </List>
      </StyledDrawer>
    );
  }
}

export default Sidebar;