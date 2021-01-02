import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { accessorType } from './store'

declare module 'vue/types/vue' {
  interface Vue {
    $authFunc: Function
    $auth: firebase.default.auth.Auth
    $firestoreFunc: Function
    $firestore: firebase.default.firestore.Firestore
    $firestoreServerTimestamp: firebase.default.firestore.FieldValue
    $firestoreIncrement: Function
    $accessor: typeof accessorType
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
    $accessor: typeof accessorType
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
