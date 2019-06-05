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
        />
        <Statistic
          name={"New users"}
          value={"3500"}
          icon={"fa-users"}
        />
        <Statistic
          name={"Sales"}
          value={"350.920"}
          icon={"fa-chart-pie"}
        />
        <Statistic
          name={"Performance"}
          value={"100"}
          icon={"fa-percent"}
        />
      </>
    );
  }
}

export default HeaderStatistics;
