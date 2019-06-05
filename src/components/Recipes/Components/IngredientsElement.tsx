import React, { PureComponent } from 'react';
import { Recipe, IngredientItem } from '../models';
import SectionElement from '../../Section/SectionElement';
import { getIngredientText, getIngredientTypeOptions } from '../helper';
import { Ingredient } from '../../Ingredients/models';
import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';
import { Table, TableBody, Divider, TableRow, TableCell, Button, Typography, Avatar } from '@material-ui/core';

type Props = {
    ingredients: Ingredient[];
    ingredientItems: IngredientItem[];
    editing: boolean;
    addIngredient: (newIngredientItem: IngredientItem) => void;
    deleteIngredient: (ingredientItemId: string) => void;
}

type State = {
    newIngredientItem: IngredientItem;
    currentSelectIngredient: any;
    currentSelectType: any;
}

class IngredientsElement extends PureComponent<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            newIngredientItem: {
                name: "",
                quantity: "",
                type: ""
            },
            currentSelectIngredient: null,
            currentSelectType: null
        };
    }

    updateFormName = (e: any) => {
        const { newIngredientItem } = this.state;
        this.setState({
            newIngredientItem: { ...newIngredientItem, name: e.label },
            currentSelectIngredient: e
        });
    }

    updateFormQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { newIngredientItem } = this.state;
        this.setState({ newIngredientItem: { ...newIngredientItem, quantity: e.target.value } });
    }

    updateFormType = (e: any) => {
        const { newIngredientItem } = this.state;
        this.setState({
            newIngredientItem: { ...newIngredientItem, type: e.value },
            currentSelectType: e
        });
    }

    addIngredient = () => {
        const { addIngredient } = this.props;
        const { newIngredientItem } = this.state;

        addIngredient(newIngredientItem);
        this.setState({
            newIngredientItem: {
                ...newIngredientItem, name: "",
                quantity: "", type: ""
            },
            currentSelectIngredient: null,
            currentSelectType: null
        })
    }

    render() {
        const { ingredientItems, editing, ingredients, deleteIngredient } = this.props;
        const { newIngredientItem, currentSelectIngredient, currentSelectType } = this.state;

        const ingredientOptions = ingredients.map(ingredient => {
            return {
                value: ingredient.id,
                label: ingredient.name
            }
        })

        return (
            <SectionElement title="Ingredients">
                <Table>
                    <TableBody>
                        {ingredientItems && ingredientItems.map((ingredientItem, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        <Avatar
                                            alt={getIngredientText(ingredientItem)}
                                            src="../../assets/img/theme/vue.jpg"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {editing ?
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => { deleteIngredient(ingredientItem.id) }}
                                            >
                                                Delete ingredient
                                            </Button>
                                            :
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => { }}
                                            >
                                                Add to cart
                                            </Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <Divider />
                {editing &&
                    <form onSubmit={e => { e.preventDefault(); }}>
                        <Typography variant="h6">
                            Add ingredient
                        </Typography>
                        <div>
                            <label htmlFor="input-ingredient">
                                Ingredient
                            </label>
                            <Creatable
                                id="input-ingredient"
                                options={ingredientOptions}
                                value={currentSelectIngredient}
                                onChange={this.updateFormName}
                            />
                            <label htmlFor="input-quantity">
                                Quantity
                            </label>
                            <input
                                id="input-quantity"
                                placeholder="Quantity"
                                type="text"
                                value={newIngredientItem.quantity}
                                onChange={this.updateFormQuantity}
                            />
                            <label htmlFor="input-type">
                                Type
                            </label>
                            <Select
                                id="input-type"
                                options={getIngredientTypeOptions()}
                                value={currentSelectType}
                                onChange={this.updateFormType}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.addIngredient}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                }
            </SectionElement>
        );
    }
}

export default IngredientsElement;