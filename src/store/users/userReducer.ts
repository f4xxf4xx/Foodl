import { createReducer } from "redux-starter-kit";
import { User } from "firebase";

export type UserState = {
    signedIn: boolean;
    user: User;
}

const initialState: UserState = {
    signedIn: false,
    user: null
}

export const userReducer = createReducer(initialState, {
    USER_SIGNIN: (state, action) => {
        state.signedIn = true;
        state.user = action.payload;
    },
    USER_SIGNOUT: (state) => {
        state.signedIn = false;
        state.user = null;
    },
});