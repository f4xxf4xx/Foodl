import React from "react";
import Footer from "../components/Layout/Footer";
import Sidebar from "../components/Layout/Sidebar";

class MainLayout extends React.Component<any> {
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
        />
        <div>
          {this.props.children}
          <Footer />
        </div>
      </>
    );
  }
}

export default MainLayout;
