import React from "react";
import { Container } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <div className="header bg-gradient-info pb-6 pt-6 pt-md-6">
        <Container fluid>
          <div className="header-body" />
        </Container>
      </div>
    );
  }
}

export default Header;
