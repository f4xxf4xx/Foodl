import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/Navbars/AdminNavbar";
import AdminFooter from "../components/Footers/AdminFooter";
import Sidebar from "../components/Sidebar/Sidebar";

import routes from "../routes";
import { RecipeView } from "../components/Recipes/RecipeView";
import { RecipesView } from "../components/Recipes/RecipesView";
import Index from "../views/Index";

class Admin extends React.Component<any> {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={"hehe"}
          />
          <Switch>
            <Route
              path={"/index"}
              component={Index}
            />
            <Route
              path={"/recipes"}
              component={RecipesView}
            />
            <Route
              path={"/recipe/:id"}
              component={RecipeView}
            />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
