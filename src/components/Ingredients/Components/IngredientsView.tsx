import React, { PureComponent } from "react";
import { RouteProps } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { compose, bindActionCreators, Dispatch } from "redux";
import * as ingredientActions from "../ingredientActions";
import { Ingredient } from "../models";
import { ingredientService } from "../ingredientService";
import Button from '@material-ui/core/Button';
import { TableHead, TableRow, Table, TableCell, TableBody, Paper, Typography, FormLabel, TextField } from "@material-ui/core";
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import AddIngredientForm from "./AddIngredientForm";

type StateProps = {
    ingredients: Ingredient[];
    loading: boolean;
    updating: boolean;
};

type DispatchProps = {
    fetchIngredientsBegin: typeof ingredientActions.deleteIngredientBegin;
    fetchIngredientsSuccess: typeof ingredientActions.fetchIngredientsSuccess;
    fetchIngredientsFailure: typeof ingredientActions.fetchIngredientsFailure;
    deleteIngredientBegin: typeof ingredientActions.deleteIngredientBegin;
    deleteIngredientSuccess: typeof ingredientActions.deleteIngredientSuccess;
    deleteIngredientFailure: typeof ingredientActions.deleteIngredientFailure;
};

type Props = StateProps & DispatchProps & RouteProps;

class IngredientsViewBase extends PureComponent<Props> {
    componentDidMount() {
        if (this.props.ingredients.length === 0) {
            this.props.fetchIngredientsBegin();
            return ingredientService.getIngredients()
                .then(ingredients => this.props.fetchIngredientsSuccess(ingredients))
                .catch(error => this.props.fetchIngredientsFailure(error));
        }
    }

    renderIngredients() {
        const { ingredients, updating, loading } = this.props;

        return (
            <Paper>
                {loading ?
                    <Loader active inline='centered' />
                    :
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell component="th">Ingredients</TableCell>
                                <TableCell component="th">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients.map((ingredient) =>
                                <TableRow key={ingredient.id}>
                                    <TableCell>{ingredient.name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={updating}
                                            onClick={() => this.deleteIngredient(ingredient.id)}>
                                            DELETE
                                </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                }
            </Paper>
        );
    }

    deleteIngredient(ingredientId: string): void {
        this.props.deleteIngredientBegin();
        ingredientService.deleteIngredient(ingredientId)
            .then(() => {
                this.props.deleteIngredientSuccess(ingredientId);
                toast.success("Deleted!");
            })
            .catch(() => toast.error("Error deleting the ingredient."));
    }

    render() {
        const { updating } = this.props;
        return (
            <>
                <Typography variant="h2">Ingredients</Typography>
                <Typography variant="subtitle1">
                    Here lies the list of possible ingredients
                </Typography>
                <AddIngredientForm updating={updating} />
                {this.renderIngredients()}
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        ingredients: state.ingredients.ingredients,
        loading: state.ingredients.loading,
        updating: state.ingredients.updating
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchIngredientsBegin: bindActionCreators(ingredientActions.fetchIngredientsBegin, dispatch),
        fetchIngredientsSuccess: bindActionCreators(ingredientActions.fetchIngredientsSuccess, dispatch),
        fetchIngredientsFailure: bindActionCreators(ingredientActions.fetchIngredientsFailure, dispatch),
        deleteIngredientBegin: bindActionCreators(ingredientActions.deleteIngredientBegin, dispatch),
        deleteIngredientSuccess: bindActionCreators(ingredientActions.deleteIngredientSuccess, dispatch),
        deleteIngredientFailure: bindActionCreators(ingredientActions.deleteIngredientFailure, dispatch)
    };
};

const IngredientsView = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(IngredientsViewBase);

export default IngredientsView;