import { GetterTree, ActionTree, MutationTree } from 'vuex'
import * as firebase from 'firebase/app'

export const state = () => ({
  things: [] as string[],
  name: 'Me',
  fbUser: null as String | null,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: (state) => state.name,
  fbUser: (state) => state.fbUser,
}

export const mutations: MutationTree<RootState> = {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),
  setFbUser: (state, fbUser: firebase.default.User) =>
    (state.fbUser = fbUser.uid),
}

export const actions: ActionTree<RootState, RootState> = {
  /* async */ fetchThings({ commit }) {
    // const things = await this.$axios.$get('/things')
    // console.log(things)
    commit('CHANGE_NAME', 'New name')
  },
  doLoginFbUser({ commit }, fbUser: firebase.default.User | null) {
    commit('setFbUser', fbUser)
  },
}

export const strict = false
