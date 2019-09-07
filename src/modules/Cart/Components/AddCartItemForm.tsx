import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Creatable from 'react-select/creatable';
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledPaper } from "../../../layout/Styles/Sections";
import * as cartActions2 from "../../../store/cart/cartActions2";
import * as ingredientActions2 from "../../../store/ingredients/ingredientActions2";
import { CartService } from "../../../services/CartService";
import { toast } from "react-toastify";
import * as cartService2 from "../../../services/cartService2";

const AddCartItemForm = () => {
    const dispatch = useDispatch();
    //store
    const ingredients = useSelector((state: ApplicationState) => state.ingredients.ingredients);
    const ingredientsLoading = useSelector((state: ApplicationState) => state.ingredients.loading);
    const ingredientsUpdating = useSelector((state: ApplicationState) => state.ingredients.updating);
    const firebase = useSelector((state: ApplicationState) => state.firebase);
    //state
    const [currentSelectedIngredient, setCurrentSelectedIngredient] = useState(null);
    //vars
    const ingredientOptions = ingredients ? ingredients.map((ingredient) => {
        return {
            value: ingredient.id,
            label: ingredient.name,
        };
    }) : [];

    useEffect(() => {
        dispatch(ingredientActions2.fetchAsync());
    }, [dispatch]);

    const addIngredient = () => {
        if (!currentSelectedIngredient) {
            return;
        }

        if (!ingredients.find((i) => i.name === currentSelectedIngredient.label)) {
            dispatch(ingredientActions2.addIngredientAsync(currentSelectedIngredient.label));
        }

        addCartItemAsync(firebase.auth.uid, currentSelectedIngredient.label);
    }

    const addCartItemAsync = async (uid: string, label: string) => {
        dispatch(cartService2.addCartItemAsync(uid, label));
    }

    const handleKeyPress = (event) => {
        if (event.charCode === 13) {
            addIngredient();
        }
    }

    const updateCurrentSelectedIngredient = (e: any) => {
        setCurrentSelectedIngredient(e);
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
