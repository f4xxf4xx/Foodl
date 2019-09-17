import { FormLabel, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Creatable from 'react-select/creatable';
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { InputWrapper } from "../../../layout/Styles/Forms";
import { StyledPaper } from "../../../layout/Styles/Sections";
import { IngredientItem } from "../models";
import { IngredientType, IngredientPrepType } from "../constants";
import * as ingredientService from "../../../services/ingredientService";
import * as recipeService from "../../../services/recipeService";

interface OwnProps {
    editing: boolean;
}

type Props = OwnProps;

const AddIngredientItemForm = (props: Props) => {
    const dispatch = useDispatch();
    //state
    const [newIngredientItem, setNewIngredientItem] = useState<IngredientItem>({ name: "", quantity: "", type: "", prepType: "", group: null })
    const [currentSelectIngredient, setCurrentSelectIngredient] = useState(null);
    const [currentSelectType, setCurrentSelectType] = useState(null);
    const [currentPrepType, setCurrentPrepType] = useState(null);
    const [currentIngredientGroup, setCurrentIngredientGroup] = useState(null);
    //store
    const ingredients = useSelector((state: ApplicationState) => state.ingredients.ingredients);
    const recipe = useSelector((state: ApplicationState) => state.recipe.recipe);
    //vars
    const ingredientOptions = ingredients ? ingredients.map((ingredient) => {
        return {
            value: ingredient.name,
            label: ingredient.name,
        };
    }) : [];
    const typeOptions = Object.keys(IngredientType).map((type) => {
        return {
            value: IngredientType[type],
            label: IngredientType[type],
        };
    });
    const prepTypeOptions = Object.keys(IngredientPrepType).map((type) => {
        return {
            value: IngredientPrepType[type],
            label: IngredientPrepType[type],
        };
    });
    const ingredientGroupOptions = recipe.ingredientGroups && recipe.ingredientGroups.map((group) => {
        return {
            value: group,
            label: group,
        };
    });

    useEffect(() => {
        const fetch = async () => {
            if (ingredients.length === 0) {
                dispatch(ingredientService.fetchAsync());
            }
        }
        fetch();
    }, [dispatch, ingredients.length])

    const updateName = (e: any) => {
        setNewIngredientItem({ ...newIngredientItem, name: e ? e.label : null });
        setCurrentSelectIngredient(e);
    }

    const updateGroup = (e: any) => {
        setNewIngredientItem({ ...newIngredientItem, group: e ? e.label : null });
        setCurrentIngredientGroup(e);
    }

    const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewIngredientItem({ ...newIngredientItem, quantity: e ? e.target.value : null });
    }

    const updateType = (e: any) => {
        setNewIngredientItem({ ...newIngredientItem, type: e ? e.value : null });
        setCurrentSelectType(e);
    }

    const updatePrepType = (e: any) => {
        setNewIngredientItem({ ...newIngredientItem, prepType: e ? e.value : null });
        setCurrentPrepType(e);
    }

    const addIngredient = () => {
        if (newIngredientItem.name === ""
            || newIngredientItem.quantity === ""
            || newIngredientItem.type === "") {
            return false;
        }

        if (!ingredients.find((i) => i.name === newIngredientItem.name)) {
            dispatch(ingredientService.addIngredientAsync(newIngredientItem.name));
        }

        if (!recipe.ingredientGroups || !recipe.ingredientGroups.includes(newIngredientItem.group)) {
            dispatch(recipeService.addIngredientGroupAsync(recipe, newIngredientItem.group));
        }

        try {
            dispatch(recipeService.addIngredientItemAsync(recipe, newIngredientItem));
            setNewIngredientItem(null);
            setCurrentSelectIngredient(null);
            setCurrentSelectType(null);
            setCurrentPrepType(null);
            setCurrentIngredientGroup(null);
        }
        finally { }
    }

    const preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <>
            {props.editing &&
                <StyledPaper>
                    <form onSubmit={preventDefault}>
                        <Typography variant="h6">
                            Add ingredient
                            </Typography>
                        <InputWrapper>
                            <TextField
                                id="input-quantity"
                                label="Quantity"
                                type="text"
                                value={newIngredientItem.quantity}
                                onChange={updateQuantity}
                                fullWidth={true}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <FormLabel htmlFor="input-type">
                                Type
                                </FormLabel>
                            <Select
                                id="input-type"
                                label="type"
                                options={typeOptions}
                                value={currentSelectType}
                                onChange={updateType}
                                isClearable
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <FormLabel htmlFor="input-ingredient">
                                Ingredient
                                </FormLabel>
                            <Creatable
                                id="input-ingredient"
                                options={ingredientOptions}
                                value={currentSelectIngredient}
                                onChange={updateName}
                                isClearable
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <FormLabel htmlFor="input-ingredient">
                                Preparation
                                </FormLabel>
                            <Select
                                id="input-ingredient-preparation"
                                label="prep-type"
                                options={prepTypeOptions}
                                value={currentPrepType}
                                onChange={updatePrepType}
                                isClearable
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <FormLabel htmlFor="input-ingredient">
                                Group
                                </FormLabel>
                            <Creatable
                                id="input-group"
                                options={ingredientGroupOptions}
                                value={currentIngredientGroup}
                                onChange={updateGroup}
                                isClearable
                            />
                        </InputWrapper>
                        <ButtonPrimary
                            onClick={addIngredient}
                        >
                            Add
                        </ButtonPrimary>
                    </form>
                </StyledPaper>
            }
        </>
    );
}

export default AddIngredientItemForm;
