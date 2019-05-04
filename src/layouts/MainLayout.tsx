import React from "react";
import { Container } from "reactstrap";
import AdminFooter from "../components/Layout/AdminFooter";
import Sidebar from "../components/Layout/Sidebar";

class MainLayout extends React.Component<any> {
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
        />
        <div className="main-content" ref="mainContent">          
          {this.props.children}
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default MainLayout;
