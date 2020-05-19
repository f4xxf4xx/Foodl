import slugify from "react-slugify";
import { db, storage } from "../config";
import { Recipe, Step, IngredientGroup } from "../modules/Recipes/models";
import { Filters } from "../store/recipes/recipesReducer";
import { DbHelper } from "./DbHelper";

export class RecipeDbHelper {
  private static async mapRecipe(
    data: firebase.firestore.DocumentSnapshot
  ): Promise<Recipe> {
    const recipeData = data.data();
    const recipe: Recipe = {
      id: data.id,
      uid: recipeData.uid,
      slug: recipeData.slug,
      name: recipeData.name,
      description: recipeData.description,
      image: recipeData.image,
      type: recipeData.type,
      cuisine: recipeData.cuisine,
      duration: recipeData.duration,
      tags: recipeData.tags,
      ingredients: recipeData.ingredients,
      notes: recipeData.notes,
    };

    if (recipe.image) {
      const storageRef = storage.ref();
      const recipesRef = storageRef.child("recipes").child(recipe.image);
      try {
        recipe.imageFullPath = await recipesRef.getDownloadURL();
      } catch (error) {}
    }

    return recipe;
  }

  public static async getRecipes(
    uid: string,
    filters: Filters
  ): Promise<Recipe[]> {
    let recipesRef = db.collection("recipes").where("uid", "==", uid);

    if (filters) {
      if (filters.cuisine) {
        recipesRef = recipesRef.where("cuisine", "==", filters.cuisine);
      }
      if (filters.type) {
        recipesRef = recipesRef.where("type", "==", filters.type);
      }
    }

    const recipes = await recipesRef.get();

    const mappedRecipes = recipes.docs.map(async (recipe) => {
      return await this.mapRecipe(recipe);
    });

    return Promise.all(mappedRecipes);
  }

  public static async getRecipeById(recipeId: string): Promise<Recipe> {
    const recipe = await db.collection("recipes").doc(recipeId).get();

    if (!recipe.exists) {
      return null;
    }

    return this.mapRecipe(recipe);
  }

  public static async getRecipeBySlug(
    uid: string,
    slug: string
  ): Promise<Recipe> {
    const recipes = await db
      .collection("recipes")
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

    return await db
      .collection("recipes")
      .add(newRecipe)
      .then((recipe) => {
        return {
          id: recipe.id,
          uid,
          name,
          slug,
        };
      });
  }

  public static async updateRecipe(
    recipeId: string,
    key: string,
    value: string
  ): Promise<void> {
    return await db
      .collection("recipes")
      .doc(recipeId)
      .update({
        [key]: value,
      });
  }

  public static async updateStepText(
    recipeId: string,
    stepId: string,
    text: string
  ): Promise<void> {
    return await db
      .collection("recipes")
      .doc(recipeId)
      .collection("steps")
      .doc(stepId)
      .update({
        text,
      });
  }

  public static async deleteRecipe(recipeId: string): Promise<void> {
    return await db.collection("recipes").doc(recipeId).delete();
  }

  public static async getIngredientGroups(
    recipeId: string
  ): Promise<IngredientGroup[]> {
    const ingredientGroups = await db
      .collection("recipes")
      .doc(recipeId)
      .collection("ingredientGroups")
      .get();

    return ingredientGroups.docs.map((ingredientGroup) => ({
      id: ingredientGroup.id,
      name: ingredientGroup.data().name,
      items: ingredientGroup.data().items,
    }));
  }

  public static async getSteps(recipeId: string): Promise<Step[]> {
    const steps = await db
      .collection("recipes")
      .doc(recipeId)
      .collection("steps")
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

  public static async addStep(recipeId: string, step: Step): Promise<Step> {
    return await db
      .collection("recipes")
      .doc(recipeId)
      .collection("steps")
      .add(step)
      .then((data) => {
        return { ...step, id: data.id };
      });
  }

  public static async deleteStep(
    recipeId: string,
    stepId: string
  ): Promise<void> {
    return await db
      .collection("recipes")
      .doc(recipeId)
      .collection("steps")
      .doc(stepId)
      .delete();
  }

  public static async addTag(recipeId: string, tag: string): Promise<string[]> {
    const recipeRef = db.collection("recipes").doc(recipeId);
    const recipe = await recipeRef.get();

    if (recipe.exists) {
      return DbHelper.arrayAddUnique(recipeRef, "tags", tag);
    }
    return Promise.resolve(null);
  }

  public static async deleteTag(
    recipeId: string,
    tag: string
  ): Promise<string[]> {
    const recipeRef = db.collection("recipes").doc(recipeId);
    const recipe = await recipeRef.get();

    if (recipe.exists) {
      return DbHelper.arrayDelete(recipeRef, "tags", tag);
    }

    return Promise.resolve(null);
  }

  public static async addIngredient(
    recipeId: string,
    ingredient: string
  ): Promise<boolean> {
    const recipeRef = db.collection("recipes").doc(recipeId);
    const recipe = await recipeRef.get();

    if (recipe.exists) {
      return DbHelper.arrayPushUnique(recipeRef, "ingredients", ingredient);
    }
    return Promise.resolve(false);
  }

  public static async deleteIngredient(
    recipeId: string,
    ingredient: string
  ): Promise<string[]> {
    const recipeRef = db.collection("recipes").doc(recipeId);
    const recipe = await recipeRef.get();

    if (recipe.exists) {
      return DbHelper.arrayDelete(recipeRef, "ingredients", ingredient);
    }

    return Promise.resolve(null);
  }

  public static async deleteIngredientGroupItem(
    recipeId: string,
    ingredientGroupId: string,
    ingredient: string
  ): Promise<string[]> {
    const ingredientGroupRef = db
      .collection("recipes")
      .doc(recipeId)
      .collection("ingredientGroups")
      .doc(ingredientGroupId);
    const ingredientGroup = await ingredientGroupRef.get();

    if (ingredientGroup.exists) {
      return DbHelper.arrayDelete(ingredientGroupRef, "items", ingredient);
    }

    return Promise.resolve(null);
  }

  public static async addIngredientGroupItem(
    recipeId: string,
    groupId: string,
    ingredient: string
  ): Promise<string[]> {
    const ingredientGroupRef = db
      .collection("recipes")
      .doc(recipeId)
      .collection("ingredientGroups")
      .doc(groupId);
    const ingredientGroup = await ingredientGroupRef.get();

    if (ingredientGroup.exists) {
      return await DbHelper.arrayAddUnique(
        ingredientGroupRef,
        "items",
        ingredient
      );
    }
    return Promise.resolve(null);
  }
}
