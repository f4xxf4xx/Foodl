import React from "react";
import { ListItemLink, getLinks, getAdminLinks } from "./links";
import { List, ListItem, ListItemIcon, ListItemText, Icon, Divider } from '@material-ui/core';
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { StyledDrawer } from "./Styles/StyledDrawer";


type OwnProps = {
  key: number;
  currentPath: string;
  link: ListItemLink;
}

type Props = OwnProps & RouteComponentProps;

class SidebarLinkBase extends React.Component<Props> {
  render() {
    const { key, currentPath, link } = this.props;
    const active = currentPath == link.path;

    return (
      <ListItem
        key={key}
        button
        component={Link}
        to={link.path}
        disableRipple
        selected={active}
      >
        <ListItemIcon>
          <Icon>{link.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={link.name} />
      </ListItem>
    );
  }
}

const SidebarLink = withRouter(SidebarLinkBase);

export default SidebarLink;