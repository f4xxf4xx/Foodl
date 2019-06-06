import React, { PureComponent } from "react";
import { RouteProps } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { compose, bindActionCreators, Dispatch } from "redux";
import * as ingredientActions from "../ingredientActions";
import { ingredientService } from "../ingredientService";
import Button from '@material-ui/core/Button';
import { Typography, FormLabel, TextField } from "@material-ui/core";

type OwnProps = {
    updating: boolean;
};

type State = {
    newIngredientName: string;
};

type DispatchProps = {
    addIngredientBegin: typeof ingredientActions.addIngredientBegin;
    addIngredientSuccess: typeof ingredientActions.addIngredientSuccess;
    addIngredientFailure: typeof ingredientActions.addIngredientFailure;
};

type Props = OwnProps & DispatchProps & RouteProps;

class AddIngredientFormBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newIngredientName: ""
        };
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
            .catch(() => toast.error("Error adding the ingredient."))
    }

    handleKeyPress = (event) => {
        if (event.charCode === 13) {
            this.addIngredient();
        }
    }

    updateIngredientName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newIngredientName: e.target.value });
    }

    render() {
        const { updating } = this.props;
        return (
            <>
                <Typography variant="h5">New ingredient</Typography>
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
        addIngredientBegin: bindActionCreators(ingredientActions.addIngredientBegin, dispatch),
        addIngredientSuccess: bindActionCreators(ingredientActions.addIngredientSuccess, dispatch),
        addIngredientFailure: bindActionCreators(ingredientActions.addIngredientFailure, dispatch)
    };
};

const AddIngredientForm = compose(
    connect<{}, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(AddIngredientFormBase);

export default AddIngredientForm;