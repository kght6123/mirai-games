import { Plugin } from '@nuxt/types'
import createPersistedState from 'vuex-persistedstate'

const plugin: Plugin = ({ store }) => {
  createPersistedState({})(store)
}

export default plugin
