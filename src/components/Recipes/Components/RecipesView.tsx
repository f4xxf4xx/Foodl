import React, { Component, PureComponent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Recipe, IngredientItem } from '../models';
import { withRouter } from 'react-router-dom';
import { recipeService } from '../recipeService';
import { toast } from 'react-toastify';
import slugify from 'react-slugify';
import { TableHead, TableBody, TableRow, TableCell, Table, Button, Typography, Paper, FormLabel, TextField } from '@material-ui/core';
import * as recipeActions from '../recipeActions';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import AddRecipeForm from './AddRecipeForm';
import { Loader } from 'semantic-ui-react';

type State = {
    newRecipeName: string;
};

type StateProps = {
    recipes: Recipe[];
    loadingRecipes: boolean;
    updatingRecipes: boolean;
    error: string;
};

type DispatchProps = {
    fetchRecipesBegin: typeof recipeActions.deleteRecipeBegin;
    fetchRecipesSuccess: typeof recipeActions.fetchRecipesSuccess;
    fetchRecipesFailure: typeof recipeActions.fetchRecipesFailure;
    deleteRecipeBegin: typeof recipeActions.deleteRecipeBegin;
    deleteRecipeSuccess: typeof recipeActions.deleteRecipeSuccess;
    deleteRecipeFailure: typeof recipeActions.deleteRecipeFailure;
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
            this.props.fetchRecipesBegin();
            recipeService.getRecipes()
                .then((recipes) => this.props.fetchRecipesSuccess(recipes))
                .catch(error => this.props.fetchRecipesFailure(error))
        }
    }

    deleteRecipe(recipeId: any): any {
        this.props.deleteRecipeBegin();
        recipeService.deleteRecipe(recipeId)
            .then(() => {
                this.props.deleteRecipeSuccess(recipeId);
                toast.success("Deleted!");
            });
    }

    renderRecipes() {
        const { recipes, loadingRecipes, updatingRecipes } = this.props;

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="col">Recipes</TableCell>
                            <TableCell component="th" scope="col">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadingRecipes ?
                            <Loader active inline='centered' />
                            : recipes.map((recipe) =>
                                <TableRow key={recipe.id}>
                                    <TableCell><Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link></TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => this.deleteRecipe(recipe.id)}
                                            disabled={updatingRecipes}
                                        >
                                            DELETE
                                </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    render() {
        return (
            <>
                <Typography variant="h2">My recipes</Typography>
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
        loadingRecipes: state.recipes.loadingRecipes,
        updatingRecipes: state.recipes.updatingRecipes,
        error: state.recipes.error
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchRecipesBegin: bindActionCreators(recipeActions.fetchRecipesBegin, dispatch),
        fetchRecipesSuccess: bindActionCreators(recipeActions.fetchRecipesSuccess, dispatch),
        fetchRecipesFailure: bindActionCreators(recipeActions.fetchRecipesFailure, dispatch),
        deleteRecipeBegin: bindActionCreators(recipeActions.deleteRecipeBegin, dispatch),
        deleteRecipeSuccess: bindActionCreators(recipeActions.deleteRecipeSuccess, dispatch),
        deleteRecipeFailure: bindActionCreators(recipeActions.deleteRecipeFailure, dispatch)
    };
};

const RecipesView = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(withRouter(RecipesViewBase));

export default RecipesView;