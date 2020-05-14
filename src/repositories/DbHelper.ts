export class DbHelper {
    public static async arrayPushUnique(ref: firebase.firestore.DocumentReference, array: any, arrayName: string, item: string) {
        if (array) {
            if (array.includes(item)) {
                return null;
            }
            array.push(item);
            await ref.update({ [arrayName]: array });
        } else {
            await ref.update({ [arrayName]: [item] });
        }
        return item;
    }

    public static async arrayAddUnique(ref: firebase.firestore.DocumentReference, array: any, arrayName: string, item: string) {
        if (array) {
            if (array.includes(item)) {
                return array;
            }
            array.push(item);
            await ref.update({ [arrayName]: array });
            return array;
        } else {
            await ref.update({ [arrayName]: [item] });
            return [item];
        }
    }

    public static async arrayAdd(ref: firebase.firestore.DocumentReference, array: any, arrayName: string, item: string) {
        if (array) {
            array.push(item);
            await ref.update({ [arrayName]: array });
            return array;
        } else {
            await ref.update({ [arrayName]: [item] });
            return [item];
        }
    }
    
    public static async arrayDelete(ref: firebase.firestore.DocumentReference, array: any, arrayName: string, item: string) {
        if (array) {
            if(array.includes(item)) {
                const filteredItems = array.filter((arrayItem => arrayItem !== item));

                await ref.update({ [arrayName]: filteredItems});
                return filteredItems;
            }
            return array;
        }
        return null;
    }
}
