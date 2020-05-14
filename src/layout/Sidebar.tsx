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

const Sidebar = (props: Props) => {
    const getDrawer = (path: string) =>{
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

    return (
        <StyledNav>
            <Hidden smUp={true} implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={props.drawerOpen}
                    onClose={props.toggleDrawer}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {getDrawer(props.location.pathname)}
                </Drawer>
            </Hidden>
            <Hidden xsDown={true} implementation="css">
                <StyledDrawer
                    variant="permanent"
                    open={true}
                >
                    {getDrawer(props.location.pathname)}
                </StyledDrawer>
            </Hidden>
        </StyledNav>
    );
}

export default withRouter(Sidebar);
