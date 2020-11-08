import { Box, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledPaper } from "../../../layout/Styles/Sections";
import * as recipeService from "../../../services/RecipeService";

type Props = RouteComponentProps;

const AddRecipeForm = (props: Props) => {
    const dispatch = useDispatch();
    const [newRecipeName, setNewRecipeName] = useState("");
    //store
    const auth = useSelector((state: ApplicationState) => state.firebase.auth);
    const updatingRecipes = useSelector((state: ApplicationState) => state.recipes.updating);

    const updateRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRecipeName(e.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.charCode === 13) {
            addRecipe();
        }
    }

    const addRecipe = async () => {
        if (newRecipeName === "") {
            return;
        }

        dispatch(recipeService.addRecipeAsync(newRecipeName, auth.uid, props.history));
        setNewRecipeName("");
    }

    const preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <StyledPaper>
            <Typography variant="h6">New recipe</Typography>
            <form onSubmit={preventDefault}>
                <Box>
                    <TextField
                        id="input-recipe-name"
                        label="Recipe name"
                        type="text"
                        onChange={updateRecipeName}
                        value={newRecipeName}
                        disabled={updatingRecipes}
                        onKeyPress={handleKeyPress}
                    />
                </Box>
                <ButtonPrimary
                    onClick={addRecipe}
                    disabled={updatingRecipes}
                >
                    Create
                </ButtonPrimary>
            </form>
        </StyledPaper>
    );

}

export default withRouter(AddRecipeForm);
