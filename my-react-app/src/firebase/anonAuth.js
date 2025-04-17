import {  onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";


export function initAnonymousAuth() {

    onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(`🔥Firebase user ready: ${user.uid}`);
        } else {
          signInAnonymously(auth)
            .then((result) => {
              console.log(`🆕 Signed in anonymously: ${result.user.uid}`);
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
      console.log("Signed out, next user will get a new anonymous UID");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };