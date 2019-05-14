import React, { PureComponent } from 'react';
import { withRouter, RouteProps } from 'react-router-dom';
import { Table, Button, Container, Input, CardBody, Form, Row, Col, FormGroup } from 'reactstrap';
import TopNavbar from '../Layout/TopNavbar';
import Header from '../Layout/Header';
import SectionHeaderElement from '../Section/SectionHeaderElement';
import SectionElement from '../Section/SectionElement';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { compose, bindActionCreators, Dispatch } from 'redux';
import * as ingredientActions from './ingredientActions';
import { Ingredient } from './models';
import { IngredientState } from './ingredientReducer';
import { ingredientService } from './ingredientService';

type State = {
    newIngredientName: string;
}

type StateProps = {
    ingredients: Ingredient[];
    loading: boolean;
}

type DispatchProps = {
    beginFetch: typeof ingredientActions.beginFetch;
    fetchIngredientsSuccess: typeof ingredientActions.fetchIngredientsSuccess;
    fetchIngredientsFailure: typeof ingredientActions.fetchIngredientsFailure;
    deleteIngredientSuccess: typeof ingredientActions.deleteIngredientSuccess;
}

type Props = StateProps & DispatchProps & RouteProps;

class IngredientsViewBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newIngredientName: ""
        };
    }

    componentDidMount() {
        this.props.beginFetch();
        return ingredientService.getIngredients()
            .then(ingredients => {
                this.props.fetchIngredientsSuccess(ingredients)
            })
            .catch(error => {
                this.props.fetchIngredientsFailure(error)
            });
    }

    addIngredient = () => {
        const { newIngredientName } = this.state;
        const { ingredients } = this.props;
        if (newIngredientName === "") {
            return;
        }
        this.setState({
            newIngredientName: ""
        })

        // ingredientService.addIngredient(newIngredientName)
        //     .then(ingredient => {

        //         this.setState({
        //             ingredients: [...ingredients, ingredient],
        //             working: false
        //         })
        //         toast.success("Added!");
        //     });
    }

    handleKeyPress = (event) => {
        if (event.charCode == 13) {
            this.addIngredient();
        }
    }

    renderIngredients() {
        const { ingredients, loading } = this.props;

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
                                    disabled={loading}
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
        this.props.beginFetch();
        ingredientService.deleteIngredient(ingredientId)
            .then(() => {
                this.props.deleteIngredientSuccess(ingredientId);
                toast.success("Deleted!");
            })
    }

    renderNewIngredientForm() {
        const { loading } = this.props;
        const button = (
            <Button
                color="primary"
                onClick={this.addIngredient}
                size="sm"
                disabled={loading}
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
        const { loading } = this.props;
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
                        {!loading && this.renderIngredients()}
                    </SectionElement>
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        ingredients: state.ingredients.ingredients,
        loading: state.ingredients.loading
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        beginFetch: bindActionCreators(ingredientActions.beginFetch, dispatch),
        fetchIngredientsSuccess: bindActionCreators(ingredientActions.fetchIngredientsSuccess, dispatch),
        fetchIngredientsFailure: bindActionCreators(ingredientActions.fetchIngredientsFailure, dispatch),
        deleteIngredientSuccess: bindActionCreators(ingredientActions.deleteIngredientSuccess, dispatch)
    }
}

const IngredientsView = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(IngredientsViewBase)

export default IngredientsView;