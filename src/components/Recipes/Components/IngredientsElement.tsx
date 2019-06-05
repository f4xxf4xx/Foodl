import React, { PureComponent } from 'react';
import { Button, Table, Form, Row, Col, FormGroup, Input, CardBody } from 'reactstrap';
import { Recipe, IngredientItem } from '../models';
import SectionElement from '../../Section/SectionElement';
import AvatarElement from '../../Layout/AvatarElement';
import { getIngredientText, getIngredientTypeOptions } from '../helper';
import { Ingredient } from '../../Ingredients/models';
import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';

type Props = {
    ingredients: Ingredient[];
    ingredientItems: IngredientItem[];
    editing: boolean;
    addIngredient: (newIngredientItem: IngredientItem) => void
    deleteIngredient: (ingredientItemId: string) => void
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
            <SectionElement
                title="Ingredients"
                col="12"
            >
                <CardBody>
                    <Table className="align-items-center table-flush" responsive>
                        <tbody>
                            {ingredientItems && ingredientItems.map((ingredientItem, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">
                                            <AvatarElement text={getIngredientText(ingredientItem)} imageUrl="../../assets/img/theme/vue.jpg" />
                                        </th>
                                        <td>
                                            {editing ?
                                                <Button onClick={() => { deleteIngredient(ingredientItem.id) }}>Delete ingredient</Button>
                                                :
                                                <Button onClick={() => { }}>Add to cart</Button>
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <hr className="my-4" />
                    {editing &&
                        <Form onSubmit={e => { e.preventDefault(); }}>
                            <h6 className="heading-small text-muted mb-4">
                                Add ingredient
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-ingredient"
                                            >
                                                Ingredient
                                        </label>
                                            <Creatable
                                                id="input-ingredient"
                                                options={ingredientOptions}
                                                value={currentSelectIngredient}
                                                onChange={this.updateFormName}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-quantity"
                                            >
                                                Quantity
                                        </label>
                                            <Input
                                                id="input-quantity"
                                                placeholder="Quantity"
                                                type="text"
                                                value={newIngredientItem.quantity}
                                                onChange={this.updateFormQuantity}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-type"
                                            >
                                                Type
                                        </label>
                                            <Select
                                                id="input-type"
                                                options={getIngredientTypeOptions()}
                                                value={currentSelectType}
                                                onChange={this.updateFormType}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Button
                                                color="primary"
                                                onClick={this.addIngredient}
                                            >
                                                Add
                                            </Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    }
                </CardBody>
            </SectionElement>
        );
    }
}

export default IngredientsElement;