import React from "react";
import { getLinks, getAdminLinks } from "./links";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Icon, Divider } from '@material-ui/core';
import { Link } from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  }),
);

function Sidebar() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
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
        {getAdminLinks().map((prop, key) =>
          <Link key={key} to={prop.path}>
            <ListItem button>
              <ListItemIcon><Icon>{prop.icon}</Icon></ListItemIcon>
              <ListItemText primary={prop.name} />
            </ListItem>
          </Link>
        )}
      </List>
    </Drawer >
  );
}

export default Sidebar;