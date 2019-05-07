import { db } from '../../config';
import { Recipe } from './models';

export class recipeService {
    public static getRecipes(): Promise<Recipe[]> {
        return db.collection("recipes").get()
            .then(data => {
                let recipes: Recipe[] = [];
                data.forEach(dt => {
                    recipes.push({
                        id: dt.id,
                        name: dt.data().name
                    })
                })
                return recipes;
            });
    }

    public static addRecipe(name: string): Promise<Recipe> {
        const newRecipe: Recipe =  {
            name: name
        }

        return db.collection("recipes").add(newRecipe)
            .then(recipe => {
                return {
                    id: recipe.id,
                    name
                }
            });
    }

    public static deleteRecipe(id: string): Promise<void> {
        return db.collection("recipes").doc(id).delete();
    }
}