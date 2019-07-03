import { createReducer } from "redux-starter-kit";

export type UserState = {
    signedIn: boolean;
}

const initialState: UserState = {
    signedIn: false
}

export const userReducer = createReducer(initialState, {
    USER_SIGNIN: (state, action) => {
        state.signedIn = true;
    },
    USER_SIGNOUT: (state) => {
        state.signedIn = false;
    },
});