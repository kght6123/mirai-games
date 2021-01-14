import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'
import {
  EntryUser,
  EntryUserConverter,
} from '~/assets/ts/firestoreModels/EntryUser'

export const state = () => ({
  things: [] as string[],
  nickname: '',
  entryComplete: false,
  unsubscribe: null,
})

export const getters = getterTree(state, {
  getNickname: (state) => state.nickname,
  unsubscribe: (state) => state.unsubscribe,
  getEntryComplete: (state) => state.entryComplete,
})

export const mutations = mutationTree(state, {
  setNickname: (state, nickname: string) => (state.nickname = nickname),
  setUnsubscribe: (state, unsubscribe: any) =>
    (state.unsubscribe = unsubscribe),
  setEntryComplete: (state, entryComplete: boolean) =>
    (state.entryComplete = entryComplete),
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async entryMember({ getters }, roomId: string) {
      const fbLoginUid = this.app.$accessor.organismModels.OrganismSignInAndOut
        .fbUserUid
      const result = await this.$firestore
        .collection('jinro-rooms')
        .doc(roomId)
        .collection('entry-users')
        .doc(fbLoginUid as string)
        .set({
          roomId,
          fbLoginUid,
          nickname: getters.getNickname,
          entryAt: this.$firestoreServerTimestamp,
        })
      console.log('entryMember', result)
    },
    waitingMember({ commit, dispatch }, roomId: string) {
      const unsubscribe = this.$firestore
        .collection('jinro-rooms')
        .doc(roomId)
        .collection('entry-users')
        .onSnapshot({
          next: async (
            snapshot: firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>
          ) => {
            console.log('next onSnapshot.', snapshot)
            const docSnapShot = await snapshot.docs[0].ref
              .withConverter(EntryUserConverter)
              .get()
            const { fbLoginUid, nickname } = docSnapShot.data() as EntryUser
            console.log('next EntryUser.', fbLoginUid, nickname)
          },
          error: (error: firebase.default.firestore.FirestoreError) => {
            console.warn('error onSnapshot.', error)
          },
          complete: () => {
            console.log('complete onSnapshot.')
          },
        })
      // .onSnapshot({
      //   next: (
      //     snapshot: firebase.default.firestore.DocumentSnapshot<firebase.default.firestore.DocumentData>
      //   ) => {
      //     console.log('next onSnapshot.', snapshot)
      //   },
      //   error: (error: firebase.default.firestore.FirestoreError) => {
      //     console.warn('error onSnapshot.', error)
      //   },
      //   complete: () => {
      //     console.log('complete onSnapshot.')
      //   },
      // })
      window.addEventListener(
        'beforeunload',
        (evt: BeforeUnloadEvent): void => {
          // unload時にonSnapshotを解除する
          dispatch('doUnsubscribe')
          evt.returnValue = undefined
        },
        false
      )
      commit('setEntryComplete', true)
      commit('setUnsubscribe', unsubscribe)
      return unsubscribe
    },
    doUnsubscribe({ getters, commit }) {
      if (getters.unsubscribe) {
        ;((getters.unsubscribe as unknown) as Function)()
        commit('setUnsubscribe', null)
        console.log('unsubscribe ok.')
      } else {
        console.warn('unsubscribe ng.')
      }
      commit('setEntryComplete', false)
    },
    test(context) {
      console.log(this, context)
    },
  }
)
