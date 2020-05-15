import React from "react";
import { useLocation } from "react-router-dom";
import { getAdminLinks, getLinks } from "./links";
import SidebarLink from "./SidebarLink";

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <div>
      <ul>
        {getLinks().map((link, index) => (
          <SidebarLink
            key={index}
            currentPath={location.pathname}
            link={link}
          />
        ))}
      </ul>
      <span className="divider" />
      <ul>
        {/* TODO if admin */}
        {getAdminLinks().map((link, index) => (
          <SidebarLink
            key={index}
            currentPath={location.pathname}
            link={link}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
