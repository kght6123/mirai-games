import {
  getAccessorType,
  mutationTree,
  actionTree,
  getterTree,
} from 'nuxt-typed-vuex'
import { Context } from '@nuxt/types'

// Import all your submodules
import * as AnotherModule from '~/store/AnotherModule'
import * as OrganismCreateRoom from '~/store/organismModels/OrganismCreateRoom'
import * as OrganismSignInAndOut from '~/store/organismModels/OrganismSignInAndOut'
import * as OrganismWaitingMember from '~/store/organismModels/OrganismWaitingMember'

// Keep your existing vanilla Vuex code for state, getters, mutations, actions, plugins, etc.
// import { GetterTree, ActionTree, MutationTree } from 'vuex'

export type RootState = ReturnType<typeof state>

export const state = () => ({
  things: [] as string[],
  name: 'Me',
})
export const getters = getterTree(state, {
  name: (state: RootState) => state.name,
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
    async nuxtServerInit(_vuexContext, nuxtContext: Context) {
      console.log(nuxtContext.req)
    },
  }
)

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
    AnotherModule,
    organismModels: {
      modules: {
        OrganismCreateRoom,
        OrganismSignInAndOut,
        OrganismWaitingMember,
      },
    },
  },
})
