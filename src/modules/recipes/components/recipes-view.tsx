import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ApplicationState } from "index";
import { Container } from "layout/container";
import { Recipe } from "modules/recipes/models";
import AddRecipeForm from "modules/recipes/components/add-recipe-form";
import {
  fetchRecipesAsync,
} from "modules/recipes/store/recipes-actions";
import { auth } from "firebase-config";
import { Cookbook } from "modules/cookbooks/models";
import { fetchCookbookAsync } from "modules/cookbooks/store/cookbooks-actions";
import RecipeCard from "./recipe-card";
import styled from "styled-components";
import { Theme } from "theme";

const StyledRecipes = styled.div<{ theme: Theme }>`
  display: flex;
`;

const RecipesView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cookbookId } = useParams();
  const isLoading = useSelector(
    (state: ApplicationState) => state.recipes.isLoading
  );

  const uid = auth.currentUser.uid;
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cookbook, setCookbook] = useState<Cookbook>();

  useEffect(() => {
    dispatch(fetchRecipesAsync(uid, cookbookId, null, setRecipes));
  }, [uid, cookbookId, dispatch]);

  useEffect(() => {
    if (cookbookId) {
      dispatch(fetchCookbookAsync(uid, cookbookId, setCookbook));
    } else {
      setCookbook(null)
    }
  }, [uid, cookbookId, dispatch]);

  const renderFilters = () => {
    /*
    const cuisineOptions = Object.keys(Cuisine).map((cuisine) => {
      return {
        value: Cuisine[cuisine],
        label: Cuisine[cuisine],
      };
    });
    cuisineOptions.unshift({ label: "No filters", value: null });

    const typeOptions = Object.keys(RecipeType).map((type) => {
      return {
        value: RecipeType[type],
        label: RecipeType[type],
      };
    });
    typeOptions.unshift({ label: "No filters", value: null });

    return (
      <>
        <Select
          options={cuisineOptions}
          value={
            filters &&
            filters.cuisine && {
              value: filters.cuisine,
              label: filters.cuisine,
            }
          }
          onChange={filterByAttribute("cuisine")}
          isDisabled={loading}
        />
        <Select
          options={typeOptions}
          value={
            filters &&
            filters.type && {
              value: filters.type,
              label: filters.type,
            }
          }
          onChange={filterByAttribute("type")}
          isDisabled={loading}
        />
      </>
    );
    */
    return <></>;
  };

  const renderRecipes = () => {
    return (
      <>
        <div>{renderFilters()}</div>
        <StyledRecipes>
          {isLoading ? <h1>Loading...</h1> : recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </StyledRecipes>
      </>
    );
  };

  return (
    <Container>
      <h5><button onClick={() => history.push(`/app/cookbooks`)}>&lt;My cookbooks</button></h5>
      <h3>{cookbook?.name}</h3>
      <AddRecipeForm cookbookId={cookbookId} />
      {renderRecipes()}
    </Container>
  );
};

export default RecipesView;
