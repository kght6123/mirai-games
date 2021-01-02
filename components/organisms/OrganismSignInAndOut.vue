<template>
  <div>
    <div
      v-show="
        $store.getters['organismModels/OrganismSignInAndOut/isLogin'] === false
      "
      class="flex-center-center"
    >
      <div id="firebaseui-auth-container" ref="firebaseui-auth-container"></div>
    </div>
    <div
      v-if="
        $store.getters['organismModels/OrganismSignInAndOut/isLogin'] !== false
      "
      class="pb-2"
    >
      <button class="btn--secondary" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as firebase from 'firebase/app'
import { getters, actions } from '~/store/organismModels/OrganismSignInAndOut'
import 'firebase/auth'
import 'firebaseui/dist/firebaseui.css'
export default Vue.extend({
  data() {
    return {}
  },
  computed: {
    myThings: {
      get(): any[] {
        return this.$accessor.things
      },
      /* set(value: any): void {}, */
    },
  },
  async created(): Promise<void> {
    // eslint-disable-next-line promise/param-names
    const fbUser: firebase.default.User | null = await new Promise(
      (resolve, _reject) => {
        firebase.default
          .auth()
          .onAuthStateChanged((user: firebase.default.User | null) => {
            resolve(user)
          })
      }
    )
    // this.$nuxt.$loading.finish()
    if (fbUser) await this.onSignIn(fbUser)
    else this.onSignOut()
  },
  mounted() {
    // this.$nuxt.$loading.start()
    this.$nextTick(() => {
      setTimeout(() => {
        // this.$nuxt.$loading.finish()
        this.showFirebaseUI()
      }, 250)
    })
    const name = this.$store.getters.name as ReturnType<typeof getters.name>
    console.log(name)
  },
  methods: {
    async onSignIn(fbUser: firebase.default.User) {
      console.log(`login!!!`, fbUser)
      await this.$store.dispatch(
        `organismModels/OrganismSignInAndOut/doLoginFbUser`,
        fbUser,
        { root: true }
      )
      await this.$firestore.collection('users').doc(fbUser.uid).set({
        fbid: fbUser.uid,
        lastLoginAt: this.$firestoreServerTimestamp,
      })
    },
    async onSignOut() {
      console.log(`logout`)
      await this.$store.dispatch(
        `organismModels/OrganismSignInAndOut/doLoginFbUser`,
        null,
        { root: true }
      )
    },
    async logout() {
      await firebase.default.auth().signOut()
      window.location.reload(true)
    },
    showFirebaseUI() {
      const firebaseui = require('firebaseui')
      const uiConfig = {
        // ログイン完了時のリダイレクト先
        signInSuccessUrl: this.$route.fullPath, // this.signInSuccessUrl,
        // ポップアップで表示する
        signInFlow: 'popup',
        // 利用する認証機能
        signInOptions: [
          // Google
          firebase.default.auth.GoogleAuthProvider.PROVIDER_ID,
          // EMail
          firebase.default.auth.EmailAuthProvider.PROVIDER_ID,
          // Github
          firebase.default.auth.GithubAuthProvider.PROVIDER_ID,
          // Guest
          firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccessWithAuthResult(
            authResult: { additionalUserInfo: { username: any } },
            _redirectUrl: any
          ) {
            console.log(authResult.additionalUserInfo.username)
            return true
          },
        },
        autoUpgradeAnonymousUsers: true,
      }
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.default.auth())
      ui.start('#firebaseui-auth-container', uiConfig)
    },
  },
})
</script>
