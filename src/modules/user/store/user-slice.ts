import firebase from "firebase/app";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { auth } from "firebase-config";

export interface Profile {
  uid: string;
  fullName: string;
  email: string;
  photoUrl: string;
}

export interface UserState {
  isLoading: boolean;
  profile?: Profile;
}

export function mapUser(user: firebase.User): Profile {
  return {
    uid: user.uid,
    fullName: user.displayName,
    email: user.email,
    photoUrl: user.photoURL
  };
}

function mapUserCredential(userCredential: firebase.auth.UserCredential): Profile {
  const user = userCredential && userCredential.user;
  return mapUser(user)
}

export const logInWithGoogle = createAsyncThunk(
  "user/logInWithGoogle",
  async () => {
    console.log('loginWithGoogle');
    const provider = new firebase.auth.GoogleAuthProvider();
    return mapUserCredential(await auth.signInWithPopup(provider));
  }
);

export const logOut = createAsyncThunk(
  "user/logOut",
  () => auth.signOut()
)

export const loginAction = createAction<Profile>("SET_LOGIN");

const userSlice = createSlice({
  name: "user",
  initialState: { isLoading: false } as UserState,
  reducers: {},
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
    builder.addCase(loginAction, (state, action) => {
      state.profile = action.payload
    })
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
