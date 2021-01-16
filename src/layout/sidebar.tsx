import React from "react";
import { useLocation, Link } from "react-router-dom";
import { getLinks } from "layout/links";

import "layout/Styles/MainLayout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = props => {
  const location = useLocation();
  return (
    <aside className={props.className}>
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
    </aside>
  );
};
