import { Plugin } from '@nuxt/types'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
}

declare module 'vue/types/vue' {
  interface Vue {
    $authFunc: Function
    $auth: firebase.default.auth.Auth
    $firestoreFunc: Function
    $firestore: firebase.default.firestore.Firestore
    $firestoreServerTimestamp: firebase.default.firestore.FieldValue
    $firestoreIncrement: Function
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $authFunc: Function
    $auth: firebase.default.auth.Auth
    $firestoreFunc: Function
    $firestore: firebase.default.firestore.Firestore
    $firestoreServerTimestamp: firebase.default.firestore.FieldValue
    $firestoreIncrement: Function
  }
  interface Context {
    $authFunc: Function
    $auth: firebase.default.auth.Auth
    $firestoreFunc: Function
    $firestore: firebase.default.firestore.Firestore
    $firestoreServerTimestamp: firebase.default.firestore.FieldValue
    $firestoreIncrement: Function
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $authFunc: Function
    $auth: firebase.default.auth.Auth
    $firestoreFunc: Function
    $firestore: firebase.default.firestore.Firestore
    $firestoreServerTimestamp: firebase.default.firestore.FieldValue
    $firestoreIncrement: Function
  }
}

const plugin: Plugin = (_context, inject) => {
  if (!firebase.default.apps.length) {
    // 最初だけFirebaseを使うためにinitializeAppしてinject
    firebase.default.initializeApp(firebaseConfig)
  }
  inject('authFunc', firebase.default.auth)
  inject('auth', firebase.default.auth())
  inject('firestoreFunc', firebase.default.firestore)
  inject('firestore', firebase.default.firestore())
  inject('firestoreIncrement', firebase.default.firestore.FieldValue.increment)
  inject(
    'firestoreServerTimestamp',
    firebase.default.firestore.FieldValue.serverTimestamp()
  )
  // context.$authFunc = firebase.auth
  // context.$auth = firebase.auth()
  // context.$firestoreFunc = firebase.firestore
  // context.$firestore = firebase.firestore()
  // context.$firestoreIncrement = firebase.firestore.FieldValue.increment
  // context.$firestoreServerTimestamp = firebase.firestore.FieldValue.serverTimestamp()
}

export default plugin
