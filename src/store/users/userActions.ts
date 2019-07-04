import { createAction } from "redux-starter-kit";

export const userSignIn = createAction("USER_SIGNIN");
export const userSignOut = createAction("USER_SIGNOUT");
export const userLoadStart = createAction("USER_LOAD_START");
export const userLoadStop = createAction("USER_LOAD_STOP");