import React from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);

export function TopBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Foodl
        </Typography>
      </Toolbar>
    </AppBar>
  );
}