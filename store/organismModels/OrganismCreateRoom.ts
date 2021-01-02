import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'

export const state = () => ({
  things: [] as string[],
  name: 'Me',
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  name: (state) => state.name,
})

export const mutations = mutationTree(state, {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    /* async */ fetchThings({ commit }) {
      // const things = await this.$axios.$get('/things')
      // console.log(things)
      commit('CHANGE_NAME', 'New name')
    },
  }
)
