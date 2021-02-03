export interface Cookbook {
  id?: string;
  name?: string;
  uid: string;
  default: boolean;
  privacy: "public" | "private";
}