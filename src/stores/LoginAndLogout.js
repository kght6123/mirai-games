import { inject, reactive } from "vue";
// firebase
import * as firebase from "firebase/app";
import "firebase/firestore";

const fbAuthStore = () => {
  console.log("init fbAuthStore");
  const state = reactive({
    login: false,
    fbUser: null,
    nickname: null,
    unsubscribe: null,
    entryComplete: false
  });
  const setFbUser = (fbUser) => {
    state.login = !!fbUser;
    console.log(`state.login=${state.login}`);
    if (fbUser) {
      state.fbUser = fbUser;
    }
  };
  const getFbUser = () => {
    return state.fbUser;
  };
  const setNickname = (nickname) => {
    state.nickname = nickname;
  };
  const getNickname = () => {
    return state.nickname;
  };
  const setUnsubscribe = (unsubscribe) => {
    state.nickunsubscribename = unsubscribe;
  };
  const getUnsubscribe = () => {
    return state.unsubscribe;
  };
  const setEntryComplete = (entryComplete) => {
    state.entryComplete = entryComplete;
  };
  const getEntryComplete = () => {
    return state.entryComplete;
  };
  const removeFbUser = () => setFbUser(null);
  const updateFbUser = async (fbUser) => {
    console.log(fbUser);
    if (fbUser) {
      setFbUser(fbUser);
      await firebase.default
        .firestore()
        .collection("users")
        .doc(getFbUser().uid)
        .set({
          fbid: getFbUser().uid,
          lastLoginAt: firebase.default.firestore.FieldValue.serverTimestamp(),
        });
    }
  };
  const entryMember = async (roomId) => {
    const result = await firebase.default
        .firestore()
        .collection('jinro-rooms')
        .doc(roomId)
        .collection('entry-users')
        .doc(getFbUser().uid)
        .set({
          roomId,
          fbLoginUid: getFbUser().uid,
          nickname: getNickname(),
          entryAt: firebase.default.firestore.FieldValue.serverTimestamp,
        })
    console.log('entryMember', result)
  };
  const doUnsubscribe = () => {
    if (getUnsubscribe()) {
      getUnsubscribe()()
      setUnsubscribe(null)
      console.log('unsubscribe ok.')
    } else {
      console.warn('unsubscribe ng.')
    }
    setEntryComplete(false)
  };
  const waitingMember = async (roomId) => {
    const unsubscribe = firebase.default
      .firestore()
      .collection('jinro-rooms')
      .doc(roomId)
      .collection('entry-users')
      .onSnapshot({
        next: async (snapshot) => {
          console.log('next onSnapshot.', snapshot)
          const docSnapShot = await snapshot.docs[0].ref.get()
          const { fbLoginUid, nickname } = docSnapShot.data()
          console.log('next EntryUser.', fbLoginUid, nickname)
        },
        error: (error) => {
          console.warn('error onSnapshot.', error)
        },
        complete: () => {
          console.log('complete onSnapshot.')
        },
      })
    window.addEventListener(
      'beforeunload', (evt) => {
        // unload時にonSnapshotを解除する
        doUnsubscribe()
        evt.returnValue = undefined
      },
      false
    )
    setEntryComplete(true)
    setUnsubscribe(unsubscribe)
    return unsubscribe
  }
  return {
    state,
    setFbUser,
    getFbUser,
    setNickname,
    getNickname,
    removeFbUser,
    updateFbUser,
    entryMember,
    setUnsubscribe,
    getUnsubscribe,
    setEntryComplete,
    getEntryComplete,
    waitingMember,
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
