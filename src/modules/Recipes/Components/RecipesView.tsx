import { Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Divider, Grid, IconButton, Typography } from "@material-ui/core";
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

        if (this.props.recipes.length === 0) {
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
    }

    public deleteRecipe = (recipeId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.updateRecipesStart();
        RecipeService.deleteRecipe(recipeId)
            .then(() => {
                this.props.deleteRecipe(recipeId);
                this.props.updateRecipesStop();
                toast.success("Deleted!");
            })
            .catch(() => {
                this.props.updateRecipesStop();
                toast.error("Error deleting the recipe");
            });
    }

    public goToRecipePage = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        const { history } = this.props;

        history.push(`/recipe/${id}`);
    }

    public renderRecipes() {
        const { recipes, loading, history } = this.props;

        return (
            <Grid container={true} spacing={2}>
                {loading ?
                    <Loader active={true} inline="centered" />
                    :
                    recipes.map((recipe) =>
                        <Grid key={recipe.id} item={true} xs={12} sm={6} md={4} lg={3}>
                            <StyledCard>
                                <CardActionArea onClick={this.goToRecipePage(recipe.id)}>
                                    <StyledCardMedia
                                        image={
                                            "https://material-ui.com/static/images/cards/paella.jpg"
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
                                            Slow-cooked meat-sauce with wine, authentic recipe from Bologna.
                                        </Typography>
                                        <Divider className={"MuiDivider-root"} light={true} />
                                    </StyledCardContent>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    ultrices arcu at sagittis aliquet. Donec convallis, felis id viverra sagittis, diam libero volutpat nunc,
                    pretium orci augue sed urna. Ut in laoreet lectus, in luctus purus. Cras a quam turpis.
                    Cras scelerisque hendrerit erat. Maecenas iaculis venenatis augue, a rutrum ex.
                    Fusce vehicula urna molestie congue ultrices.
                    Suspendisse quis nulla nec risus varius pellentesque. Nullam efficitur sapien dolor,
                    uis tincidunt justo scelerisque ac. Fusce justo erat,
                    ullamcorper et justo quis, efficitur egestas tellus. Integer interdum fermentum lorem,
                    in placerat purus volutpat vitae.
                    Ut sodales cursus dolor eget molestie. Curabitur eget laoreet ligula. Aenean venenatis
                    lorem nisi, nec dignissim ipsum malesuada ac.
                    In id porta tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
