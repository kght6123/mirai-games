<template>
  <div>
    <div v-if="state.login !== true" id="firebaseui-auth-container"></div>
    <div v-if="state.login === true">
      <button @click="onLogout">Logout ({{ state.fbUser.uid }})</button>
    </div>
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
import { useFbAuthStore } from "../stores/LoginAndLogout";
// router
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    console.log("setup!");
    let fbUser = ref({});

    // router
    const router = useRouter();
    const route = useRoute();

    // store
    const { state, updateFbUser, removeFbUser } = useFbAuthStore();
    const onLogin = (fbUser) => updateFbUser(fbUser);
    const onLogout = async () => {
      await firebase.default.auth().signOut();
      removeFbUser();
      // reload
      router.go({ path: router.currentRoute.path, force: true });
    };

    // life cicle
    onMounted(async () => {
      console.log("mounted!");
      // ログイン情報を取得する
      fbUser.value = await new Promise((resolve, _reject) => {
        firebase.default.auth().onAuthStateChanged((fbUser) => {
          onLogin(fbUser);
          resolve(fbUser);
        });
      });
      console.log(fbUser.value);
      // ログインUIを表示する
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.default.auth());
      ui.start("#firebaseui-auth-container", {
        // ログイン完了時のリダイレクト先
        signInSuccessUrl: route.fullPath,
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
      });
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
      onLogout,
      /* displayName, photoURL, update */
    };
  },
});
</script>
