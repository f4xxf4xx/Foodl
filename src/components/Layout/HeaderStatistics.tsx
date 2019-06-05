import React from "react";
import Statistic from "./Statistic";

class HeaderStatistics extends React.Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}

export default HeaderStatistics;
