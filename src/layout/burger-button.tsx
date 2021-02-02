import React from "react";
import { motion } from "framer-motion";
import { Button } from "components/button";

const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

interface Props {
  isOpen: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const BurgerButton: React.FC<Props> = props => (
  <Button
    type="button"
    mode="normal"
    onClick={props.onClick}
    className={props.className}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24"
      viewBox="0 0 24 24"
    >
      <Path
        variants={{
          drawerClosed: { d: "M 3 3 L 21 3" },
          drawerOpened: { d: "M 12 3 L 12 21" }
        }}
      />
      <Path
        d="M 3 12 L 21 12"
        variants={{
          drawerClosed: { opacity: 1 },
          drawerOpened: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          drawerClosed: { d: "M 3 21 L 21 21" },
          drawerOpened: { d: "M 3 3 L 3 21" }
        }}
      />
    </svg>
  </Button>
);
