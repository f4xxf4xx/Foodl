import slugify from "react-slugify";
import { db } from "../config";
import { IngredientItem, Recipe, Step } from "../modules/Recipes/models";
import { Filters } from "../store/recipes/recipesReducer";

export class RecipeService {
    private static mapRecipe(data: firebase.firestore.DocumentSnapshot): Recipe {
        const recipe: Recipe = {
            id: data.id,
            uid: data.data().uid,
            slug: data.data().slug,
            name: data.data().name,
            description: data.data().description,
            type: data.data().type,
            cuisine: data.data().cuisine,
            duration: data.data().duration,
            tags: data.data().tags,
        };

        return recipe;
    }

    public static async getRecipes(uid: string, filters: Filters): Promise<Recipe[]> {
        let recipesRef = db.collection("recipes")
            .where("uid", "==", uid);

        if(filters) {
            if(filters.cuisine) {
                recipesRef = recipesRef.where("cuisine", "==", filters.cuisine);
            }
            if(filters.type) {
                recipesRef = recipesRef.where("type", "==", filters.type);
            }
        }

        const recipes = await recipesRef.get();

        return recipes.docs.map((recipe) => {
            return this.mapRecipe(recipe);
        });
    }

    public static async getRecipeById(id: string): Promise<Recipe> {
        const recipe = await db.collection("recipes").doc(id).get();

        if (!recipe.exists) {
            return null;
        }

        return this.mapRecipe(recipe);
    }

    public static async getRecipeBySlug(uid: string, slug: string): Promise<Recipe> {
        const recipes = await db.collection("recipes")
            .where("uid", "==", uid)
            .where("slug", "==", slug)
            .get();

        if (recipes.docs.length === 0) {
            return null;
        }

        const firstRecipe = recipes.docs[0];

        return this.mapRecipe(firstRecipe);
    }

    public static async addRecipe(name: string, uid: string): Promise<Recipe> {
        const slug = slugify(name);
        const newRecipe: Recipe = {
            uid,
            name,
            slug,
        };

        return await db.collection("recipes").add(newRecipe)
            .then((recipe) => {
                return {
                    id: recipe.id,
                    uid,
                    name,
                    slug
                };
            });
    }

    public static async updateRecipe(id: string, key: string, value: string): Promise<void> {
        return await db.collection("recipes").doc(id).update({
            [key]: value,
        });
    }

    public static async updateStepText(recipeId: string, stepId: string, text: string): Promise<void> {
        return await db.collection("recipes").doc(recipeId).collection("steps").doc(stepId).update({
            text,
        });
    }

    public static async deleteRecipe(id: string): Promise<void> {
        return await db.collection("recipes").doc(id).delete();
    }

    public static async getIngredientItems(id: string): Promise<IngredientItem[]> {
        const ingredientItems = await db.collection("recipes").doc(id).collection("ingredientItems")
            .get();

        return ingredientItems.docs.map((ingredientItem) => {
            return {
                id: ingredientItem.id,
                name: ingredientItem.data().name,
                quantity: ingredientItem.data().quantity,
                type: ingredientItem.data().type,
                prepType: ingredientItem.data().prepType
            };
        });
    }

    public static async getSteps(id: string): Promise<Step[]> {
        const steps = await db.collection("recipes").doc(id).collection("steps")
            .orderBy("order")
            .get();

        return steps.docs.map((step) => {
            return {
                id: step.id,
                text: step.data().text,
                order: step.data().order,
            };
        });
    }

    public static async addIngredientItem(id: string, ingredientItem: IngredientItem): Promise<IngredientItem> {
        return await db.collection("recipes").doc(id).collection("ingredientItems").add(ingredientItem)
            .then((data) => {
                return { ...ingredientItem, id: data.id };
            });
    }

    public static async deleteIngredientItem(id: string, ingredientItemId: string): Promise<void> {
        return await db.collection("recipes").doc(id).collection("ingredientItems").doc(ingredientItemId).delete();
    }

    public static async addStep(id: string, step: Step): Promise<Step> {
        return await db.collection("recipes").doc(id).collection("steps").add(step)
            .then((data) => {
                return { ...step, id: data.id };
            });
    }

    public static async deleteStep(id: string, stepId: string): Promise<void> {
        return await db.collection("recipes").doc(id).collection("steps").doc(stepId).delete();
    }

    public static async addTag(recipeId: string, tag: string): Promise<string> {
        const recipeRef = db.collection("recipes").doc(recipeId);
        const recipe = await recipeRef.get();

        if (recipe.exists) {
            const tags = recipe.data().tags;

            if (tags) {
                if (tags.includes(tag)) {
                    return null;
                }
                tags.push(tag);
                await recipeRef.update({ tags });
            } else {
                await recipeRef.update({ tags: [tag] });
            }
        }
        else {
            return Promise.resolve(null);
        }
        return Promise.resolve(tag);
    }

    public static async deleteTag(recipeId: string, tagName: string): Promise<void> {
        const recipeRef = db.collection("recipes").doc(recipeId);
        const recipe = await recipeRef.get();

        if (recipe.exists) {
            const tags = recipe.data().tags;
            const filteredTags = tags.filter((tag) => tag !== tagName);

            return await recipeRef.update({ tags: filteredTags });
        }

        return Promise.resolve(null);
    }
}
