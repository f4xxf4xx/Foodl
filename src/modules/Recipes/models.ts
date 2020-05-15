export interface Recipe {
  id?: string;
  uid: string;
  name: string;
  description?: string;
  image?: string;
  imageFullPath?: string;
  slug: string;
  type?: string;
  duration?: string;
  cuisine?: string;
  tags?: string[];
  ingredients?: string[];
}

export interface Step {
  id?: string;
  order: number;
  text: string;
}
