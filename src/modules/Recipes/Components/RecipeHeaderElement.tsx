import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { Recipe } from "../models";
import { RecipeDbHelper } from "../../../repositories/RecipeDbHelper";
import ContentEditable from "react-contenteditable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { StyledSection } from "../../../layout/Styles/Sections";
import { StorageHelper } from "../../../services/StorageHelper";
import AvatarEditor from "react-avatar-editor";

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
  const updatingRecipe = useSelector(
    (state: ApplicationState) => state.recipe.updatingRecipe
  );
  const dispatch = useDispatch();

  const updateRecipe = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;

    /*updateRecipeStart();
    RecipeDbHelper.updateRecipe(recipe.id, key, value)
      .then(() => {
        updateRecipe({ ...recipe, [key]: value });
        updateRecipeStop();
        toast.success("Updated!");
      })
      .catch(() => {
        updateRecipeStop();
        toast.error("Error updating the recipe!");
      });
      */
  };

  const updateContentEditable = (key: string) => (
    e: React.FocusEvent<HTMLDivElement>
  ) => {
    const value = e.target.textContent;

    /* updateRecipeStart();
    RecipeDbHelper.updateRecipe(recipe.id, key, value)
      .then(() => {
        updateRecipe({ ...recipe, [key]: value });
        updateRecipeStop();
        toast.success("Updated!");
      })
      .catch(() => {
        updateRecipeStop();
        toast.error("Error updating the recipe!");
      }); */
  };

  const updateCuisine = (e: any) => {
    const value = e.value;

    /* updateRecipeStart();
    RecipeDbHelper.updateRecipe(recipe.id, "cuisine", value)
      .then(() => {
        updateRecipe({ ...recipe, cuisine: value });
        updateRecipeStop();
        toast.success("Updated!");
      })
      .catch(() => {
        updateRecipeStop();
        toast.error("Error updating the recipe!");
      }); */
  };

  const updateType = (e: any) => {
    const value = e.value;

    /* updateRecipeStart();
    RecipeDbHelper.updateRecipe(recipe.id, "type", value)
      .then(() => {
        updateRecipe({ ...recipe, type: value });
        updateRecipeStop();
        toast.success("Updated!");
      })
      .catch(() => {
        updateRecipeStop();
        toast.error("Error updating the recipe!");
      }); */
  };

  const addTag = (e: any) => {
    const value = e.value;

    /*  updateRecipeStart();
    RecipeDbHelper.addTag(recipe.id, value)
      .then((tags) => {
        updateRecipe({ ...recipe, tags });
        updateRecipeStop();
        toast.success("Added tag!");
      })
      .catch((error) => {
        console.log(error);
        updateRecipeStop();
        toast.error("Error adding the tag!");
      }); */
  };

  const deleteTag = (tag: string) => () => {
    /*  updateRecipeStart();
    RecipeDbHelper.deleteTag(recipe.id, tag)
      .then((tags) => {
        updateRecipe({ ...recipe, tags });
        updateRecipeStop();
        toast.success("Deleted tag!");
      })
      .catch((error) => {
        console.log(error);
        updateRecipeStop();
        toast.error("Error deleting the tag!");
      }); */
  };

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files[0];
    this.setState({
      image,
    });
  };

  const saveImage = () => {
    const { image } = this.state;

    /* StorageHelper.addFile(`recipes/${image.name}`, image).then((filePath) => {
      updateRecipeStart();
      RecipeDbHelper.updateRecipe(recipe.id, "image", image.name)
        .then(() => {
          updateRecipe({ ...recipe, image: image.name });
          updateRecipeStop();
          toast.success("Updated!");
        })
        .catch(() => {
          updateRecipeStop();
          toast.error("Error updating the recipe!");
        });
    }); */
  };

  const renderRecipeHeader = () => {
    return (
      <>
        {recipe.image && (
          <div>
            <img src={recipe.imageFullPath} alt={recipe.name} />
          </div>
        )}
        <div>
          <h3>{recipe.name}</h3>
          <div>
            <ButtonPrimary onClick={toggleEdit}>Edit</ButtonPrimary>
          </div>
        </div>
        <div>
          <p>{recipe.description}</p>
        </div>
        <div>
          {recipe.type && (
            <div>
              <p>{recipe.type}</p>
            </div>
          )}
          {recipe.duration && (
            <div>
              <p>
                <FontAwesomeIcon size="sm" icon={faClock} />
                {` ${recipe.duration} minutes`}
              </p>
            </div>
          )}
          {recipe.cuisine && (
            <div>
              <p>{recipe.cuisine}</p>
            </div>
          )}
          <div>
            {recipe.tags &&
              recipe.tags.map((tag, index) => <div key={index}>{tag}</div>)}
          </div>
        </div>
      </>
    );
  };

  const renderEditHeader = () => {
    return (
      <>
        {recipe.image && (
          <div>
            <img src={recipe.imageFullPath} alt={recipe.name} />
          </div>
        )}
        <StyledSection width="600">
          {/* <AvatarEditor width={400} height={250} image={image} /> */}
          <input id="input-image" type="file" onChange={this.updateImage} />
          <ButtonPrimary onClick={this.saveImage}>Save image</ButtonPrimary>
        </StyledSection>
        <div>
          <div>
            <ContentEditable
              className="Muip-root Muip-h3"
              html={recipe.name}
              disabled={updatingRecipe}
              onBlur={this.updateContentEditable("name")}
              tagName="h3"
              onChange={() => {}}
            />
          </div>
          <div>
            <ButtonPrimary onClick={toggleEdit}>Stop editing</ButtonPrimary>
          </div>
        </div>
        <div>
          <ContentEditable
            className="Muip-root Muip-body1"
            html={recipe.description || "Description"}
            disabled={updatingRecipe}
            onBlur={this.updateContentEditable("description")}
            tagName="p"
            onChange={() => {}}
          />
        </div>
        <div>
          {/* <div>
            <Select
              options={typeOptions}
              value={
                recipe.type && {
                  value: recipe.type,
                  label: recipe.type,
                }
              }
              onChange={this.updateType}
              isDisabled={updatingRecipe}
            />
          </div> */}
          <div>
            <input
              placeholder="Duration in minutes"
              defaultValue={recipe.duration}
              onChange={this.updateRecipe("duration")}
              disabled={updatingRecipe}
            />
          </div>
          {/* <div>
            <Select
              options={cuisineOptions}
              value={
                recipe.cuisine && {
                  value: recipe.cuisine,
                  label: recipe.cuisine,
                }
              }
              onChange={this.updateCuisine}
              isDisabled={updatingRecipe}
            />
          </div> */}
          <div>
            {recipe.tags &&
              recipe.tags.map((tag, index) => (
                <div key={index}>
                  <button onClick={this.deleteTag(tag)}>X</button>
                  {tag}
                </div>
              ))}
            {/* <Select
              options={tagOptionsWithoutCurrentTags}
              value={null}
              onChange={this.addTag}
            /> */}
          </div>
        </div>
      </>
    );
  };

  return recipe ? (
    editing ? (
      this.renderEditHeader()
    ) : (
      this.renderRecipeHeader()
    )
  ) : (
    <p>Loading...</p>
  );
};

export default RecipeHeaderElement;
