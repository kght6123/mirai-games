<template>
  <div id="firebaseui-auth-container"></div>
  <div v-if="state.login === true">
    <button @click="onSignOut">Logout ({{ state.fbUser.uid }})</button>
  </div>
</template>

<script>
// vue
import { defineComponent, ref, onMounted } from "vue";
// firebase
import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
// stores
import { useFbAuthStore } from "../stores/auth";

const uiConfig = {
  // ログイン完了時のリダイレクト先
  signInSuccessUrl: "/", // this.$route.fullPath,
  // ポップアップで表示する
  signInFlow: "popup",
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
    signInSuccessWithAuthResult(authResult, _redirectUrl) {
      console.log(authResult.additionalUserInfo.username);
      return true;
    },
  },
  autoUpgradeAnonymousUsers: true,
};

export default defineComponent({
  name: "Login",
  setup() {
    console.log("setup!");
    let fbUser = ref({});

    // store
    const { state, updateFbUser } = useFbAuthStore();
    const onSignIn = (fbUser) => updateFbUser(fbUser);
    const onSignOut = async () => {
      await firebase.default.auth().signOut();
      removeFbUser();
    };

    // life cicle
    onMounted(async () => {
      console.log("mounted!");
      // ログイン情報を取得する
      fbUser.value = await new Promise((resolve, _reject) => {
        firebase.default.auth().onAuthStateChanged((fbUser) => {
          onSignIn(fbUser);
          resolve(fbUser);
        });
      });
      console.log(fbUser.value);
      // ログインUIを表示する
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.default.auth());
      ui.start("#firebaseui-auth-container", uiConfig);
      console.log("ui started!");
    });
    // const displayName = ref("");
    // const photoURL = ref("");

    // watchEffect(() => {
    //   displayName.value = state.displayName
    //   photoURL.value = state.photoURL
    // })
    return {
      state,
      onSignOut,
      /* displayName, photoURL, update */
    };
  },
  onMounted() {},
});
</script>
