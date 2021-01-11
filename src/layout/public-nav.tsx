import React from "react";
import { AnimateSharedLayout } from "framer-motion";
import { NavLink } from "layout/nav-link";

export const PublicNav: React.FC = props => {
  return (
    <nav>
      <AnimateSharedLayout>
        <NavLink to="/" layoutId="nav-link">Overview</NavLink>
        <NavLink to="/features" layoutId="nav-link">Features</NavLink>
        <NavLink to="/pricing" layoutId="nav-link">Pricing</NavLink>
      </AnimateSharedLayout>
    </nav>
  );
};
