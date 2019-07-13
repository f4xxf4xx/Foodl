import { db } from "../config";
import { Ingredient } from "../modules/Ingredients/models";

export class IngredientService {
    public static async getIngredients(): Promise<Ingredient[]> {
        const ingredients = await db.collection("ingredients")
            .orderBy("name")
            .get();

        return ingredients.docs.map((ingredient) => {
            return {
                id: ingredient.id,
                name: ingredient.data().name,
            };
        });
    }

    public static async addIngredient(name: string): Promise<Ingredient> {
        const newIngredient: Ingredient = {
            name,
        };

        const ingredient = await db.collection("ingredients").where("name", "==", name).get();
        if (!ingredient.empty) {
            return {
                id: ingredient.docs[0].id,
                name,
            };
        }

        const addedIngredient = await db.collection("ingredients").add(newIngredient);
        return {
            id: addedIngredient.id,
            name,
        };
    }

    public static deleteIngredient(id: string): Promise<void> {
        return db.collection("ingredients").doc(id).delete();
    }
}
