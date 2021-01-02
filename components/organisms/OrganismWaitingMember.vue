<template>
  <div
    class="pb-2"
    v-if="$store.getters['organismModels/OrganismSignInAndOut/isLogin']"
  >
    jinro-room-id {{ roomId }}
    <atom-button @click="entryRoom" class="btn--primary">Entry</atom-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    roomId: { type: String, required: true },
  },
  mounted() {
    // this.$nuxt.$loading.start()
    this.$nextTick(() => {
      setTimeout(() => {
        // this.$nuxt.$loading.finish()
      }, 250)
    })
  },
  methods: {
    entryRoom() {
      // 参加登録をする
      // console.log('this', this)
      // $accessor["organismModels"].OrganismWaitingMember.entryMember
      this.$accessor.organismModels.OrganismWaitingMember.entryMember(
        this.roomId as string
      )
    },
  },
})
</script>
