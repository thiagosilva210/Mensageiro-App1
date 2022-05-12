import firebase from "firebase/app";

import "firebase/firestore";
require("firebase/firestore");
import "firebase/auth";
import "firebase/storage";
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

//const firebase = require('firebase');
//require('firebase/firestore');

export class Firebase {
  constructor() {
    this._config = {
      /*
      apiKey: 
      authDomain: 
      projectId: 
      storageBucket: 
      messagingSenderId: 
      appId:
      measurementId:
      */
    };
    // Initialize Firebase

    this.init();
  }

  init() {
    if (!window._initializedFirebase) {
      firebase.initializeApp(this._config);

      firebase.firestore().settings({
        timestampsInSnapshots: true,
      });

      window._initializedFirebase = true;
    }
  }

  static db() {
    return firebase.firestore();
  }

  static hd() {
    return firebase.storage();
  }

  initAuth() {
    return new Promise((s, f) => {
      let provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)

        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;

          s({
            user,
            token,
          });
        })
        .catch((err) => {
          f(err);
        });
    });
  }
}
