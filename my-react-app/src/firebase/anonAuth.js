import {  onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

let hasInitializedAuth = false;

export function initAnonymousAuth() {

  if (hasInitializedAuth) return; // if auth. has already been started, abort mission!
  hasInitializedAuth = true; // otherwise, start the process!

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(`🔥Firebase user ready: ${user.uid}`);
    } else {
      //console.log("🔄 No user yet — signing in anonymously…");
      signInAnonymously(auth)
        .then((result) => {
          //console.log(`🆕 Signed in anonymously: ${result.user.uid}`);
        })
        .catch((error) => {
          console.error("Anonymous sign-in error:", error);
        });
    }
  });
}

export const resetFirebaseUser = async () => {
    try {
      await signOut(auth);
      //console.log("Signed out, next user will get a new anonymous UID");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };