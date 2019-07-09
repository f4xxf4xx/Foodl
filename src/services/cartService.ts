import { db } from '../config';
import { Ingredient } from '../modules/Ingredients/models';

export class cartService {
    public static async getCartItems(userid: string): Promise<Ingredient[]> {
        let cart = await db.collection("carts").doc(userid).get();
        if (cart.exists) {
            return cartService.getItems(cart);
        }
        else {
            return [];
        }
    }

    static getItems(data: firebase.firestore.DocumentSnapshot) {
        const items = data.data().items;

        let ingredients: Ingredient[] = [];
        items.forEach(ingredient => {
            ingredients.push({
                name: ingredient
            })
        })
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
        } else {
            await cartRef.set({ items: [name] });
        }
        return {
            name
        }
    }

    public static async deleteItem(userid: string, name: string): Promise<void> {
        const cartRef = db.collection("carts").doc(userid);
        const cart = await cartRef.get();
        
        if (cart.exists) {
            const items = cart.data().items;
            const newItems = items.filter(item => item !== name);
            return await cartRef.set({ items: newItems })
        }
        
        return Promise.resolve(null);
    }

    public static deleteAllItems(): Promise<void> {
        return db.collection("carts").get()
            .then(data => {
                data.forEach(item => db.collection("carts").doc(item.id).delete())
            })
    }
}