import { Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Divider, Grid, IconButton, Typography, Icon, Box, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { bindActionCreators, compose, Dispatch } from "redux";
import { Loader } from "semantic-ui-react";
import { ApplicationState } from "../../..";
import { Title } from "../../../layout/Styles/Sections";
import * as recipesActions from "../../../store/recipes/recipesActions";
import { Recipe } from "../models";
import AddRecipeForm from "./AddRecipeForm";
import { StyledCard } from "./Styles/StyledCard";
import { StyledCardContent } from "./Styles/StyledCardContent";
import { StyledCardMedia } from "./Styles/StyledCardMedia";
import { RecipeService } from "../../../services/RecipeService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { getTagIcon } from "../helper";
import { StyledFontAwesomeIcon } from "./Styles/StyledFontAwesomeIcon";

interface State {
    newRecipeName: string;
}

interface StateProps {
    recipes: Recipe[];
    loading: boolean;
    updating: boolean;
    error: string;
    auth: any;
}

interface DispatchProps {
    fetchRecipesStart: typeof recipesActions.fetchRecipesStart;
    fetchRecipesStop: typeof recipesActions.fetchRecipesStop;
    updateRecipesStart: typeof recipesActions.updateRecipesStart;
    updateRecipesStop: typeof recipesActions.updateRecipesStop;
    updateRecipes: typeof recipesActions.updateRecipes;
    addRecipe: typeof recipesActions.addRecipe;
    deleteRecipe: typeof recipesActions.deleteRecipe;
}

type Props = StateProps & RouteComponentProps & DispatchProps;

class RecipesViewBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newRecipeName: "",
        };
    }

    public componentDidMount() {
        const { auth } = this.props;

        this.props.fetchRecipesStart();
        RecipeService.getRecipes(auth.uid)
            .then((recipes) => {
                this.props.updateRecipes(recipes);
                this.props.fetchRecipesStop();
            })
            .catch(() => {
                this.props.fetchRecipesStop();
                toast.error("Error fetching the recipes");
            });
    }

    public deleteRecipe = (recipeId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.updateRecipesStart();
        RecipeService.deleteRecipe(recipeId)
            .then(() => {
                this.props.deleteRecipe(recipeId);
                this.props.updateRecipesStop();
                toast.success("Deleted!");
            })
            .catch((error) => {
                console.log(error);
                this.props.updateRecipesStop();
                toast.error("Error deleting the recipe");
            });
    }

    public goToRecipePage = (slug: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        const { history } = this.props;

        history.push(`/recipe/${slug}`);
    }

    public renderTags(recipe: Recipe) {
        return recipe.tags ?
            recipe.tags.map((tag, index) => {
                return (
                    <StyledFontAwesomeIcon key={index} size="lg" icon={getTagIcon(tag)} />
                )
            })
            :
            null

    }

    public renderRecipes() {
        const { recipes, loading } = this.props;

        return (
            <Grid container={true} spacing={2}>
                {loading ?
                    <Loader active={true} inline="centered" />
                    :
                    recipes.map((recipe) =>
                        <Grid key={recipe.id} item={true} xs={12} sm={6} md={4} lg={3}>
                            <StyledCard>
                                <CardActionArea onClick={this.goToRecipePage(recipe.slug)}>
                                    <StyledCardMedia
                                        image={
                                            "https://assets.kraftfoods.com/recipe_images/opendeploy/201689_640x428.jpg"
                                        }
                                        title="TODO"
                                    />
                                    <StyledCardContent>
                                        <Typography
                                            variant={"h6"}
                                            gutterBottom={true}
                                        >
                                            {recipe.name}
                                        </Typography>
                                        <Typography
                                            variant={"caption"}
                                        >
                                            {recipe.description}
                                        </Typography>
                                        <Box>
                                            {this.renderTags(recipe)}
                                        </Box>
                                    </StyledCardContent>
                                    <Divider className={"MuiDivider-root"} light={true} />
                                </CardActionArea>
                                <CardActions disableSpacing={true}>
                                    <IconButton aria-label="Share recipe">
                                        <ShareIcon />
                                    </IconButton>
                                    <IconButton aria-label="Delete recipe" onClick={this.deleteRecipe(recipe.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </StyledCard>
                        </Grid>,
                    )
                }
            </Grid>
        );
    }

    public render() {
        const { loading } = this.props;

        return (
            <>
                <Title>My recipes</Title>
                <Typography paragraph={true}>
                    Here you can manage your own recipes
                </Typography>
                {loading ?
                    <Loader active={true} inline="centered" />
                    :
                    <>
                        <AddRecipeForm />
                        {this.renderRecipes()}
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    recipes: state.recipes.recipes,
    loading: state.recipes.loadingRecipes,
    updating: state.recipes.updatingRecipes,
    auth: state.firebase.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchRecipesStart: bindActionCreators(recipesActions.fetchRecipesStart, dispatch),
    fetchRecipesStop: bindActionCreators(recipesActions.fetchRecipesStop, dispatch),
    updateRecipesStart: bindActionCreators(recipesActions.updateRecipesStart, dispatch),
    updateRecipesStop: bindActionCreators(recipesActions.updateRecipesStop, dispatch),
    updateRecipes: bindActionCreators(recipesActions.updateRecipes, dispatch),
    addRecipe: bindActionCreators(recipesActions.addRecipe, dispatch),
    deleteRecipe: bindActionCreators(recipesActions.deleteRecipe, dispatch),
});

const RecipesView = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(withRouter(RecipesViewBase));

export default RecipesView;
