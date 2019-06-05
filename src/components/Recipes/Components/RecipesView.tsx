import React, { Component, PureComponent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Recipe } from '../models';
import Header from '../../Layout/Header';
import { withRouter } from 'react-router-dom';
import SectionHeaderElement from '../../Layout/Section/SectionHeaderElement';
import SectionElement from '../../Layout/Section/SectionElement';
import { recipeService } from '../recipeService';
import { toast } from 'react-toastify';
import slugify from 'react-slugify';
import { TableHead, TableBody, TableRow, TableCell, Table, Button, Typography, Paper } from '@material-ui/core';

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
            });
    }

    updateRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newRecipeName: e.target.value });
    }

    handleKeyPress = (event) => {
        if (event.charCode === 13) {
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
        });

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
                });
                toast.success("Deleted!");
            });
    }

    renderRecipes() {
        const { recipes, loading, working } = this.state;

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="col">Recipes</TableCell>
                            <TableCell component="th" scope="col">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && recipes.map((recipe) =>
                            <TableRow key={recipe.id}>
                                <TableCell><Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link></TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.deleteRecipe(recipe.id)}
                                        disabled={working}
                                    >
                                        DELETE
                                </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    renderNewRecipeForm() {
        const { working } = this.state;
        const button = (
            <Button
                variant="contained"
                color="primary"
                onClick={this.addRecipe}
                disabled={working}
            >
                Create
            </Button>
        );

        return (
            <SectionElement title={"New recipe"} button={button}>
                <form onSubmit={e => { e.preventDefault(); }}>
                    <div>
                        <label htmlFor="input-recipe-name">
                            Recipe name
                        </label>
                        <input
                            id="input-recipe-name"
                            placeholder="Recipe name"
                            type="text"
                            onChange={this.updateRecipeName}
                            value={this.state.newRecipeName}
                            disabled={working}
                            onKeyPress={this.handleKeyPress}
                        />
                    </div>
                </form>
            </SectionElement>
        )
    }

    render() {
        return (
            <>
                <Header />
                <SectionHeaderElement
                    title="My recipes"
                    subtitle={"Overview"}
                >
                    <Typography variant="body2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        ultrices arcu at sagittis aliquet. Donec convallis, felis id viverra sagittis, diam libero volutpat nunc,
                        pretium orci augue sed urna. Ut in laoreet lectus, in luctus purus. Cras a quam turpis.
                        Cras scelerisque hendrerit erat. Maecenas iaculis venenatis augue, a rutrum ex.
                        Fusce vehicula urna molestie congue ultrices.
                        Suspendisse quis nulla nec risus varius pellentesque. Nullam efficitur sapien dolor,
                        uis tincidunt justo scelerisque ac. Fusce justo erat,
                        ullamcorper et justo quis, efficitur egestas tellus. Integer interdum fermentum lorem,
                        in placerat purus volutpat vitae.
                        Ut sodales cursus dolor eget molestie. Curabitur eget laoreet ligula. Aenean venenatis
                        lorem nisi, nec dignissim ipsum malesuada ac.
                        In id porta tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                </SectionHeaderElement>
                {this.renderNewRecipeForm()}
                <SectionElement>
                    {this.renderRecipes()}
                </SectionElement>
            </>
        );
    }
}

export default withRouter(RecipesView);