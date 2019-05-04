import React, { Component, PureComponent } from 'react';
import { Fetcher } from '../../services/Fetcher';
import { Button, Container, Row, Col, Input, FormGroup, Card, CardHeader, CardBody, Form, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Recipe } from './models';
import TopNavbar from '../Layout/TopNavbar';
import Header from '../Layout/Header';
import { withRouter } from 'react-router-dom';
import SectionHeaderElement from '../Section/SectionHeaderElement';
import SectionElement from '../Section/SectionElement';

type State = {
    recipes: Recipe[];
    loading: boolean;
    newRecipeName: string;
}

class RecipesView extends PureComponent<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            recipes: [],
            loading: true,
            newRecipeName: ""
        };

        Fetcher.get("api/Recipe/get")
            .then(data => {
                this.setState({
                    recipes: data,
                    loading: false
                });
            });
    }

    updateRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newRecipeName: e.target.value });
    }

    addRecipe = () => {
        if (this.state.newRecipeName === "") {
            return;
        }

        const newRecipeInput = {
            name: this.state.newRecipeName
        }

        Fetcher.post('api/Recipe/add', newRecipeInput)
            .then((recipeId) => {
                this.props.history.push(`/recipe/${recipeId}`);
            });
    }

    deleteRecipe = (recipeId: number) => {
        const deleteRecipeInput = {
            id: recipeId
        }

        Fetcher.delete('api/recipe/delete', deleteRecipeInput)
            .then(response =>
                this.setState({
                    recipes: this.state.recipes.filter(i => i.recipeId !== recipeId)
                })
            );
    }

    renderRecipes() {
        const { recipes } = this.state;

        return (
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Recipes</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe, index) =>
                        <tr key={index}>
                            <td><Link to={`/recipe/${recipe.recipeId}`}>{recipe.name}</Link></td>
                            <td><Button onClick={() => this.deleteRecipe(recipe.recipeId)}>DELETE</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    renderNewRecipeForm() {
        const button = (
            <Button
                color="primary"
                onClick={this.addRecipe}
                size="sm"
            >
                Create
            </Button>
        );

        return (
            <SectionElement title={"New recipe"} col="12" button={button}>
                <CardBody>
                    <Form>
                        <h6 className="heading-small text-muted mb-4">
                            Information
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Recipe name
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="input-recipe-name"
                                            placeholder="Recipe name"
                                            type="text"
                                            onChange={this.updateRecipeName}
                                            value={this.state.newRecipeName}
                                        />
                                    </FormGroup>
                                </Col>
                                {/* <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-email"
                                        >
                                            Email address
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="input-email"
                                            placeholder="jesse@example.com"
                                            type="email"
                                        />
                                    </FormGroup>
                                </Col> */}
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
                        title={"My recipes"}
                        subtitle={"Overview"}
                        col="12"
                    >
                        <p className="text-light">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            ultrices arcu at sagittis aliquet. Donec convallis, felis id viverra sagittis, diam libero volutpat nunc,
                            pretium orci augue sed urna. Ut in laoreet lectus, in luctus purus. Cras a quam turpis.
                            Cras scelerisque hendrerit erat. Maecenas iaculis venenatis augue, a rutrum ex. Fusce vehicula urna molestie congue ultrices.
                            Suspendisse quis nulla nec risus varius pellentesque. Nullam efficitur sapien dolor, quis tincidunt justo scelerisque ac. Fusce justo erat,
                            ullamcorper et justo quis, efficitur egestas tellus. Integer interdum fermentum lorem, in placerat purus volutpat vitae.
                            Ut sodales cursus dolor eget molestie. Curabitur eget laoreet ligula. Aenean venenatis lorem nisi, nec dignissim ipsum malesuada ac.
                            In id porta tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                    </SectionHeaderElement>
                    {this.renderNewRecipeForm()}
                    <SectionElement
                        col="12"
                    >
                        {!this.state.loading &&
                            this.renderRecipes()
                        }
                    </SectionElement>
                </Container>
            </>
        );
    }
}

export default withRouter(RecipesView);