import React from "react";
import { getLinks, getAdminLinks } from "./links";
import { List, ListItem, ListItemIcon, ListItemText, Icon, Divider } from '@material-ui/core';
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { StyledDrawer } from "./Styles/StyledDrawer";

type Props = RouteComponentProps;

class SidebarBase extends React.Component<Props> {
  render() {
    const path = this.props.location.pathname;

    return (
      <StyledDrawer
        variant="permanent"
      >
        <div style={{ minHeight: 64 }} />
        <List>
          {getLinks().map((prop, key) =>
            <Link key={key} to={prop.path}>
              <ListItem button selected={path == prop.path}>
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
              <ListItem button selected={path == prop.path}>
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

const Sidebar = withRouter(SidebarBase);

export default Sidebar;