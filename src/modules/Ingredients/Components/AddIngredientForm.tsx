import { Box, TextField, Typography } from "@material-ui/core";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RouteProps } from "react-router-dom";
import { toast } from "react-toastify";
import { bindActionCreators, compose, Dispatch } from "redux";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledPaper } from "../../../layout/Styles/Sections";
import * as ingredientActions from "../../../store/ingredients/ingredientActions";
import { IngredientService } from "../../../services/IngredientService";

interface OwnProps {
    updating: boolean;
}

interface State {
    newIngredientName: string;
}

interface DispatchProps {
    updateIngredientsStart: typeof ingredientActions.updateIngredientsStart;
    updateIngredientsStop: typeof ingredientActions.updateIngredientsStop;
    addIngredient: typeof ingredientActions.addIngredient;
}

type Props = OwnProps & DispatchProps & RouteProps;

class AddIngredientFormBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newIngredientName: "",
        };
    }

    public addIngredient = () => {
        const { newIngredientName } = this.state;

        if (newIngredientName === "") {
            return;
        }

        this.props.updateIngredientsStart();
        IngredientService.addIngredient(newIngredientName)
            .then((ingredient) => {
                if (ingredient) {
                    this.props.updateIngredientsStop();
                    this.props.addIngredient(ingredient);
                    toast.success("Added!");
                    this.setState({
                        newIngredientName: "",
                    });
                }
                else {
                    this.props.updateIngredientsStop();
                    toast.warn("Ingredient already exists!");
                }
            })
            .catch((error) => {
                this.props.updateIngredientsStop();
                console.log(error);
                toast.error("Error adding the ingredient.");
            });
    }

    public handleKeyPress = (event) => {
        if (event.charCode === 13) {
            this.addIngredient();
        }
    }

    public updateIngredientName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newIngredientName: e.target.value });
    }

    preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    public render() {
        const { updating } = this.props;

        return (
            <StyledPaper>
                <Typography variant="h6">New ingredient</Typography>
                <form onSubmit={this.preventDefault}>
                    <Box>
                        <TextField
                            id="input-ingredient-name"
                            label="Ingredient name"
                            type="text"
                            onChange={this.updateIngredientName}
                            value={this.state.newIngredientName}
                            onKeyPress={this.handleKeyPress}
                            fullWidth={true}
                        />
                    </Box>
                    <ButtonPrimary
                        onClick={this.addIngredient}
                        disabled={updating}
                    >
                        Add
                    </ButtonPrimary>
                </form>
            </StyledPaper>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    ingredients: state.ingredients.ingredients,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateIngredientsStart: bindActionCreators(ingredientActions.updateIngredientsStart, dispatch),
    updateIngredientsStop: bindActionCreators(ingredientActions.updateIngredientsStop, dispatch),
    addIngredient: bindActionCreators(ingredientActions.addIngredient, dispatch),
});

const AddIngredientForm = compose(
    connect<{}, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(AddIngredientFormBase);

export default AddIngredientForm;
