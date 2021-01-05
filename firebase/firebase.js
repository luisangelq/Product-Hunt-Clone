import app from "firebase/app";
import "firebase/auth";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
  }

  //Register An user
  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    return await newUser.user.updateProfile({
      displayName: name,
    });
  }

  //Log In user
  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  //log out
  async logOut() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();
export default firebase;
