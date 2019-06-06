import React from "react";
import { Recipe, IngredientItem } from "../models";
import Statistic from "../../Layout/Statistic";
import { Typography, Button, TextField } from "@material-ui/core";

type Props = {
    recipe: Recipe;
    ingredientItems: IngredientItem[];
    editing: boolean;
    updateRecipe: (key: string, value: string) => void;
    toggleEdit: () => void;
}

class RecipeHeaderElement
    extends React.Component<Props> {
    updateRecipe = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { updateRecipe } = this.props;
        updateRecipe(key, e.currentTarget.value);
    }

    renderStatistics() {
        const { recipe, ingredientItems } = this.props;

        return (
            recipe &&
            <>
                {recipe.recipeType &&
                    <Statistic
                        name={"Type"}
                        value={recipe.recipeType}
                        icon={"fa-th-large"}
                    />
                }
                {recipe.duration &&
                    <Statistic
                        name={"Duration"}
                        value={recipe.duration.toString()}
                        icon={"fa-clock"}
                    />
                }
                {ingredientItems &&
                    <Statistic
                        name={"Ingredient number"}
                        value={ingredientItems.length.toString()}
                        icon={"fa-apple-alt"}
                    />
                }
            </>

        )
    }

    render() {
        const { recipe, editing, toggleEdit } = this.props;

        return (
            recipe ?
                <>
                    <div>
                        {editing ?
                            <TextField defaultValue={recipe.name} onBlur={this.updateRecipe("name")} />
                            :
                            <Typography variant="h3">{recipe.name}</Typography>
                        }
                    </div>
                    <div>
                        <Button variant="contained" color="primary" onClick={toggleEdit}>
                            {editing ? "Stop editing" : "Edit"}
                        </Button>
                    </div>
                    <div>
                        {editing ?
                            <TextField
                                defaultValue={recipe.description}
                                multiline
                                onBlur={this.updateRecipe("description")}
                            />
                            :
                            <Typography>
                                {recipe.description}
                            </Typography>
                        }
                    </div>
                    <div>
                        {this.renderStatistics()}
                    </div>
                </>
                : null
        );
    }
}

export default RecipeHeaderElement;
