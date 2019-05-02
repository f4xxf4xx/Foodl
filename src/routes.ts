import Index from "./views/Index";
import Profile from "./views/examples/Profile";
import Maps from "./views/examples/Maps";
import Register from "./views/examples/Register";
import Login from "./views/examples/Login";
import Tables from "./views/examples/Tables";
import Icons from "./views/examples/Icons";
import { RecipesView } from "./components/Recipes/RecipesView";
import { RecipeView } from "./components/Recipes/RecipeView";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: ""
  },
  {
    path: "/recipes",
    name: "Recipes",
    icon: "ni ni-tv-2 text-primary",
    component: RecipesView,
    layout: ""
  },
  {
    path: "/recipe/:id",
    name: "Recipe",
    icon: "ni ni-tv-2 text-primary",
    component: RecipeView,
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
