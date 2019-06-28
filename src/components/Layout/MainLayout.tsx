import React from "react";
import Sidebar from "./Sidebar";
import {
  CssBaseline
} from '@material-ui/core';
import { TopBar } from "./TopBar";

class MainLayout extends React.Component<any> {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <TopBar />
        <Sidebar />
        <main style={{ flexGrow: 1, padding: 5, marginTop: 70 }}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default MainLayout;
