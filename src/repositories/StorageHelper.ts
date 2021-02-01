import { storage } from "firebase-config";

export class StorageHelper {
  public static async addFileAsync(path: string, file: File): Promise<string> {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(path);
    return fileRef.put(file).then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    });
  }
}
