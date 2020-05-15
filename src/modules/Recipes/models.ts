export interface Recipe {
  id?: string;
  uid: string;
  name: string;
  description?: string;
  image?: string;
  imageFullPath?: string;
  slug: string;
  type?: string;
  duration?: number;
  tags?: string[];
  cuisine?: string;
  ingredientGroups?: string[];
}

export interface Step {
  id?: string;
  order: number;
  text: string;
}
