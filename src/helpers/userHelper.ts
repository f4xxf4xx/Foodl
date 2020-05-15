import { FirebaseReducer } from "react-redux-firebase";

export const isAuthenticated = (auth: FirebaseReducer.AuthState) =>
  auth.isLoaded && !auth.isEmpty;
