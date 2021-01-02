import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'
import * as firebase from 'firebase/app'

export const state = () => ({
  things: [] as string[],
  name: 'Me',
  fbUserUid: null as String | null,
  login: false as Boolean,
})

export const getters = getterTree(state, {
  name: (state) => state.name,
  fbUserUid: (state) => state.fbUserUid,
  isLogin: (state) => state.login,
})

export const mutations = mutationTree(state, {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),
  setFbUser: (state, fbUser: firebase.default.User | null) => {
    if (fbUser === null) {
      state.fbUserUid = null
      state.login = false
    } else {
      state.fbUserUid = fbUser.uid
      state.login = true
    }
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    /* async */ fetchThings({ commit }) {
      // const things = await this.$axios.$get('/things')
      // console.log(things)
      commit('CHANGE_NAME', 'New name')
    },
    doLoginFbUser({ commit }, fbUser: firebase.default.User | null) {
      commit('setFbUser', fbUser)
    },
  }
)
