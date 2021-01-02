import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'

export const state = () => ({
  things: [] as string[],
  name: 'Me',
})

export const getters = getterTree(state, {
  name: (state) => state.name,
})

export const mutations = mutationTree(state, {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async entryMember({ commit }, roomId: string) {
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
          entryAt: this.$firestoreServerTimestamp,
        })
      console.log('entryMember', result)
    },
  }
)
