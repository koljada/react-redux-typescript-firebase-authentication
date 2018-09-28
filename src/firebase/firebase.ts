import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDz_lMM90QCLmRpf24Z5rJreGgNPbZeKdw",
  authDomain: "etta-dcd99.firebaseapp.com",
  databaseURL: "https://etta-dcd99.firebaseio.com",
  projectId: "etta-dcd99",
  storageBucket: "etta-dcd99.appspot.com",
  messagingSenderId: "834467835511"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();
