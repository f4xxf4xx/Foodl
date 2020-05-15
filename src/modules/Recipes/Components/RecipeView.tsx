import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../..";
import { Recipe } from "../models";
import IngredientsElement from "./IngredientsElement";
import RecipeHeaderElement from "./RecipeHeaderElement";
import StepsElement from "./StepsElement";
import * as RecipeService from "../../../services/RecipeService";

const RecipeView: React.FC = () => {
  const [editing] = useState<boolean>();
  const loadingRecipe = useSelector(
    (state: ApplicationState) => state.recipe.loadingRecipe
  );
  const [recipe] = useState<Recipe>();
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);

  useEffect(() => {
    RecipeService.fetchRecipeBySlugAsync(auth.uid, "skritz");
  }, []);

  return (
    <>
      {loadingRecipe ? (
        <p>Loading...</p>
      ) : (
        <>
          {recipe ? (
            <>
              <RecipeHeaderElement
                recipe={recipe}
                editing={editing}
                toggleEdit={this.toggleEdit}
              />
              <div>
                <div>
                  <div>
                    <IngredientsElement editing={editing} recipe={recipe} />
                  </div>
                  <div>
                    <StepsElement editing={editing} recipe={recipe} />
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default RecipeView;
