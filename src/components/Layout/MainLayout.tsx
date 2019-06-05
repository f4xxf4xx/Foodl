import React from "react";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

class MainLayout extends React.Component<any> {
  render() {
    return (
      <div>
        <Sidebar
          {...this.props}
        />
        <div>
          {this.props.children}
          <Footer />
        </div>
      </div>
    );
  }
}

export default MainLayout;
