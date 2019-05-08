import { db } from '../../config';
import { Recipe } from './models';
import slugify from 'react-slugify';

export class recipeService {
    public static getRecipes(): Promise<Recipe[]> {
        return db.collection("recipes").get()
            .then(data => {
                let recipes: Recipe[] = [];
                data.forEach(recipe => {
                    recipes.push({
                        id: recipe.id,
                        slug: recipe.data().slug,
                        name: recipe.data().name,
                        description: recipe.data().description
                    })
                })
                return recipes;
            });
    }

    public static getRecipe(id: string): Promise<Recipe> {
        return db.collection("recipes").doc(id).get()
            .then(data => {
                const recipe: Recipe = {
                    id: data.id,
                    slug: data.data().slug,
                    name: data.data().name,
                    description: data.data().description
                }
                return recipe;
            });
    }

    public static addRecipe(name: string): Promise<Recipe> {
        const slug = slugify(name);
        const newRecipe: Recipe = {
            name,
            slug
        }

        return db.collection("recipes").add(newRecipe)
            .then(recipe => {
                return {
                    id: recipe.id,
                    name,
                    slug
                }
            });
    }
    
    public static updateRecipe(id: string, key: string, value: string): Promise<void> {
        return db.collection("recipes").doc(id).update({
            [key]: value
        })
    }

    public static deleteRecipe(id: string): Promise<void> {
        return db.collection("recipes").doc(id).delete();
    }
}