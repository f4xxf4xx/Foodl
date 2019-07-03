import { db } from '../config';
import { Ingredient } from '../components/Ingredients/models';

export class cartService {
    public static getCartItems(): Promise<Ingredient[]> {
        //TODO refactor for cart by owner
        return db.collection("cart")
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

    public static addItem(name: string): Promise<Ingredient> {
        const newCartItem: Ingredient = {
            name: name
        }

        return db.collection("cart").add(newCartItem)
            .then(ingredient => {
                return {
                    id: ingredient.id,
                    name
                }
            });
    }

    public static deleteItem(id: string): Promise<void> {
        return db.collection("cart").doc(id).delete();
    }

    public static deleteAllItems(): Promise<void> {
        return db.collection("cart").get()
            .then(data => {
                data.forEach(item => db.collection("cart").doc(item.id).delete())
            })
    }
}