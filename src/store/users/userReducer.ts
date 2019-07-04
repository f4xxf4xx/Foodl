import { createReducer } from "redux-starter-kit";
import { User } from "firebase";

export type UserState = {
    signedIn: boolean;
    uid: string;
    loadingUser: boolean;
}

const initialState: UserState = {
    signedIn: false,
    uid: null,
    loadingUser: false
}

export const userReducer = createReducer(initialState, {
    USER_SIGNIN: (state, action) => {
        state.signedIn = true;
        state.uid = action.payload;
    },
    USER_SIGNOUT: (state) => {
        state.signedIn = false;
        state.uid = null;
    },
    USER_LOAD_START: (state) => {
        state.loadingUser = true;
    },
    USER_LOAD_STOP: (state) => {
        state.loadingUser = false;
    }
});