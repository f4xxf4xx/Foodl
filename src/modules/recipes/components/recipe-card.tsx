import React, { } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Recipe } from "modules/recipes/models";
import {
  deleteRecipeAsync,
} from "modules/recipes/store/recipes-actions";
import styled from "styled-components";
import { Theme } from "theme";

const StyledRecipeCard = styled.div<{ theme: Theme }>`
  padding: 0 0 0 ${({ theme }) => theme.space.large}px;
  flex: 0 0 auto;
  border: 1px black solid;
  border-radius: 4px;
  width: 200px;
  flex: 1;
`;

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteRecipe = (recipeId: string) => async () => {
    dispatch(deleteRecipeAsync(recipeId));
  };

  return (
    <StyledRecipeCard key={recipe.id}>
      <img
        src="https://via.placeholder.com/150"
        // src={recipe.imageFullPath}
        alt={recipe.name}
        title={recipe.name}
        onClick={() => history.push(`/app/recipe/${recipe.slug}`)}
      />
      <div>
        <p>{recipe.name}</p>
        <p>{recipe.description}</p>
      </div>
      <button onClick={deleteRecipe(recipe.id)}>Delete</button>
    </StyledRecipeCard>
  );
};

export default RecipeCard;
