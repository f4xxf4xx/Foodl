import React from "react";
import { Container, Row } from "reactstrap";
import Statistic from "./Statistic";

class HeaderStatistics extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              <Row>
                <Statistic
                  name={"Traffic"}
                  value={"350.20"}
                  icon={"fa-chart-bar"}
                  bgColor="bg-warning"
                  col="3"
                />
                <Statistic
                  name={"New users"}
                  value={"3500"}
                  icon={"fa-users"}
                  bgColor="bg-danger"
                  col="3"
                />
                <Statistic 
                  name={"Sales"}
                  value={"350.920"}
                  icon={"fa-chart-pie"}
                  bgColor="bg-yellow"                  
                  col="3"
                />
                <Statistic
                  name={"Performance"}
                  value={"100"}
                  icon={"fa-percent"}
                  bgColor="bg-purple"
                  col="3"
                />
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default HeaderStatistics;
