import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "index";
import { Container } from "layout/container";
import IngredientsElement from "modules/recipes/components/ingredients-element";
import RecipeHeaderElement from "modules/recipes/components/recipe-header-element";
import { Recipe } from "modules/recipes/models";
import { useParams } from "react-router-dom";
import { fetchRecipeBySlugAsync } from "modules/recipes/store/recipe-actions";

const RecipeView: React.FC = () => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState<boolean>();
  const [recipe, setRecipe] = useState<Recipe>();
  const isLoading = useSelector(
    (state: ApplicationState) => state.recipe.isLoading
  );
  const profile = useSelector((state: ApplicationState) => state.user.profile);
  const { slug } = useParams();

  useEffect(() => {
    if (profile.uid) {
      dispatch(fetchRecipeBySlugAsync(profile.uid, slug, setRecipe));
    }
  }, [profile.uid, slug, dispatch]);

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
