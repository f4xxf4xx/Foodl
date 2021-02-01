import firebase from "firebase/app";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "firebase-config";

export interface Profile {
  uid: string;
  fullName: string;
  email: string;
  pictureUrl: string;
}

export interface UserState {
  isLoading: boolean;
  profile?: Profile;
}

function mapUser(user: firebase.auth.UserCredential): Profile {
  const fbUser = user && user.user;
  return {
    uid: fbUser.uid,
    fullName: fbUser.displayName,
    email: fbUser.email,
    pictureUrl: fbUser.photoURL
  };
}

export const logInWithGoogle = createAsyncThunk(
  "user/logInWithGoogle",
  async () => {
    console.log('loginWithGoogle');
    const provider = new firebase.auth.GoogleAuthProvider();
    return mapUser(await auth.signInWithPopup(provider));
  }
);

export const logOut = createAsyncThunk(
  "user/logOut",
  () => auth.signOut()
)

const userSlice = createSlice({
  name: "user",
  initialState: { isLoading: false } as UserState,
  reducers: { },
  extraReducers: builder => {

    builder.addCase(logInWithGoogle.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(logInWithGoogle.rejected, (state) => {
      state.isLoading = true;
    });

    builder.addCase(logInWithGoogle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });

    builder.addCase(logOut.pending, (state) => {
      state.isLoading = true;
    });
    
    builder.addCase(logOut.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(logOut.fulfilled, (state) => {
      state.isLoading = false;
      state.profile = null;
    });
  }
});

export const userReducer = userSlice.reducer;
