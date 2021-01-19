import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "index";
import IngredientsElement from "modules/Recipes/Components/IngredientsElement";
import RecipeHeaderElement from "modules/Recipes/Components/RecipeHeaderElement";
import { Recipe } from "modules/Recipes/models";
import { useParams } from "react-router-dom";
import { fetchRecipeBySlugAsync } from "store/recipes/recipeActions";

import "modules/Recipes/Components/RecipeView.css";

const RecipeView: React.FC = () => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState<boolean>();
  const [recipe, setRecipe] = useState<Recipe>();
  const isLoading = useSelector(
    (state: ApplicationState) => state.recipe.isLoading
  );
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);
  const { slug } = useParams();

  useEffect(() => {
    if (auth.uid) {
      dispatch(fetchRecipeBySlugAsync(auth.uid, slug, setRecipe));
    }
  }, [auth.uid, slug, dispatch]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {recipe ? (
            <>
              <RecipeHeaderElement
                recipe={recipe}
                editing={editing}
                toggleEdit={() => setEditing(!editing)}
              />
              <IngredientsElement recipe={recipe} isEditing={editing} />
              <p>{recipe.notes}</p>
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default RecipeView;
