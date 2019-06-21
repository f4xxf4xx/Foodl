import React from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: 'linear-gradient(45deg, #217fff 30%, #43adff 90%)'
    },
    link: {
      color: "white"
    }
  }),
);

export function TopBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Link to={"/"} className={classes.link}>
          <Typography variant="h6" noWrap>
            Foodl
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}