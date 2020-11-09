import React from "react";
import { useLocation, Link } from "react-router-dom";
import { getLinks } from "layout/links";

import "layout/Styles/MainLayout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {getLinks().map((link, index) => {
          const active = location.pathname === link.path;
          return (
            <li
              key={index}
              className={`sidebar-item${active ? "-active" : ""}`}
            >
              <Link to={link.path}>
                <span>
                  <FontAwesomeIcon icon={link.icon} />
                </span>
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      {/* <span className="divider" />
      <ul className="sidebar-list">
        {getAdminLinks().map((link, index) => (
          <li className="sidebar-item">
            <SidebarLink
              key={index}
              currentPath={location.pathname}
              link={link}
            />
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Sidebar;
