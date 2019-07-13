import { Icon, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { ListItemLink } from "./links";

interface OwnProps {
  key: number;
  currentPath: string;
  link: ListItemLink;
}

type Props = OwnProps & RouteComponentProps;

class SidebarLinkBase extends React.Component<Props> {
  public render() {
    const { key, currentPath, link } = this.props;
    const active = currentPath === link.path;

    return (
      <ListItem
        key={key}
        button={true}
        component={Link}
        to={link.path}
        disableRipple={true}
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
