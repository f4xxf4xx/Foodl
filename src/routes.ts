import Index from "./components/Views/Index";
import Profile from "./components/Views/Profile";
import Maps from "./components/Views/Maps";
import Register from "./components/Views/Register";
import Login from "./components/Views/Login";
import Tables from "./components/Views/Tables";
import Icons from "./components/Views/Icons";
import { RecipesView } from "./components/Recipes/RecipesView";

var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "fas fa-home text-primary",
    component: Index,
    layout: ""
  },
  {
    path: "/recipes",
    name: "Recipes",
    icon: "fas fa-book text-orange",
    component: RecipesView,
    layout: ""
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: ""
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: ""
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: ""
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: ""
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: ""
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: ""
  }
];
export default routes;
