import { db } from '../config';
import { Ingredient } from '../modules/Ingredients/models';

export class cartService {
    public static getCartItems(userid: string): Promise<Ingredient[]> {
        return db.collection("carts")
            .doc(userid)
            .get()
            .then(data => {
                if (data.exists) {
                    return cartService.getItems(data);
                } else {
                    return [];
                }
            })
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

    public static addItem(userid: string, name: string): Promise<Ingredient> {
        const cart = db.collection("carts").doc(userid);

        return cart.get()
            .then(data => {
                if(data.exists) {
                    const items = data.data().items;
                    if(items.includes(name)) {
                        return null;
                    }
                    items.push(name);
                    cart.set({ items });
                } else {
                    cart.set({ items: [name] });                    
                }
                return {
                    name
                }
            })        
    }

    public static deleteItem(userid: string, name: string): Promise<void> {
        const cart = db.collection("carts").doc(userid);

        return cart.get()
            .then(data => {
                if(data.exists) {
                    const items = data.data().items;
                    const newItems = items.filter(item => item !== name);
                    cart.set({ items: newItems })
                }
            })
    }

    public static deleteAllItems(): Promise<void> {
        return db.collection("carts").get()
            .then(data => {
                data.forEach(item => db.collection("carts").doc(item.id).delete())
            })
    }
}