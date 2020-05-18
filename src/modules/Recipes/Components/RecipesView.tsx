import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { ApplicationState } from "../../..";
import * as recipesActions from "../../../store/recipes/recipesActions";
import { Recipe } from "../models";
import AddRecipeForm from "./AddRecipeForm";
import { getTagIcon } from "../helper";
import { Filters } from "../../../store/recipes/recipesReducer";

import "./RecipesView.css";
import {
  fetchRecipesAsync,
  deleteRecipeAsync,
} from "../../../store/recipes/recipesActions";

type Props = RouteComponentProps;

const RecipesView = (props: Props) => {
  const dispatch = useDispatch();
  const recipes = useSelector(
    (state: ApplicationState) => state.recipes.recipes
  );
  const loading = useSelector(
    (state: ApplicationState) => state.recipes.loading
  );
  const filters = useSelector(
    (state: ApplicationState) => state.recipes.filters
  );
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);

  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchRecipesAsync(auth.uid, null));
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.uid, dispatch]);

  const deleteRecipe = (recipeId: string) => async () => {
    dispatch(deleteRecipeAsync(recipeId));
  };

  const goToRecipePage = (slug: string) => () => {
    props.history.push(`/recipe/${slug}`);
  };

  const renderTags = (recipe: Recipe) => {
    return recipe.tags
      ? recipe.tags.map((tag, index) => (
          <p className="recipe-card-tag" key={index}>
            {tag}
          </p>
        ))
      : null;
  };

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
        <div className="recipes">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            recipes.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <img
                  src={recipe.imageFullPath}
                  alt={recipe.name}
                  title={recipe.name}
                  onClick={goToRecipePage(recipe.slug)}
                />
                <div>
                  <p>{recipe.name}</p>
                  <p>{recipe.description}</p>
                  <div>{renderTags(recipe)}</div>
                </div>
                <button onClick={deleteRecipe(recipe.id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <h3>My recipes</h3>
      <AddRecipeForm />
      {renderRecipes()}
    </>
  );
};

export default withRouter(RecipesView);
