import React, { Component, PureComponent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Recipe, IngredientItem } from '../models';
import { withRouter } from 'react-router-dom';
import { recipeService } from '../recipeService';
import { toast } from 'react-toastify';
import slugify from 'react-slugify';
import { TableHead, TableBody, TableRow, TableCell, Table, Button, Typography, Paper, FormLabel, TextField } from '@material-ui/core';
import * as recipesActions from '../recipesActions';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import AddRecipeForm from './AddRecipeForm';
import { Loader } from 'semantic-ui-react';
import { ButtonPrimary, ButtonError } from '../../Layout/Styles/Buttons';
import { Title } from '../../Layout/Styles/Sections';

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
        const { recipes, loading, updating } = this.props;

        return (
            <Paper>
                {loading ?
                    <Loader active inline='centered' />
                    :
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" scope="col">Recipes</TableCell>
                                <TableCell component="th" scope="col">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recipes.map((recipe) =>
                                <TableRow key={recipe.id}>
                                    <TableCell><Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link></TableCell>
                                    <TableCell>
                                        <ButtonError
                                            onClick={() => this.deleteRecipe(recipe.id)}
                                            disabled={updating}
                                        >
                                            DELETE
                                        </ButtonError>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                }
            </Paper>
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

const mapStateToProps = (state: any) => {
    return {
        recipes: state.recipes.recipes,
        loading: state.recipes.loading,
        updating: state.recipes.updating
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchRecipesStart: bindActionCreators(recipesActions.fetchRecipesStart, dispatch),
        fetchRecipesStop: bindActionCreators(recipesActions.fetchRecipesStop, dispatch),
        updateRecipesStart: bindActionCreators(recipesActions.updateRecipesStart, dispatch),
        updateRecipesStop: bindActionCreators(recipesActions.updateRecipesStop, dispatch),
        updateRecipes: bindActionCreators(recipesActions.updateRecipes, dispatch),
        addRecipe: bindActionCreators(recipesActions.addRecipe, dispatch),
        deleteRecipe: bindActionCreators(recipesActions.deleteRecipe, dispatch),
    };
};

const RecipesView = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(withRouter(RecipesViewBase));

export default RecipesView;