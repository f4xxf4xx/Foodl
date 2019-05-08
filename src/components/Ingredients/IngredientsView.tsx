import React, { PureComponent, RefObject, createRef } from 'react';
import { Ingredient } from './models';
import { withRouter } from 'react-router-dom';
import { ingredientService } from './ingredientService';
import { Table, Button, Container, Input, CardBody, Form, Row, Col, FormGroup } from 'reactstrap';
import TopNavbar from '../Layout/TopNavbar';
import Header from '../Layout/Header';
import SectionHeaderElement from '../Section/SectionHeaderElement';
import SectionElement from '../Section/SectionElement';
import { toast } from 'react-toastify';

type State = {
    ingredients: Ingredient[];
    loading: boolean;
    working: boolean;
    newIngredientName: string;
}

class IngredientsView extends PureComponent<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            ingredients: [],
            loading: true,
            working: false,
            newIngredientName: ""
        };
    }

    componentDidMount() {
        ingredientService.getIngredients()
            .then(ingredients => {
                this.setState({
                    ingredients,
                    loading: false
                });
            });
    }

    addIngredient = () => {
        const { newIngredientName, ingredients } = this.state;
        if (newIngredientName === "") {
            return;
        }
        this.setState({
            working: true,
            newIngredientName: ""
        })

        ingredientService.addIngredient(newIngredientName)
            .then(ingredient => {
                this.setState({
                    ingredients: [...ingredients, ingredient],                    
                    working: false
                })
                toast.success("Added!");
            });
    }

    handleKeyPress = (event) => {
        if (event.charCode == 13) {
            this.addIngredient();
        }
    }

    renderIngredients() {
        const { ingredients, working } = this.state;

        return (
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Ingredients</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((ingredient) =>
                        <tr key={ingredient.id}>
                            <td>{ingredient.name}</td>
                            <td>
                                <Button
                                    disabled={working}
                                    onClick={() => this.deleteIngredient(ingredient.id)}>
                                    DELETE
                            </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    updateIngredientName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newIngredientName: e.target.value });
    }

    deleteIngredient(ingredientId: string): void {
        const { ingredients } = this.state;
        this.setState({ working: true })
        ingredientService.deleteIngredient(ingredientId)
            .then(() => {
                this.setState({
                    ingredients: ingredients.filter(i => i.id !== ingredientId),
                    working: false
                })
                toast.success("Deleted!");
            })
    }

    renderNewIngredientForm() {
        const { working } = this.state;
        const button = (
            <Button
                color="primary"
                onClick={this.addIngredient}
                size="sm"
                disabled={working}
            >
                Add
            </Button>
        );

        return (
            <SectionElement title={"New ingredient"} col="12" button={button}>
                <CardBody>
                    <Form onSubmit={e => { e.preventDefault(); }}>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-ingredient-name"
                                        >
                                            Ingredient name
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="input-ingredient-name"
                                            placeholder="Ingredient name"
                                            type="text"
                                            onChange={this.updateIngredientName}
                                            value={this.state.newIngredientName}
                                            onKeyPress={this.handleKeyPress}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </CardBody>
            </SectionElement>
        )
    }

    render() {
        return (
            <>
                <TopNavbar />
                <Header />
                <Container className="mt--7" fluid>
                    <SectionHeaderElement
                        title="Ingredients"
                        col="12"
                    >
                        <p className="text-light">
                            Here lies the list of possible ingredients
                        </p>
                    </SectionHeaderElement>
                    {this.renderNewIngredientForm()}
                    <SectionElement
                        col="12"
                    >
                        {!this.state.loading &&
                            this.renderIngredients()
                        }
                    </SectionElement>
                </Container>
            </>
        );
    }
}

export default withRouter(IngredientsView);