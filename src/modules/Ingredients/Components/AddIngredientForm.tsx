import { Box, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledPaper } from "../../../layout/Styles/Sections";
import * as ingredientActions from "../../../store/ingredients/ingredientActions";
import * as ingredientService from "../../../services/IngredientService";

const AddIngredientForm = () => {
    const dispatch = useDispatch();
    //store
    const newIngredient = useSelector((state: ApplicationState) => state.ingredients.newIngredient);
    const updating = useSelector((state: ApplicationState) => state.ingredients.updating);

    const addIngredient = () => async () => {
        if (newIngredient === "") {
            return;
        }

        dispatch(ingredientService.addIngredientAsync(newIngredient));
    }

    const handleKeyPress = (event) => {
        if (event.charCode === 13) {
            addIngredient();
        }
    }

    const updateIngredientName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(ingredientActions.updateNewIngredient(e));
    }

    const preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <StyledPaper>
            <Typography variant="h6">New ingredient</Typography>
            <form onSubmit={preventDefault}>
                <Box>
                    <TextField
                        id="input-ingredient-name"
                        label="Ingredient name"
                        type="text"
                        onChange={updateIngredientName}
                        value={newIngredient}
                        onKeyPress={handleKeyPress}
                        fullWidth={true}
                    />
                </Box>
                <ButtonPrimary
                    onClick={addIngredient}
                    disabled={updating}
                >
                    Add
                    </ButtonPrimary>
            </form>
        </StyledPaper>
    );

}

export default AddIngredientForm;
