<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
// import { useAuthStore } from "@/stores/auth";
import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

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
    // const { state, updateUser } = useAuthStore()
    // const displayName = ref("");
    // const photoURL = ref("");
    // const update = () =>
    //   updateUser({ displayName: displayName.value, photoURL: photoURL.value })

    // watchEffect(() => {
    //   displayName.value = state.displayName
    //   photoURL.value = state.photoURL
    // })
    console.log("setup!");
    onMounted(() => {
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.default.auth());
      ui.start("#firebaseui-auth-container", uiConfig);
      console.log("ui started!");
    });
    return {
      /* displayName, photoURL, update */
    };
  },
  onMounted() {},
});
</script>
