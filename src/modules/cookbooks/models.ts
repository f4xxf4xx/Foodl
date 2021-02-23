export interface Cookbook {
  id?: string;
  name?: string;
  uid: string;
  slug: string;
  default: boolean;
  privacy: "public" | "private";
}