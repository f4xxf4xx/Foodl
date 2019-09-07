import { createReducer } from "redux-starter-kit";
import { Ingredient } from "../../modules/Ingredients/models";

export interface CartState {
    cartItems: Ingredient[];
    loading: boolean;
    updating: boolean;
}

const initialState: CartState = {
    cartItems: [],
    loading: true,
    updating: false
};

export const cartReducer = createReducer(initialState, {
    SET_CART_LOADING: (state, action) => {
        state.loading = action.payload;
    },
    SET_CART_UPDATING: (state, action) => {
        state.updating = action.payload;
    },
    UPDATE_CARTITEMS: (state, action) => {
        state.cartItems = action.payload;
    },
    ADD_CARTITEM: (state, action) => {
        state.cartItems.push(action.payload);
    },
    DELETE_CARTITEM: (state, action) => {
        state.cartItems = state.cartItems.filter((i) => i.name !== action.payload);
    },
    DELETE_ALL_CARTITEMS: (state) => {
        state.cartItems = [];
    }
});
