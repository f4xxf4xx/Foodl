import React from "react";
import { Link } from "react-router-dom";
import { ListItemLink } from "./links";

interface Props {
  key: number;
  currentPath: string;
  link: ListItemLink;
}

const SidebarLink: React.FC<Props> = (props: Props) => {
  const active = props.currentPath === props.link.path;

  return (
    <Link key={props.key} to={props.link.path}>
      {active && "*"}
      <span>{props.link.icon}</span>
      {props.link.name}
    </Link>
  );
};

export default SidebarLink;
