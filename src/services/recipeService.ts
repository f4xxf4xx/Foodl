import slugify from "react-slugify";
import { db } from "../config";
import { Cuisine, IngredientItem, Recipe, Step } from "../modules/Recipes/models";

export class recipeService {
    public static getRecipes(uid: string): Promise<Recipe[]> {
        return db.collection("recipes")
            .where("uid", "==", uid)
            .get()
            .then((data) => {
                const recipes: Recipe[] = [];
                data.forEach((recipe) => {
                    const item: Recipe = {
                        id: recipe.id,
                        slug: recipe.data().slug,
                        name: recipe.data().name,
                        description: recipe.data().description,
                    };
                    recipes.push(item);
                });
                return recipes;
            });
    }

    public static getRecipe(id: string): Promise<Recipe> {
        return db.collection("recipes").doc(id).get()
            .then((data) => {
                const recipe: Recipe = {
                    id: data.id,
                    slug: data.data().slug,
                    name: data.data().name,
                    description: data.data().description,
                    cuisine: data.data().cuisine,
                    duration: data.data().duration,
                };
                return recipe;
            });
    }

    public static addRecipe(name: string): Promise<Recipe> {
        const slug = slugify(name);
        const newRecipe: Recipe = {
            name,
            slug,
        };

        return db.collection("recipes").add(newRecipe)
            .then((recipe) => {
                return {
                    id: recipe.id,
                    name,
                    slug,
                };
            });
    }

    public static updateRecipe(id: string, key: string, value: string): Promise<void> {
        return db.collection("recipes").doc(id).update({
            [key]: value,
        });
    }

    public static updateStepText(recipeId: string, stepId: string, text: string): Promise<void> {
        return db.collection("recipes").doc(recipeId).collection("steps").doc(stepId).update({
            text,
        });
    }

    public static deleteRecipe(id: string): Promise<void> {
        return db.collection("recipes").doc(id).delete();
    }

    public static getIngredientItems(id: string): Promise<IngredientItem[]> {
        return db.collection("recipes").doc(id).collection("ingredientItems")
            .orderBy("name")
            .get()
            .then((data) => {
                const ingredientItems: IngredientItem[] = [];
                data.forEach((ingredientItem) => {
                    const item: IngredientItem = {
                        id: ingredientItem.id,
                        name: ingredientItem.data().name,
                        quantity: ingredientItem.data().quantity,
                        type: ingredientItem.data().type,
                    };
                    ingredientItems.push(item);
                });

                return ingredientItems;
            });
    }

    public static getSteps(id: string): Promise<Step[]> {
        return db.collection("recipes").doc(id).collection("steps")
            .orderBy("order")
            .get()
            .then((data) => {
                const steps: Step[] = [];
                data.forEach((step) => {
                    const item: Step = {
                        id: step.id,
                        text: step.data().text,
                        order: step.data().order,
                    };
                    steps.push(item);
                });

                return steps;
            });
    }

    public static addIngredientItem(id: string, ingredientItem: IngredientItem): Promise<IngredientItem> {
        return db.collection("recipes").doc(id).collection("ingredientItems").add(ingredientItem)
            .then((data) => {
                return { ...ingredientItem, id: data.id };
            });
    }

    public static deleteIngredientItem(id: string, ingredientItemId: string): Promise<void> {
        return db.collection("recipes").doc(id).collection("ingredientItems").doc(ingredientItemId).delete();
    }

    public static addStep(id: string, step: Step): Promise<Step> {
        return db.collection("recipes").doc(id).collection("steps").add(step)
            .then((data) => {
                return { ...step, id: data.id };
            });
    }

    public static deleteStep(id: string, stepId: string): Promise<void> {
        return db.collection("recipes").doc(id).collection("steps").doc(stepId).delete();
    }

    public static getCuisines(): Promise<Cuisine[]> {
        return db.collection("cuisines")
            .orderBy("name")
            .get()
            .then((data) => {
                const cuisines: Cuisine[] = [];
                data.forEach((cuisine) => {
                    const item: Cuisine = {
                        id: cuisine.id,
                        name: cuisine.data().name,
                    };
                    cuisines.push(item);
                });
                return cuisines;
            });
    }

    public static addCuisine(name: string): Promise<Cuisine> {
        const newCuisine: Cuisine = {
            name,
        };

        return db.collection("cuisines").add(newCuisine)
            .then((cuisine) => {
                return {
                    id: cuisine.id,
                    name,
                };
            });
    }
}
