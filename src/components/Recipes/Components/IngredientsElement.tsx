import React, { PureComponent } from 'react';
import { Recipe, IngredientItem } from '../models';
import { getIngredientText } from '../helper';
import { Table, TableBody, Divider, TableRow, TableCell, Button, Typography, Paper } from '@material-ui/core';
import * as recipeActions from '../recipeActions';
import { recipeService } from '../recipeService';
import { toast } from 'react-toastify';
import AddIngredientItemForm from './AddIngredientItemForm';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Loader } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';

interface OwnProps {
    editing: boolean;
    id: string;
}

type StateProps = {
    ingredientItems: IngredientItem[];
    loadingIngredientItems: boolean;
}

type DispatchProps = {
    fetchIngredientItemsStart: typeof recipeActions.fetchIngredientItemsStart;
    fetchIngredientItemsStop: typeof recipeActions.fetchIngredientItemsStop;
    updateIngredientItemsStart: typeof recipeActions.updateIngredientItemsStart;
    updateIngredientItemsStop: typeof recipeActions.updateIngredientItemsStop;
    updateIngredientItems: typeof recipeActions.updateIngredientItems;
    deleteIngredientItem: typeof recipeActions.deleteIngredientItem;
}

type Props = OwnProps & StateProps & RouteComponentProps & DispatchProps;

class IngredientsElementBase extends PureComponent<Props> {
    componentDidMount() {
        const { id } = this.props;

        if (this.props.ingredientItems.length == 0) {
            this.props.fetchIngredientItemsStart()
            recipeService.getIngredientItems(id)
                .then((ingredientItems) => {
                    if (ingredientItems.length > 0) {
                        this.props.updateIngredientItems(ingredientItems);
                    }
                    this.props.fetchIngredientItemsStop();
                })
                .catch(() => {
                    this.props.fetchIngredientItemsStop();
                    toast.error("Error fetching the ingredient items!");
                })
        }
    }

    deleteIngredientItem = (ingredientItemId: string) => {
        const { id } = this.props;

        this.props.updateIngredientItemsStart();
        recipeService.deleteIngredientItem(id, ingredientItemId)
            .then(() => {
                this.props.deleteIngredientItem(id);
                this.props.updateIngredientItemsStop();
                toast.success("Deleted!");
            })
            .catch(() => {
                this.props.updateIngredientItemsStop();
                toast.error("Error deleting the ingredient item!");
            });
    }

    render() {
        const { ingredientItems, editing, loadingIngredientItems } = this.props;

        return (
            <>
                <Typography variant="h5">Ingredients</Typography>
                <Paper>
                    {loadingIngredientItems ?
                        <Loader active inline='centered' />
                        :
                        <Table>
                            <TableBody>
                                {ingredientItems.map((ingredientItem, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                <Typography>
                                                    {getIngredientText(ingredientItem)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {editing ?
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => this.deleteIngredientItem(ingredientItem.id)}
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
                                })
                                }
                            </TableBody>
                        </Table>
                    }
                </Paper>
                <Divider />
                <AddIngredientItemForm editing={editing} />
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        ingredientItems: state.recipe.ingredientItems,
        loadingIngredientItems: state.recipe.loadingIngredientItems
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchIngredientItemsStart: bindActionCreators(recipeActions.fetchIngredientItemsStart, dispatch),
        fetchIngredientItemsStop: bindActionCreators(recipeActions.fetchIngredientItemsStop, dispatch),
        updateIngredientItemsStart: bindActionCreators(recipeActions.updateIngredientItemsStart, dispatch),
        updateIngredientItemsStop: bindActionCreators(recipeActions.updateIngredientItemsStop, dispatch),
        updateIngredientItems: bindActionCreators(recipeActions.updateIngredientItems, dispatch),
        deleteIngredientItem: bindActionCreators(recipeActions.deleteIngredientItem, dispatch),
    };
};

const IngredientsElement = compose(
    connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)
)(IngredientsElementBase);

export default IngredientsElement;