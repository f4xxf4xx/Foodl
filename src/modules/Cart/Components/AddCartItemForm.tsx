import { Box, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Creatable from 'react-select/creatable';
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledPaper } from "../../../layout/Styles/Sections";
import * as ingredientActions2 from "../../../store/ingredients/ingredientActions2";
import * as cartActions2 from "../../../store/cart/cartActions2";
import * as cartService from "../../../services/cartService";

const AddCartItemForm = () => {
    const dispatch = useDispatch();
    //store
    const ingredients = useSelector((state: ApplicationState) => state.ingredients.ingredients);
    const ingredientsLoading = useSelector((state: ApplicationState) => state.ingredients.loading);
    const ingredientsUpdating = useSelector((state: ApplicationState) => state.ingredients.updating);
    const currentSelectedIngredient = useSelector((state: ApplicationState) => state.cart.currentSelectedIngredient);
    const firebase = useSelector((state: ApplicationState) => state.firebase);
    //vars
    const ingredientOptions = ingredients ? ingredients.map((ingredient) => {
        return {
            value: ingredient.id,
            label: ingredient.name,
        };
    }) : [];

    useEffect(() => {
        const fetch = async () => {
            dispatch(ingredientActions2.fetchAsync());
        }

        fetch();
    }, [dispatch]);

    const addIngredient = async () => {
        if (!currentSelectedIngredient) {
            return;
        }

        if (!ingredients.find((i) => i.name === currentSelectedIngredient.label)) {
            dispatch(ingredientActions2.addIngredientAsync(currentSelectedIngredient.label));
        }

        dispatch(cartService.addItemAsync(firebase.auth.uid, currentSelectedIngredient.label));
    }

    const handleKeyPress = (event) => {
        if (event.charCode === 13) {
            addIngredient();
        }
    }

    const updateCurrentSelectedIngredient = (e: any) => {
        dispatch(cartActions2.updateCurrentSelectedIngredient(e));
    }

    const preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <StyledPaper>
            <Typography variant="h6">New cart item</Typography>
            <form onSubmit={preventDefault}>
                <Box>
                    {!ingredientsLoading &&
                        <Creatable
                            id="input-ingredient"
                            options={ingredientOptions}
                            value={currentSelectedIngredient}
                            onChange={updateCurrentSelectedIngredient}
                            onKeyPress={handleKeyPress}
                        />
                    }
                </Box>
                <ButtonPrimary
                    onClick={addIngredient}
                    disabled={ingredientsUpdating}
                >
                    Add
                </ButtonPrimary>
            </form>
        </StyledPaper>
    );
}

export default AddCartItemForm;
