import { db } from '../../config';
import { Recipe, IngredientItem, Step } from './models';
import slugify from 'react-slugify';

export class recipeService {
    public static getRecipes(): Promise<Recipe[]> {
        return db.collection("recipes").get()
            .then(data => {
                let recipes: Recipe[] = [];
                data.forEach(recipe => {
                    const item: Recipe = {
                        id: recipe.id,
                        slug: recipe.data().slug,
                        name: recipe.data().name,
                        description: recipe.data().description
                    }
                    recipes.push(item)
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

    public static getIngredientItems(id: string): Promise<IngredientItem[]> {
        return db.collection("recipes").doc(id).collection("ingredientItems").get()
            .then(data => {
                let ingredientItems: IngredientItem[] = [];
                data.forEach(ingredientItem => {
                    const item: IngredientItem = {
                        id: ingredientItem.id,
                        name: ingredientItem.data().name,
                        quantity: ingredientItem.data().quantity,
                        type: ingredientItem.data().type
                    }
                    ingredientItems.push(item);
                })

                return ingredientItems;
            })
    }

    public static getSteps(id: string): Promise<Step[]> {
        return db.collection("recipes").doc(id).collection("steps")
            .orderBy("order")
            .get()
            .then(data => {
                let steps: Step[] = [];
                data.forEach(step => {
                    const item: Step = {
                        id: step.id,
                        text: step.data().text,
                        order: step.data().order
                    }
                    steps.push(item);
                })

                return steps;
            })
    }

    public static addIngredientItem(id: string, ingredientItem: IngredientItem): Promise<IngredientItem> {
        return db.collection("recipes").doc(id).collection("ingredientItems").add(ingredientItem)
            .then(() => ingredientItem)
    }

    public static deleteIngredientItem(id: string, ingredientItemId: string): Promise<void> {
        return db.collection("recipes").doc(id).collection("ingredientItems").doc(ingredientItemId).delete();
    }

    public static addStep(id: string, step: Step): Promise<Step> {
        return db.collection("recipes").doc(id).collection("steps").add(step)
            .then(() => step)
    }

    public static deleteStep(id: string, stepId: string): Promise<void> {
        return db.collection("recipes").doc(id).collection("steps").doc(stepId).delete();
    }
}