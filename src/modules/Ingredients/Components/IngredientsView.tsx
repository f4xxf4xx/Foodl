import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { DeleteForever as DeleteIcon } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "semantic-ui-react";
import { ApplicationState } from "../../..";
import { ButtonError } from "../../../layout/Styles/Buttons";
import AddIngredientForm from "./AddIngredientForm";
import * as ingredientService from "../../../services/ingredientService";

const IngredientsView = () => {
    const dispatch = useDispatch();
    //store
    const ingredients = useSelector((state: ApplicationState) => state.ingredients.ingredients);
    const loading = useSelector((state: ApplicationState) => state.ingredients.loading);
    const updating = useSelector((state: ApplicationState) => state.ingredients.updating);

    useEffect(() => {
        const fetch = async () => {
            dispatch(ingredientService.fetchAsync());
        }
        fetch();
    }, [dispatch]);

    const deleteIngredient = (ingredientId: string) => async () => {
        dispatch(ingredientService.deleteIngredientAsync(ingredientId));
    }

    const renderIngredients = () => {
        return (
            <Paper>
                {loading ?
                    <Loader active={true} inline="centered" />
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
                                            width="15"
                                            disabled={updating}
                                            onClick={deleteIngredient(ingredient.id)}
                                        >
                                            <DeleteIcon />
                                        </ButtonError>
                                    </TableCell>
                                </TableRow>,
                            )}
                        </TableBody>
                    </Table>
                }
            </Paper>
        );
    }

    return (
        <>
            <Typography variant="h3">Ingredients</Typography>
            <Typography variant="subtitle1">
                Here lies the list of possible ingredients
            </Typography>
            <AddIngredientForm />
            {renderIngredients()}
        </>
    );

}

export default IngredientsView;