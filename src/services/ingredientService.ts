import { db } from '../config';
import { Ingredient } from '../components/Ingredients/models';

export class ingredientService {
    public static getIngredients(): Promise<Ingredient[]> {
        return db.collection("ingredients")
        .orderBy("name")
        .get()
            .then(data => {
                let ingredients: Ingredient[] = [];
                data.forEach(ingredient => {
                    ingredients.push({
                        id: ingredient.id,
                        name: ingredient.data().name
                    })
                })
                return ingredients;
            });
    }

    public static addIngredient(name: string): Promise<Ingredient> {
        const newIngredient: Ingredient =  {
            name: name
        }

        return db.collection("ingredients").add(newIngredient)
            .then(ingredient => {
                return {
                    id: ingredient.id,
                    name
                }
            });
    }

    public static deleteIngredient(id: string): Promise<void> {
        return db.collection("ingredients").doc(id).delete();
    }
}