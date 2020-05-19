import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../..";
import ContentEditable from "react-contenteditable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import {
  updateRecipeAsync,
  addTagAsync,
  deleteTagAsync,
} from "../../../store/recipes/recipeActions";

interface Props {
  editing: boolean;
  toggleEdit: () => void;
}

const RecipeHeaderElement: React.FC<Props> = ({ editing, toggleEdit }) => {
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);
  const recipe = useSelector((state: ApplicationState) => state.recipe.recipe);
  const [newImage, setNewImage] = useState<File>(null);
  const [newTag, setNewTag] = useState<string>("");
  const imageEditorRef = useRef<any>();
  const dispatch = useDispatch();
  const updatingRecipe = useSelector(
    (state: ApplicationState) => state.recipe.updatingRecipe
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

  const handleChangeTag = (e) => {
    setNewTag(e.currentTarget.value);
  };

  const addTag = () => {
    dispatch(addTagAsync(recipe, newTag));
    setNewTag("");
  };

  const deleteTag = (tag: string) => () => {
    dispatch(deleteTagAsync(recipe, tag));
  };

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files[0];
    setNewImage(image);
  };

  const saveImage = () => {
    //const canvas = imageEditorRef.getImage();
    // dispatch(updateImageAsync(recipe, canvas));
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
          <input id="input-image" type="file" onChange={updateImage} />
          <button onClick={saveImage}>Save image</button>
        </div>
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
            disabled={updatingRecipe}
          />
          <div>
            {recipe.tags &&
              recipe.tags.map((tag, index) => (
                <div key={index}>
                  <button onClick={deleteTag(tag)}>X</button>
                  {tag}
                </div>
              ))}
            <input value={newTag} onChange={handleChangeTag} />
            <button onClick={addTag}>Add</button>
          </div>
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
