import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "index";
import IngredientsElement from "modules/Recipes/Components/IngredientsElement";
import RecipeHeaderElement from "modules/Recipes/Components/RecipeHeaderElement";
import StepsElement from "modules/Recipes/Components/StepsElement";
import { useParams } from "react-router-dom";
import { fetchRecipeBySlugAsync } from "store/recipes/recipeActions";

import "modules/Recipes/Components/RecipeView.css";

const RecipeView: React.FC = () => {
  const [editing, setEditing] = useState<boolean>();
  const loadingRecipe = useSelector(
    (state: ApplicationState) => state.recipe.loadingRecipe
  );
  const recipe = useSelector((state: ApplicationState) => state.recipe.recipe);
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    if (auth.uid) {
      const fetch = async () => {
        dispatch(fetchRecipeBySlugAsync(auth.uid, slug));
      };
      fetch();
    }
  }, [auth.uid, slug, dispatch]);

  return (
    <>
      {loadingRecipe ? (
        <p>Loading...</p>
      ) : (
        <>
          {recipe ? (
            <>
              <RecipeHeaderElement
                editing={editing}
                toggleEdit={() => setEditing(!editing)}
              />
              <IngredientsElement editing={editing} />
              <StepsElement editing={editing} recipe={recipe} />
              <p>{recipe.notes}</p>
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default RecipeView;
