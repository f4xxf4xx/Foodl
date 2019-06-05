import React, { PureComponent } from "react";
import { RouteProps } from "react-router-dom";
import Header from "../../Layout/Header";
import SectionHeaderElement from "../../Layout/Section/SectionHeaderElement";
import SectionElement from "../../Layout/Section/SectionElement";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { compose, bindActionCreators, Dispatch } from "redux";
import * as ingredientActions from "../ingredientActions";
import { Ingredient } from "../models";
import { ingredientService } from "../ingredientService";
import Button from '@material-ui/core/Button';
import { TableHead, TableRow, Table, TableCell, TableBody, Paper, Typography, FormLabel, TextField } from "@material-ui/core";

type State = {
    newIngredientName: string;
};

type StateProps = {
    ingredients: Ingredient[];
    loading: boolean;
    updating: boolean;
};

type DispatchProps = {
    fetchIngredientsStart: typeof ingredientActions.deleteIngredientBegin;
    fetchIngredientsSuccess: typeof ingredientActions.fetchIngredientsSuccess;
    fetchIngredientsFailure: typeof ingredientActions.fetchIngredientsFailure;
    addIngredientBegin: typeof ingredientActions.addIngredientBegin;
    addIngredientSuccess: typeof ingredientActions.addIngredientSuccess;
    addIngredientFailure: typeof ingredientActions.addIngredientFailure;
    deleteIngredientBegin: typeof ingredientActions.deleteIngredientBegin;
    deleteIngredientSuccess: typeof ingredientActions.deleteIngredientSuccess;
    deleteIngredientFailure: typeof ingredientActions.deleteIngredientFailure;
};

type Props = StateProps & DispatchProps & RouteProps;

class IngredientsViewBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newIngredientName: ""
        };
    }

    componentDidMount() {
        this.props.fetchIngredientsStart();
        return ingredientService.getIngredients()
            .then(ingredients => {
                this.props.fetchIngredientsSuccess(ingredients);
            })
            .catch(error => {
                this.props.fetchIngredientsFailure(error);
            });
    }

    addIngredient = () => {
        const { newIngredientName } = this.state;
        if (newIngredientName === "") {
            return;
        }

        this.props.addIngredientBegin();
        ingredientService.addIngredient(newIngredientName)
            .then((ingredient) => {
                this.props.addIngredientSuccess(ingredient);
                toast.success("Added!");
                this.setState({
                    newIngredientName: ""
                });
            })
            .catch(() => {
                toast.error("Error adding the ingredient.");
            });
    }

    handleKeyPress = (event) => {
        if (event.charCode === 13) {
            this.addIngredient();
        }
    }

    renderIngredients() {
        const { ingredients, updating } = this.props;

        return (
            <Paper>
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
            </Paper>
        );
    }

    updateIngredientName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newIngredientName: e.target.value });
    }

    deleteIngredient(ingredientId: string): void {
        this.props.deleteIngredientBegin();
        ingredientService.deleteIngredient(ingredientId)
            .then(() => {
                this.props.deleteIngredientSuccess(ingredientId);
                toast.success("Deleted!");
            })
            .catch(() => {
                toast.error("Error deleting the ingredient.")
            });
    }

    renderNewIngredientForm() {
        const { updating } = this.props;

        return (
            <>
                <Typography variant="h4">New ingredient</Typography>
                <form onSubmit={e => { e.preventDefault(); }}>
                    <div>
                        <FormLabel htmlFor="input-ingredient-name">
                            Ingredient name
                        </FormLabel>
                        <TextField
                            id="input-ingredient-name"
                            placeholder="Ingredient name"
                            type="text"
                            onChange={this.updateIngredientName}
                            value={this.state.newIngredientName}
                            onKeyPress={this.handleKeyPress}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.addIngredient}
                        disabled={updating}
                    >
                        Add
                    </Button>
                </form>
            </>
        )
    }

    render() {
        const { loading } = this.props;
        return (
            <>
                <SectionHeaderElement
                    title="Ingredients"
                >
                    <Typography>
                        Here lies the list of possible ingredients
                    </Typography>
                </SectionHeaderElement>
                {this.renderNewIngredientForm()}
                <SectionElement>
                    {!loading && this.renderIngredients()}
                </SectionElement>
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
        fetchIngredientsStart: bindActionCreators(ingredientActions.fetchIngredientsBegin, dispatch),
        fetchIngredientsSuccess: bindActionCreators(ingredientActions.fetchIngredientsSuccess, dispatch),
        fetchIngredientsFailure: bindActionCreators(ingredientActions.fetchIngredientsFailure, dispatch),
        addIngredientBegin: bindActionCreators(ingredientActions.addIngredientBegin, dispatch),
        addIngredientSuccess: bindActionCreators(ingredientActions.addIngredientSuccess, dispatch),
        addIngredientFailure: bindActionCreators(ingredientActions.addIngredientFailure, dispatch),
        deleteIngredientBegin: bindActionCreators(ingredientActions.deleteIngredientBegin, dispatch),
        deleteIngredientSuccess: bindActionCreators(ingredientActions.deleteIngredientSuccess, dispatch),
        deleteIngredientFailure: bindActionCreators(ingredientActions.deleteIngredientFailure, dispatch)
    };
};

const IngredientsView = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(IngredientsViewBase);

export default IngredientsView;