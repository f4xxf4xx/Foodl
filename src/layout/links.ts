import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ListItemLink {
  path: string;
  name: string;
  icon: IconProp;
}

export const getLinks = (): ListItemLink[] => {
  return [
    {
      path: "/",
      name: "Home",
      icon: "home",
    },
    {
      path: "/recipes",
      name: "Recipes",
      icon: "book",
    },
    {
      path: "/cart",
      name: "Cart",
      icon: "shopping-cart",
    },
  ];
};

export const getAdminLinks = (): ListItemLink[] => {
  return [];
};
