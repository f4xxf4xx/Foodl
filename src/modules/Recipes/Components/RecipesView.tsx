import {
  CardActionArea,
  CardActions,
  Divider,
  Grid,
  IconButton,
  p,
  Box,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { Placeholder } from "semantic-ui-react";
import { ApplicationState } from "../../..";
import * as recipesActions from "../../../store/recipes/recipesActions";
import { Recipe } from "../models";
import AddRecipeForm from "./AddRecipeForm";
import { StyledCard } from "./Styles/StyledCard";
import { StyledCardContent } from "./Styles/StyledCardContent";
import { StyledCardMedia } from "./Styles/StyledCardMedia";
import { getTagIcon } from "../helper";
import { StyledFontAwesomeIcon } from "./Styles/StyledFontAwesomeIcon";
import { Filters } from "../../../store/recipes/recipesReducer";
import Select from "react-select";
import { Cuisine, RecipeType } from "../constants";
import * as recipeService from "../../../services/recipeService";

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
      dispatch(recipeService.fetchAsync(auth.uid, null));
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.uid]);

  const deleteRecipe = (recipeId: string) => async () => {
    dispatch(recipeService.deleteAsync(recipeId));
  };

  const goToRecipePage = (slug: string) => () => {
    props.history.push(`/recipe/${slug}`);
  };

  const renderTags = (recipe: Recipe) => {
    return recipe.tags
      ? recipe.tags.map((tag, index) => (
          <StyledFontAwesomeIcon key={index} size="lg" icon={getTagIcon(tag)} />
        ))
      : null;
  };

  const filterByAttribute = (attribute: string) => (e: any) => {
    const value = e.value;
    let newFilters: Filters = null;

    if (filters) {
      newFilters = { ...filters, [attribute]: value };
      dispatch(recipesActions.updateFilters(newFilters));
    } else {
      newFilters = { [attribute]: value };
      dispatch(recipesActions.updateFilters(newFilters));
    }

    dispatch(recipeService.fetchAsync(auth.uid, newFilters));
  };

  const renderFilters = () => {
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
  };

  const renderLoadingRecipes = () => {
    const cards = [];
    for (let i = 0; i < 6; i++) {
      const element = (
        <Grid key={i} item={true} xs={12} sm={6} md={4} lg={3}>
          <StyledCard>
            <Placeholder>
              <Placeholder.Image square />
            </Placeholder>
            <StyledCardContent>
              <Placeholder>
                <Placeholder.Header>
                  <p variant={"h6"} gutterBottom={true}>
                    <Placeholder.Line length="short" />
                  </p>
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <p variant={"caption"}>
                    <Placeholder.Line length="medium" />
                  </p>
                </Placeholder.Paragraph>
              </Placeholder>
            </StyledCardContent>
            <Divider className={"MuiDivider-root"} light={true} />
            <CardActions disableSpacing={true}>
              <IconButton aria-label="Share recipe" disabled={true}>
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="Delete recipe" disabled={true}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </StyledCard>
        </Grid>
      );
      cards.push(element);
    }
    return cards;
  };

  const renderRecipes = () => {
    return (
      <>
        <Box>{renderFilters()}</Box>
        <Grid container={true} spacing={2}>
          {loading
            ? renderLoadingRecipes()
            : recipes.map((recipe) => (
                <Grid key={recipe.id} item={true} xs={12} sm={6} md={4} lg={3}>
                  <StyledCard>
                    <CardActionArea onClick={goToRecipePage(recipe.slug)}>
                      <StyledCardMedia
                        image={recipe.imageFullPath}
                        title={recipe.name}
                      />
                      <StyledCardContent>
                        <p variant={"h6"} gutterBottom={true}>
                          {recipe.name}
                        </p>
                        <p variant={"caption"}>{recipe.description}</p>
                        <Box>{renderTags(recipe)}</Box>
                      </StyledCardContent>
                      <Divider className={"MuiDivider-root"} light={true} />
                    </CardActionArea>
                    <CardActions disableSpacing={true}>
                      <IconButton aria-label="Share recipe">
                        <ShareIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Delete recipe"
                        onClick={deleteRecipe(recipe.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </StyledCard>
                </Grid>
              ))}
        </Grid>
      </>
    );
  };

  return (
    <>
      <h3>My recipes</h3>
      <p paragraph={true}>Here you can manage your own recipes</p>
      <AddRecipeForm />
      {renderRecipes()}
    </>
  );
};

export default withRouter(RecipesView);
