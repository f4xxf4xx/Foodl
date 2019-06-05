import React from "react";
import { NavLink } from "react-router-dom";
import { getLinks } from "../../layouts/links";

type Props = {
  location?: any;
};

class Sidebar extends React.Component<Props> {
  createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
          <NavLink
            to={prop.path}
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
      );
    });
  };

  render() {
    return (
        this.createLinks(getLinks())
    );
  }
}

export default Sidebar;