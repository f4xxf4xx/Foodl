import { Divider, Drawer, Hidden, List, Toolbar } from "@material-ui/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getAdminLinks, getLinks } from "./links";
import SidebarLink from "./SidebarLink";
import { StyledDrawer } from "./Styles/StyledDrawer";
import { StyledNav } from "./Styles/StyledNav";

interface OwnProps {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

type Props = OwnProps & RouteComponentProps;

class SidebarBase extends React.Component<Props> {
  public getDrawer(path: string) {
    return (
      <div>
        <Toolbar />
        <List>
          {getLinks().map((link, index) =>
            <SidebarLink
              key={index}
              currentPath={path}
              link={link}
            />,
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
            />,
          )}
        </List>
      </div>
    );
  }

  public render() {
    const path = this.props.location.pathname;
    const { drawerOpen, toggleDrawer } = this.props;

    return (
      <StyledNav>
        <Hidden smUp={true} implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {this.getDrawer(path)}
          </Drawer>
        </Hidden>
        <Hidden xsDown={true} implementation="css">
          <StyledDrawer
            variant="permanent"
            open={true}
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
