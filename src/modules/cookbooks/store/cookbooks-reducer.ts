import { createReducer } from "@reduxjs/toolkit";

export interface CookbooksState {
  isLoading: boolean;
  isUpdating: boolean;
}

const initialRecipesState: CookbooksState = {
  isLoading: false,
  isUpdating: false,
};

export const cookbooksReducer = createReducer(initialRecipesState, {
  SET_COOKBOOKS_LOADING: (state, action) => {
    state.isLoading = action.payload;
  },
  SET_COOKBOOKS_UPDATING: (state, action) => {
    state.isUpdating = action.payload;
  },
});
