import React from "react";
import {
  Navbar, Container
} from "reactstrap";

type Props = {
  //title: string;
}

class TopNavbar extends React.Component<Props> {
  render() {
    //const { title } = this.props;
    return (
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          {/* <h1 className="h1 mb-0 text-white d-lg-inline-block">
            {title}
          </h1> */}
        </Container>
      </Navbar>
    );
  }
}

export default TopNavbar;
