import React from "react";
import { connect, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { bindActionCreators, compose, Dispatch } from "redux";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import * as recipeActions from "../../../store/recipes/recipeActions";
import { Recipe } from "../models";
import { RecipeDbHelper } from "../../../repositories/RecipeDbHelper";
import { StyledChip } from "./Styles/StyledChip";
import ContentEditable from "react-contenteditable";
import { StyledRecipeInfo } from "./Styles/StyledRecipeInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { StyledCardMedia } from "./Styles/StyledCardMedia";
import { StyledSection } from "../../../layout/Styles/Sections";
import { StorageHelper } from "../../../services/StorageHelper";
import AvatarEditor from "react-avatar-editor";

interface OwnProps {
  recipe: Recipe;
  editing: boolean;
  toggleEdit: () => void;
}

const RecipeHeaderElement: React.FC<OwnProps> = ({
  recipe,
  editing,
  toggleEdit,
}) => {
  const updatingRecipe = useSelector(
    (state: ApplicationState) => state.recipe.updatingRecipe
  );
  const updateRecipe = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { recipe } = this.props;
    const value = e.currentTarget.value;

    this.props.updateRecipeStart();
    RecipeDbHelper.updateRecipe(recipe.id, key, value)
      .then(() => {
        this.props.updateRecipe({ ...recipe, [key]: value });
        this.props.updateRecipeStop();
        toast.success("Updated!");
      })
      .catch(() => {
        this.props.updateRecipeStop();
        toast.error("Error updating the recipe!");
      });
  };

  const updateContentEditable = (key: string) => (
    e: React.FocusEvent<HTMLDivElement>
  ) => {
    const { recipe } = this.props;
    const value = e.target.textContent;

    this.props.updateRecipeStart();
    RecipeDbHelper.updateRecipe(recipe.id, key, value)
      .then(() => {
        this.props.updateRecipe({ ...recipe, [key]: value });
        this.props.updateRecipeStop();
        toast.success("Updated!");
      })
      .catch(() => {
        this.props.updateRecipeStop();
        toast.error("Error updating the recipe!");
      });
  };

  const updateCuisine = (e: any) => {
    const { recipe } = this.props;
    const value = e.value;

    this.props.updateRecipeStart();
    RecipeDbHelper.updateRecipe(recipe.id, "cuisine", value)
      .then(() => {
        this.props.updateRecipe({ ...recipe, cuisine: value });
        this.props.updateRecipeStop();
        toast.success("Updated!");
      })
      .catch(() => {
        this.props.updateRecipeStop();
        toast.error("Error updating the recipe!");
      });
  };

  const updateType = (e: any) => {
    const { recipe } = this.props;
    const value = e.value;

    this.props.updateRecipeStart();
    RecipeDbHelper.updateRecipe(recipe.id, "type", value)
      .then(() => {
        this.props.updateRecipe({ ...recipe, type: value });
        this.props.updateRecipeStop();
        toast.success("Updated!");
      })
      .catch(() => {
        this.props.updateRecipeStop();
        toast.error("Error updating the recipe!");
      });
  };

  const addTag = (e: any) => {
    const { recipe } = this.props;
    const value = e.value;

    this.props.updateRecipeStart();
    RecipeDbHelper.addTag(recipe.id, value)
      .then((tags) => {
        this.props.updateRecipe({ ...recipe, tags });
        this.props.updateRecipeStop();
        toast.success("Added tag!");
      })
      .catch((error) => {
        console.log(error);
        this.props.updateRecipeStop();
        toast.error("Error adding the tag!");
      });
  };

  const deleteTag = (tag: string) => () => {
    const { recipe } = this.props;

    this.props.updateRecipeStart();
    RecipeDbHelper.deleteTag(recipe.id, tag)
      .then((tags) => {
        this.props.updateRecipe({ ...recipe, tags });
        this.props.updateRecipeStop();
        toast.success("Deleted tag!");
      })
      .catch((error) => {
        console.log(error);
        this.props.updateRecipeStop();
        toast.error("Error deleting the tag!");
      });
  };

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files[0];
    this.setState({
      image,
    });
  };

  const saveImage = () => {
    const { recipe } = this.props;
    const { image } = this.state;

    StorageHelper.addFile(`recipes/${image.name}`, image).then((filePath) => {
      this.props.updateRecipeStart();
      RecipeDbHelper.updateRecipe(recipe.id, "image", image.name)
        .then(() => {
          this.props.updateRecipe({ ...recipe, image: image.name });
          this.props.updateRecipeStop();
          toast.success("Updated!");
        })
        .catch(() => {
          this.props.updateRecipeStop();
          toast.error("Error updating the recipe!");
        });
    });
  };

  const renderRecipeHeader = () => {
    const { recipe, toggleEdit } = this.props;

    return (
      <>
        {recipe.image && (
          <div>
            <StyledCardMedia image={recipe.imageFullPath} title="TODO" />
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
            <StyledRecipeInfo>
              <p>{recipe.type}</p>
            </StyledRecipeInfo>
          )}
          {recipe.duration && (
            <StyledRecipeInfo>
              <p>
                <FontAwesomeIcon size="sm" icon={faClock} />
                {` ${recipe.duration} minutes`}
              </p>
            </StyledRecipeInfo>
          )}
          {recipe.cuisine && (
            <StyledRecipeInfo>
              <p>{recipe.cuisine}</p>
            </StyledRecipeInfo>
          )}
          <div>
            {recipe.tags &&
              recipe.tags.map((tag, index) => (
                <StyledChip
                  key={index}
                  size="small"
                  label={tag}
                  color="secondary"
                />
              ))}
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
            <StyledCardMedia image={recipe.imageFullPath} title={recipe.name} />
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
          <StyledRecipeInfo>
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
          </StyledRecipeInfo>
          <StyledRecipeInfo>
            <input
              placeholder="Duration in minutes"
              defaultValue={recipe.duration}
              onChange={this.updateRecipe("duration")}
              disabled={updatingRecipe}
            />
          </StyledRecipeInfo>
          <StyledRecipeInfo>
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
          </StyledRecipeInfo>
          <div>
            {recipe.tags &&
              recipe.tags.map((tag, index) => (
                <StyledChip
                  key={index}
                  size="small"
                  label={tag}
                  color="secondary"
                  onDelete={this.deleteTag(tag)}
                />
              ))}
            <Select
              options={tagOptionsWithoutCurrentTags}
              value={null}
              onChange={this.addTag}
            />
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
