import slugify from "react-slugify";
import { db, storage } from "../config";
import { Recipe, Step } from "../modules/Recipes/models";
import { Filters } from "../store/recipes/recipesReducer";
import { DbHelper } from "./DbHelper";

export class RecipeDbHelper {
  private static async mapRecipe(
    data: firebase.firestore.DocumentSnapshot
  ): Promise<Recipe> {
    const recipe: Recipe = {
      id: data.id,
      uid: data.data().uid,
      slug: data.data().slug,
      name: data.data().name,
      description: data.data().description,
      image: data.data().image,
      type: data.data().type,
      cuisine: data.data().cuisine,
      duration: data.data().duration,
      tags: data.data().tags,
      ingredients: data.data().ingredients,
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
    console.log("do fetch");
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

  public static async getIngredients(recipeId: string): Promise<string[]> {
    const ingredients = await db
      .collection("recipes")
      .doc(recipeId)
      .collection("ingredients")
      .get();

    return ingredients.docs.map((Ingredient) => Ingredient.data().name);
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

  public static async addIngredientGroup(
    recipeId: string,
    ingredientGroup: string
  ): Promise<boolean> {
    const recipeRef = db.collection("recipes").doc(recipeId);
    const recipe = await recipeRef.get();

    if (recipe.exists) {
      const ingredientGroups = recipe.data().ingredientGroups;

      return DbHelper.arrayAddUnique(
        recipeRef,
        ingredientGroups,
        "ingredientGroups",
        ingredientGroup
      );
    }
    return Promise.resolve(true);
  }

  public static async deleteIngredientGroup(
    recipeId: string,
    groupName: string
  ): Promise<void> {
    const recipeRef = db.collection("recipes").doc(recipeId);
    const recipe = await recipeRef.get();

    if (recipe.exists) {
      const groups = recipe.data().ingredientGroups;

      return DbHelper.arrayDelete(
        recipeRef,
        groups,
        "ingredientGroups",
        groupName
      );
    }

    return Promise.resolve(null);
  }

  public static async deleteIngredientOfGroup(
    recipeId: string,
    groupName: string
  ): Promise<string[]> {
    const ingredients = await db
      .collection("recipes")
      .doc(recipeId)
      .collection("ingredients")
      .where("group", "==", groupName)
      .get();

    ingredients.docs.forEach((Ingredient) => {
      Ingredient.ref.delete();
    });

    return this.getIngredients(recipeId);
  }

  public static async deletestring(
    recipeId: string,
    IngredientId: string
  ): Promise<void> {
    return await db
      .collection("recipes")
      .doc(recipeId)
      .collection("ingredients")
      .doc(IngredientId)
      .delete();
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

  public static async addTag(recipeId: string, tag: string): Promise<string> {
    const recipeRef = db.collection("recipes").doc(recipeId);
    const recipe = await recipeRef.get();

    if (recipe.exists) {
      const tags = recipe.data().tags;

      return DbHelper.arrayAddUnique(recipeRef, tags, "tags", tag);
    }
    return Promise.resolve(null);
  }

  public static async deleteTag(recipeId: string, tag: string): Promise<void> {
    const recipeRef = db.collection("recipes").doc(recipeId);
    const recipe = await recipeRef.get();

    if (recipe.exists) {
      const tags = recipe.data().tags;

      return DbHelper.arrayDelete(recipeRef, tags, "tags", tag);
    }

    return Promise.resolve(null);
  }
}
