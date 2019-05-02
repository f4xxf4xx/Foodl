import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import AdminFooter from "../components/Layout/AdminFooter";
import Sidebar from "../components/Layout/Sidebar";

import routes from "../routes";
import { RecipeView } from "../components/Recipes/RecipeView";
import { RecipesView } from "../components/Recipes/RecipesView";
import Index from "../components/Views/Index";
import Icons from "../components/Views/Icons";

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
              path={"/icons"}
              component={Icons}
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
