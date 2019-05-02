import React from "react";
import { Container } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <div className="header bg-gradient-info pb-7 pt-5 pt-md-7">
        <Container fluid>
          <div className="header-body" />
        </Container>
      </div>
    );
  }
}

export default Header;
