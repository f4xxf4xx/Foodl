import React from "react";
import { getLinks, getAdminLinks } from "./links";
import { List, ListItem, ListItemIcon, ListItemText, Icon, Divider, IconButton, Hidden, Drawer, Toolbar } from '@material-ui/core';
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { StyledDrawer } from "./Styles/StyledDrawer";
import SidebarLink from "./SidebarLink";
import { StyledNav } from "./Styles/StyledNav";

type OwnProps = {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

type Props = OwnProps & RouteComponentProps;

class SidebarBase extends React.Component<Props> {
  getDrawer(path: string) {
    return (
      <div>
        <Toolbar />
        <List>
          {getLinks().map((link, index) =>
            <SidebarLink
              key={index}
              currentPath={path}
              link={link}
            />
          )}
        </List>
        <Divider />
        <List>
          {/* TODO if admin */}
          {getAdminLinks().map((link, index) =>
            <SidebarLink
              key={index}
              currentPath={path}
              link={link}
            />
          )}
        </List>
      </div>
    )
  };

  render() {
    const path = this.props.location.pathname;
    const { drawerOpen, toggleDrawer } = this.props;

    return (
      <StyledNav>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{
              keepMounted: true
            }}
          >
            {this.getDrawer(path)}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <StyledDrawer
            variant="permanent"
            open
          >
            {this.getDrawer(path)}
          </StyledDrawer>
        </Hidden>
      </StyledNav>
    );
  }
}

const Sidebar = withRouter(SidebarBase);

export default Sidebar;