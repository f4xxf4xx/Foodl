import { Box, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Creatable from 'react-select/creatable';
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledPaper } from "../../../layout/Styles/Sections";
import * as cartActions from "../../../store/cart/cartActions";
import * as cartService from "../../../services/CartService";
import * as ingredientService from "../../../services/IngredientService";

const AddCartItemForm = () => {
    const dispatch = useDispatch();
    //store
    const ingredients = useSelector((state: ApplicationState) => state.ingredients.ingredients);
    const ingredientsLoading = useSelector((state: ApplicationState) => state.ingredients.loading);
    const ingredientsUpdating = useSelector((state: ApplicationState) => state.ingredients.updating);
    const newCartItem = useSelector((state: ApplicationState) => state.cart.newCartItem);
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
            dispatch(ingredientService.fetchAsync());
        }

        fetch();
    }, [dispatch]);

    const addIngredient = async () => {
        if (!newCartItem) {
            return;
        }

        if (!ingredients.find((i) => i.name === newCartItem.label)) {
            dispatch(ingredientService.addIngredientAsync(newCartItem.label));
        }

        dispatch(cartService.addItemAsync(firebase.auth.uid, newCartItem.label));
    }

    const handleKeyPress = (event) => {
        if (event.charCode === 13) {
            addIngredient();
        }
    }

    const updateCurrentSelectedIngredient = (e: any) => {
        dispatch(cartActions.updateNewCartItem(e));
    }

    const preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <StyledPaper>
            <Typography variant="h6">New cart item</Typography>
            <form onSubmit={preventDefault}>
                {!ingredientsLoading &&
                    <>
                        <Box>
                            <Creatable
                                id="input-ingredient"
                                options={ingredientOptions}
                                value={newCartItem}
                                onChange={updateCurrentSelectedIngredient}
                                onKeyPress={handleKeyPress}
                            />
                        </Box>
                        <ButtonPrimary
                            onClick={addIngredient}
                            disabled={ingredientsUpdating}
                        >
                            Add
                        </ButtonPrimary>
                    </>
                }
            </form>
        </StyledPaper>
    );
}

export default AddCartItemForm;
