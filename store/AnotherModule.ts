import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'
import { RootState } from '~/store'

export const state = () => ({
  more: 3,
})
export const getters = getterTree(state, {
  evenMore: (state) => state.more + 5,
  nameAndMore: (state, /* getters, */ rootState) =>
    `${rootState.name}: ${state.more}`,
})
export const mutations = mutationTree(state, {
  setMore(state, newValue: number) {
    state.more = newValue
  },
})
export const actions = actionTree(
  { state, getters, mutations },
  {
    printRootState({ rootState }) {
      console.log('accessing rootState:', rootState.name)
    },
  }
)
