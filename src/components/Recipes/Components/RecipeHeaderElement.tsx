import React from "react";
import { Recipe, IngredientItem } from "../models";
import Statistic from "../../Layout/Statistic";

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
                            <input defaultValue={recipe.name} onBlur={this.updateRecipe("name")} />
                            :
                            <h2>{recipe.name}</h2>
                        }
                    </div>
                    <div>
                        <a onClick={toggleEdit}>
                            {editing ? "Stop editing" : "Edit"}
                        </a>
                    </div>
                    <div>
                    {editing ?
                        <input
                            defaultValue={recipe.description}
                            type="textarea"
                            onBlur={this.updateRecipe("description")}
                        />
                        :
                        <p>
                            {recipe.description}
                        </p>
                    }
                    {this.renderStatistics()}
                    </div>
                </>
                : null
        );
    }
}

export default RecipeHeaderElement;
