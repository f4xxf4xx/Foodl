import React from "react";
import { Button } from "components/button";

interface Props {
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
      <path fill="currentColor" d="M20.749 20.999h-17.5a1.253 1.253 0 01-.912-.325A1.209 1.209 0 012 19.763a1.115 1.115 0 01.337-.8 1.226 1.226 0 01.912-.34h17.5a1.255 1.255 0 01.914.324 1.206 1.206 0 01.336.912 1.111 1.111 0 01-.336.8 1.231 1.231 0 01-.853.341zm-18.41-8.133a1.212 1.212 0 01-.337-.912 1.11 1.11 0 01.337-.8 1.219 1.219 0 01.912-.34h17.5a1.255 1.255 0 01.914.324 1.205 1.205 0 01.336.912 1.107 1.107 0 01-.336.8 1.233 1.233 0 01-.914.341H3.192a1.262 1.262 0 01-.854-.325zm0-7.808a1.212 1.212 0 01-.337-.912 1.11 1.11 0 01.337-.8 1.219 1.219 0 01.912-.34h17.5a1.255 1.255 0 01.914.324 1.205 1.205 0 01.336.912 1.109 1.109 0 01-.336.8 1.229 1.229 0 01-.914.34H3.188a1.257 1.257 0 01-.85-.325z"></path>
    </svg>
  </Button>
);
