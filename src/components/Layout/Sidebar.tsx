import React from "react";
import { getLinks, getAdminLinks } from "./links";
import { List, ListItem, ListItemIcon, ListItemText, Icon, Divider } from '@material-ui/core';
import { Link } from "react-router-dom";
import { StyledDrawer } from "./Styles/StyledDrawer";

type Props = {};

class Sidebar extends React.Component<Props> {
  render() {
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
        </List>
        <Divider />
        <List>
          {/* TODO if admin */}
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