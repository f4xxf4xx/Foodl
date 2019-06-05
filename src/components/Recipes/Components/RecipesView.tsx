import React, { Component, PureComponent } from 'react';
import { Button, Container, Row, Col, Input, FormGroup, Card, CardHeader, CardBody, Form, Table } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Recipe } from '../models';
import TopNavbar from '../../Layout/TopNavbar';
import Header from '../../Layout/Header';
import { withRouter } from 'react-router-dom';
import SectionHeaderElement from '../../Section/SectionHeaderElement';
import SectionElement from '../../Section/SectionElement';
import { recipeService } from '../recipeService';
import { toast } from 'react-toastify';
import slugify from 'react-slugify';

type State = {
    recipes: Recipe[];
    loading: boolean;
    working: boolean;
    newRecipeName: string;
}

type Props = RouteComponentProps;

class RecipesView extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            recipes: [],
            loading: true,
            working: false,
            newRecipeName: ""
        };
    }

    componentDidMount() {
        recipeService.getRecipes()
            .then((recipes) => {
                this.setState({
                    recipes,
                    loading: false
                });
            })
    }

    updateRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newRecipeName: e.target.value });
    }

    handleKeyPress = (event) => {
        if (event.charCode == 13) {
            this.addRecipe();
        }
    }

    addRecipe = () => {
        const { newRecipeName, recipes } = this.state;
        if (newRecipeName === "") {
            return;
        }
        this.setState({
            working: true
        })

        recipeService.addRecipe(newRecipeName)
            .then(recipe => {
                this.setState({
                    recipes: [...recipes, recipe],
                    newRecipeName: "",
                    working: false
                })
                this.props.history.push(`/recipe/${recipe.id}`);
            });
    }

    deleteRecipe(recipeId: any): any {
        const { recipes } = this.state;
        this.setState({ working: true })
        recipeService.deleteRecipe(recipeId)
            .then(() => {
                this.setState({
                    recipes: recipes.filter(i => i.id !== recipeId),
                    working: false
                })
                toast.success("Deleted!");
            })
    }

    renderRecipes() {
        const { recipes, loading, working } = this.state;

        return (
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Recipes</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading && recipes.map((recipe) =>
                        <tr key={recipe.id}>
                            <td><Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link></td>
                            <td><Button onClick={() => this.deleteRecipe(recipe.id)} disabled={working}>DELETE</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    renderNewRecipeForm() {
        const { working } = this.state;
        const button = (
            <Button
                color="primary"
                onClick={this.addRecipe}
                size="sm"
                disabled={working}
            >
                Create
            </Button>
        );

        return (
            <SectionElement title={"New recipe"} col="12" button={button}>
                <CardBody>
                    <Form onSubmit={e => { e.preventDefault(); }}>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-recipe-name"
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
                                            disabled={working}
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
                        title="My recipes"
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
                        marginTop="3"
                    >
                        {this.renderRecipes()}
                    </SectionElement>
                </Container>
            </>
        );
    }
}

export default withRouter(RecipesView);