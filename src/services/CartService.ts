import { db } from "../config";
import { Ingredient } from "../modules/Ingredients/models";

export class CartService {
    public static async getCartItems(userid: string): Promise<Ingredient[]> {
        const cart = await db.collection("carts").doc(userid).get();

        if (cart.exists) {
            return CartService.getItems(cart);
        }
        else {
            return [];
        }
    }

    private static getItems(data: firebase.firestore.DocumentSnapshot) {
        const items = data.data().items;
        const ingredients: Ingredient[] = items.map((ingredient) => {
            return {
                name: ingredient,
            };
        });

        return ingredients;
    }

    public static async addItem(userid: string, name: string): Promise<Ingredient> {
        const cartRef = db.collection("carts").doc(userid);
        const cart = await cartRef.get();

        if (cart.exists) {
            const items = cart.data().items;

            if (items.includes(name)) {
                return null;
            }
            items.push(name);
            await cartRef.set({ items });
        }
        else {
            await cartRef.set({ items: [name] });
        }
        return {
            name,
        };
    }

    public static async deleteItem(userid: string, name: string): Promise<void> {
        const cartRef = db.collection("carts").doc(userid);
        const cart = await cartRef.get();

        if (cart.exists) {
            const items = cart.data().items;
            const newItems = items.filter((item) => item !== name);

            return await cartRef.set({ items: newItems });
        }

        return Promise.resolve(null);
    }

    public static deleteAllItems(userid: string): Promise<void> {
        return db.collection("carts").doc(userid).set({ items: [] });
    }
}
