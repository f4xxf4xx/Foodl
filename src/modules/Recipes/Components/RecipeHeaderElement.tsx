import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "index";
import ContentEditable from "react-contenteditable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { updateRecipeAsync } from "store/recipes/recipeActions";
import { Recipe } from "modules/Recipes/models";

interface Props {
  recipe: Recipe;
  editing: boolean;
  toggleEdit: () => void;
}

const RecipeHeaderElement: React.FC<Props> = ({
  recipe,
  editing,
  toggleEdit,
}) => {
  const dispatch = useDispatch();
  const isUpdatingRecipe = useSelector(
    (state: ApplicationState) => state.recipe.isUpdating
  );

  const updateRecipe = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;

    dispatch(updateRecipeAsync(recipe, key, value));
  };

  const updateContentEditable = (key: string) => (
    e: React.FocusEvent<HTMLDivElement>
  ) => {
    const value = e.target.textContent;
    if (recipe[key] !== value) {
      dispatch(updateRecipeAsync(recipe, key, value));
    }
  };

  const renderRecipeHeader = () => {
    return (
      <>
        <div>
          <button onClick={toggleEdit}>Edit</button>
        </div>
        {recipe.image && (
          <img
            className="recipe-image"
            src={recipe.imageFullPath}
            alt={recipe.name}
          />
        )}
        <div>
          <h1>{recipe.name}</h1>
        </div>
        <div>
          <p>{recipe.description}</p>
          {recipe.type && <p>{recipe.type}</p>}
          {recipe.duration && (
            <p>
              <FontAwesomeIcon size="sm" icon={faClock} />
              {` ${recipe.duration} minutes`}
            </p>
          )}
          {recipe.cuisine && <p>{recipe.cuisine}</p>}
          <div className="recipe-tags">
            {recipe.tags &&
              recipe.tags.map((tag, index) => (
                <div className="recipe-tag" key={index}>
                  <p>{tag}</p>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  };

  const renderEditHeader = () => {
    return (
      <>
        <div>
          <button onClick={toggleEdit}>Stop editing</button>
        </div>
        {recipe.image && (
          <img
            className="recipe-image"
            src={recipe.imageFullPath}
            alt={recipe.name}
          />
        )}
        <div>
          <ContentEditable
            className="Muip-root Muip-h1"
            html={recipe.name}
            onBlur={updateContentEditable("name")}
            tagName="h1"
            onChange={() => {}}
          />
        </div>
        <div>
          <ContentEditable
            className="Muip-root Muip-body1"
            html={recipe.description || "Description"}
            onBlur={updateContentEditable("description")}
            tagName="p"
            onChange={() => {}}
          />
        </div>
        <div>
          <input
            placeholder="Duration in minutes"
            defaultValue={recipe.duration}
            onBlur={updateRecipe("duration")}
            disabled={isUpdatingRecipe}
          />
        </div>
      </>
    );
  };

  return recipe ? (
    editing ? (
      renderEditHeader()
    ) : (
      renderRecipeHeader()
    )
  ) : (
    <p>Loading...</p>
  );
};

export default RecipeHeaderElement;
