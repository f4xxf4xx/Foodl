import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "index";
import { Container } from "layout/container";
import IngredientsElement from "modules/recipes/components/ingredients-element";
import RecipeHeaderElement from "modules/recipes/components/recipe-header-element";
import { Recipe } from "modules/recipes/models";
import { useParams } from "react-router-dom";
import { fetchRecipeBySlugAsync } from "store/recipes/recipe-actions";

import "modules/recipes/components/recipe-view.css";

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
    <Container>
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
    </Container>
  );
};

export default RecipeView;
