import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Recipe } from '../models';
import { withRouter } from 'react-router-dom';
import { recipeService } from '../../../services/recipeService';
import { toast } from 'react-toastify';
import { Typography, CardHeader, IconButton, CardContent, CardActions, CardActionArea, Grid } from '@material-ui/core';
import * as recipesActions from '../../../store/recipes/recipesActions';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import AddRecipeForm from './AddRecipeForm';
import { Loader } from 'semantic-ui-react';
import { Title } from '../../Layout/Styles/Sections';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import { StyledCardMedia } from './Styles/StyledCardMedia';
import { StyledCard } from './Styles/StyledCard';
import { ApplicationState } from '../../..';
import { firestoreConnect } from 'react-redux-firebase';

type State = {
    newRecipeName: string;
};

type StateProps = {
    recipes: Recipe[];
    loading: boolean;
    updating: boolean;
    error: string;
};

type DispatchProps = {
    fetchRecipesStart: typeof recipesActions.fetchRecipesStart;
    fetchRecipesStop: typeof recipesActions.fetchRecipesStop;
    updateRecipesStart: typeof recipesActions.updateRecipesStart;
    updateRecipesStop: typeof recipesActions.updateRecipesStop;
    updateRecipes: typeof recipesActions.updateRecipes;
    addRecipe: typeof recipesActions.addRecipe;
    deleteRecipe: typeof recipesActions.deleteRecipe;
};

type Props = StateProps & RouteComponentProps & DispatchProps;

class RecipesViewBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newRecipeName: ""
        };
    }

    componentDidMount() {
        if (this.props.recipes.length === 0) {
            this.props.fetchRecipesStart();
            recipeService.getRecipes()
                .then((recipes) => {
                    this.props.updateRecipes(recipes);
                    this.props.fetchRecipesStop()
                })
                .catch(() => {
                    this.props.fetchRecipesStop();
                    toast.error("Error fetching the recipes");
                })
        }
    }

    deleteRecipe(recipeId: any): any {
        this.props.updateRecipesStart();
        recipeService.deleteRecipe(recipeId)
            .then(() => {
                this.props.deleteRecipe(recipeId);
                this.props.updateRecipesStop();
                toast.success("Deleted!");
            })
            .catch(() => {
                this.props.updateRecipesStop();
                toast.error("Error deleting the recipe");
            })
    }

    renderRecipes() {
        const { recipes, loading, history } = this.props;

        return (
            <Grid container spacing={2}>
                {loading ?
                    <Loader active inline='centered' />
                    :
                    recipes.map((recipe) =>
                        <Grid key={recipe.id} item xs={4}>
                            <StyledCard>
                                <CardActionArea onClick={() => history.push(`/recipe/${recipe.id}`)}>
                                    <CardHeader
                                        title={recipe.name}
                                    />
                                    <StyledCardMedia
                                        component={'img'}
                                        src="https://material-ui.com/static/images/cards/paella.jpg"
                                        title="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {recipe.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="Share recipe">
                                        <ShareIcon />
                                    </IconButton>
                                    <IconButton aria-label="Delete recipe" onClick={() => this.deleteRecipe(recipe.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </StyledCard>
                        </Grid>
                    )
                }
            </Grid>
        );
    }

    render() {
        return (
            <>
                <Title>My recipes</Title>
                <Typography paragraph>
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
                <AddRecipeForm />
                {this.renderRecipes()}
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    recipes: state.recipes.recipes,
    loading: state.recipes.loadingRecipes,
    updating: state.recipes.updatingRecipes
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(firestoreConnect([{collection: 'recipes'}])(RecipesViewBase))

// const RecipesView = compose(
//     connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
// )(withRouter(RecipesViewBase));

// export default RecipesView;