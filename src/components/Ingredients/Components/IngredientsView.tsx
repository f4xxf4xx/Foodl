import React, { PureComponent } from "react";
import { RouteProps } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { compose, bindActionCreators, Dispatch } from "redux";
import * as ingredientActions from "../ingredientActions";
import { Ingredient } from "../models";
import { ingredientService } from "../ingredientService";
import { TableHead, TableRow, Table, TableCell, TableBody, Paper, Typography, FormLabel, TextField } from "@material-ui/core";
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import AddIngredientForm from "./AddIngredientForm";
import { ButtonError } from "../../Layout/Styles/Buttons";
import { Title } from "../../Layout/Styles/Sections";

type StateProps = {
    ingredients: Ingredient[];
    loadingIngredients: boolean;
    updatingIngredients: boolean;
};

type DispatchProps = {
    fetchIngredientsStart: typeof ingredientActions.fetchIngredientsStart;
    fetchIngredientsStop: typeof ingredientActions.fetchIngredientsStop;
    updateIngredientsStart: typeof ingredientActions.updateIngredientsStart;
    updateIngredientsStop: typeof ingredientActions.updateIngredientsStop;
    updateIngredients: typeof ingredientActions.updateIngredients;
    deleteIngredient: typeof ingredientActions.deleteIngredient;
};

type Props = StateProps & DispatchProps & RouteProps;

class IngredientsViewBase extends PureComponent<Props> {
    componentDidMount() {
        if (this.props.ingredients.length === 0) {
            this.props.fetchIngredientsStart();
            return ingredientService.getIngredients()
                .then(ingredients => {
                    this.props.updateIngredients(ingredients);
                    this.props.fetchIngredientsStop();
                })
                .catch(() => {
                    toast.error("Error fetching the ingredients");
                    this.props.fetchIngredientsStop();
                });
        }
    }

    deleteIngredient(ingredientId: string): void {
        this.props.updateIngredientsStart();
        ingredientService.deleteIngredient(ingredientId)
            .then(() => {
                this.props.deleteIngredient(ingredientId);
                this.props.updateIngredientsStop();
                toast.success("Deleted!");
            })
            .catch(() => {
                this.props.updateIngredientsStop();
                toast.error("Error deleting the ingredient!")
            });
    }

    renderIngredients() {
        const { ingredients, updatingIngredients, loadingIngredients } = this.props;

        return (
            <Paper>
                {loadingIngredients ?
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
                                        <ButtonError
                                            disabled={updatingIngredients}
                                            onClick={() => this.deleteIngredient(ingredient.id)}
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
        const { updatingIngredients } = this.props;
        return (
            <>
                <Title>Ingredients</Title>
                <Typography variant="subtitle1">
                    Here lies the list of possible ingredients
                </Typography>
                <AddIngredientForm updating={updatingIngredients} />
                {this.renderIngredients()}
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        ingredients: state.ingredients.ingredients,
        loadingIngredients: state.ingredients.loadingIngredients,
        updatingIngredients: state.ingredients.updatingIngredients
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchIngredientsStart: bindActionCreators(ingredientActions.fetchIngredientsStart, dispatch),
        fetchIngredientsStop: bindActionCreators(ingredientActions.fetchIngredientsStop, dispatch),
        updateIngredientsStart: bindActionCreators(ingredientActions.updateIngredientsStart, dispatch),
        updateIngredientsStop: bindActionCreators(ingredientActions.updateIngredientsStop, dispatch),
        updateIngredients: bindActionCreators(ingredientActions.updateIngredients, dispatch),
        deleteIngredient: bindActionCreators(ingredientActions.deleteIngredient, dispatch)
    };
};

const IngredientsView = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(IngredientsViewBase);

export default IngredientsView;