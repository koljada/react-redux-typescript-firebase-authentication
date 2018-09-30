import { auth } from "./firebase";

import User from "../models/User";

// Sign Up
export const doCreateUserWithEmailAndPassword = (email: string, password: string) =>
  auth.createUserWithEmailAndPassword(email, password)
    .then(credentials => {
      if (credentials.user) {
        return new User(credentials.user);
      }
      else {
        throw new Error('User is empty');
      }
    });

// Sign In
export const doSignInWithEmailAndPassword = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => auth.signOut();

// Password Reset
export const doPasswordReset = (email: string) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = async (password: string) => {
  console.log('Current user', auth.currentUser);
  if (auth.currentUser) {
    return await auth.currentUser.updatePassword(password);
  }
  throw Error("No auth.currentUser!");
};
