import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { ApplicationState } from "index";
import { Container } from "layout/container";
import { Recipe } from "modules/recipes/models";
import AddRecipeForm from "modules/recipes/components/add-recipe-form";
import {
  fetchRecipesAsync,
  deleteRecipeAsync,
} from "modules/recipes/store/recipes-actions";

type Props = RouteComponentProps;

const RecipesView = (props: Props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: ApplicationState) => state.recipes.isLoading
  );
  const profile = useSelector((state: ApplicationState) => state.user.profile);

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    dispatch(fetchRecipesAsync(profile.uid, null, setRecipes));
  }, [profile.uid, dispatch]);

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
          {isLoading ? (
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
    <Container>
      <h3>My recipes</h3>
      <AddRecipeForm />
      {renderRecipes()}
    </Container>
  );
};

export default withRouter(RecipesView);
