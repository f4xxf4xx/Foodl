export class DbHelper {
  public static async arrayPushUnique(
    ref: firebase.firestore.DocumentReference,
    key: string,
    item: string
  ): Promise<boolean> {
    const object = await ref.get();
    const array = object.data()[key];

    if (array) {
      if (array.includes(item)) {
        return false;
      }
      array.push(item);
      await ref.update({ [key]: array });
    } else {
      await ref.update({ [key]: [item] });
    }
    return true;
  }

  public static async arrayAddUnique(
    ref: firebase.firestore.DocumentReference,
    key: string,
    item: string
  ) {
    const object = await ref.get();
    const array = object.data()[key];
    if (array) {
      if (array.includes(item)) {
        return array;
      }
      array.push(item);
      await ref.update({ [key]: array });
      return array;
    } else {
      await ref.update({ [key]: [item] });
      return [item];
    }
  }

  public static async arrayAdd(
    ref: firebase.firestore.DocumentReference,
    array: any,
    arrayName: string,
    item: string
  ) {
    if (array) {
      array.push(item);
      await ref.update({ [arrayName]: array });
      return array;
    } else {
      await ref.update({ [arrayName]: [item] });
      return [item];
    }
  }

  public static async arrayDelete(
    ref: firebase.firestore.DocumentReference,
    key: string,
    item: string
  ) {
    const object = await ref.get();
    const array = object.data()[key];
    if (array) {
      if (array.includes(item)) {
        const filteredItems = array.filter((arrayItem) => arrayItem !== item);

        await ref.update({ [key]: filteredItems });
        return filteredItems;
      }
      return array;
    }
    return null;
  }
}
