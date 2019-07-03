import { createReducer } from "redux-starter-kit";
import { Ingredient } from "../../components/Ingredients/models";

export type CartState = {
    cartItems: Ingredient[];
    loadingCartItems: boolean;
    updatingCartItems: boolean;
}

const initialState: CartState = {
    cartItems: [],
    loadingCartItems: false,
    updatingCartItems: false
}

export const cartReducer = createReducer(initialState, {
    FETCH_CARTITEMS_START: (state) => {
        state.loadingCartItems = true;
    },
    FETCH_CARTITEMS_STOP: (state) => {
        state.loadingCartItems = false;
    },
    UPDATE_CARTITEMS_START: (state) => {
        state.updatingCartItems = true;
    },
    UPDATE_CARTITEMS_STOP: (state) => {
        state.updatingCartItems = false;
    },
    UPDATE_CARTITEMS: (state, action) => {
        state.cartItems = action.payload;
    },
    ADD_CARTITEM: (state, action) => {
        state.cartItems.push(action.payload);
    },
    DELETE_CARTITEM: (state, action) => {
        state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
    },
    DELETE_ALL_CARTITEMS: (state) => {
        state.cartItems = [];
    }
});