import { db } from "config";
import { DbHelper } from "repositories/DbHelper";

export class CartDbHelper {
  public static async getCartItems(userid: string): Promise<string[]> {
    const cart = await db.collection("carts").doc(userid).get();

    if (cart.exists) {
      return cart.data().items.map((item: string) => item);
    }
    return [];
  }

  public static async addItem(userid: string, name: string): Promise<boolean> {
    const cartRef = db.collection("carts").doc(userid);
    const cart = await cartRef.get();

    if (cart.exists) {
      return await DbHelper.arrayPushUnique(cartRef, "items", name);
    }
    return false;
  }

  public static async deleteItem(
    userid: string,
    name: string
  ): Promise<boolean> {
    const cartRef = db.collection("carts").doc(userid);
    const cart = await cartRef.get();

    if (cart.exists) {
      const items = cart.data().items;
      const newItems = items.filter((item) => item !== name);

      await cartRef.set({ items: newItems });
      return;
    }
    return false;
  }

  public static async deleteAllItems(userid: string): Promise<void> {
    const cartRef = db.collection("carts").doc(userid);
    await cartRef.set({ items: [] });
  }
}
