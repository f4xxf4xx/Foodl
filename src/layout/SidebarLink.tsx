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

const SidebarLink = (props: Props) => {
    const active = props.currentPath === props.link.path;

    return (
        <ListItem
            key={props.key}
            button={true}
            component={Link}
            to={props.link.path}
            disableRipple={true}
            selected={active}
        >
            <ListItemIcon>
                <Icon>{props.link.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={props.link.name} />
        </ListItem>
    );
}

export default withRouter(SidebarLink);
