import React, { PureComponent } from 'react';
import { Button, Table } from 'reactstrap';
import { Recipe, Ingredient } from './models';
import SectionElement from '../Section/SectionElement';
import AvatarElement from '../Layout/AvatarElement';
import { getIngredientText } from './helper';

type Props = {
    recipe: Recipe;
    ingredients: Ingredient[];
    editing: boolean;
    addIngredient: (recipeId: number, name: string) => void
}

class IngredientsElement extends PureComponent<Props> {
    render() {
        const { recipe, ingredients, editing, addIngredient } = this.props;

        return (
            <SectionElement
                title="Ingredients"
                col="12"
            >
                <Table className="align-items-center table-flush" responsive>
                    <tbody>
                        {recipe.ingredientItems && recipe.ingredientItems.map((ingredientItem, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">
                                        <AvatarElement text={getIngredientText(ingredientItem)} imageUrl="../../assets/img/theme/vue.jpg" />
                                    </th>
                                    <td>
                                        {editing ?
                                            <Button onClick={() => { }}>Delete ingredient</Button>
                                            :
                                            <Button onClick={() => { }}>Add to cart</Button>
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {/* <select>
                    {ingredients.map((ingredient, index) =>
                        <option key={index}>{ingredient.name}</option>
                    )}
                </select> */}
            </SectionElement>
        );
    }
}

export default IngredientsElement;