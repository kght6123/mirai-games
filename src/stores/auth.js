import { inject, reactive } from "vue";

const fbAuthStore = () => {
  console.log("init fbAuthStore");
  const state = reactive({ login: false, fbUser: null });
  const setFbUser = (fbUser) => {
    state.login = !!fbUser;
    console.log(`state.login=${state.login}`);
    if (fbUser) {
      state.fbUser = fbUser;
    }
  };
  const removeFbUser = () => setFbUser(null);
  const updateFbUser = (fbUser) => {
    setFbUser(fbUser);
  };
  return {
    state,
    setFbUser,
    removeFbUser,
    updateFbUser,
  };
};

export default fbAuthStore;

export const fbAuthStoreKey = Symbol("fbAuthStore");

export const useFbAuthStore = () => {
  const store = inject(fbAuthStoreKey);
  if (!store) {
    throw new Error(`${fbAuthStoreKey} is not provided`);
  }
  return store;
};
