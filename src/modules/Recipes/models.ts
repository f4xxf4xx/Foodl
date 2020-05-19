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
  notes?: string;
}

export interface IngredientGroup {
  id?: string;
  name: string;
  items: string[];
}

export interface Step {
  id?: string;
  order: number;
  text: string;
}
