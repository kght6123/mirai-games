<template>
  <div
    class="pb-2"
    v-if="$store.getters['organismModels/OrganismSignInAndOut/isLogin']"
  >
    {{ nickname }}<br />
    <atom-button @click="unEntryRoomAndBack" class="btn--primary"
      >Back</atom-button
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    roomId: { type: String, required: true },
    fbLoginUid: { type: String, required: true },
  },
  data() {
    return {}
  },
  computed: {
    nickname: {
      get(): string {
        return this.$accessor.organismModels.OrganismWaitingMember.getNickname
      },
    },
  },
  mounted() {
    // this.$nuxt.$loading.start()
    this.$nextTick(() => {
      setTimeout(async () => {
        // this.$nuxt.$loading.finish()
        console.log('mounted $nextTick.')
        await this.$accessor.organismModels.OrganismWaitingMember.waitingMember(
          this.roomId as string
        )
      }, 250)
    })
  },
  beforeDestroy() {
    console.log('beforeDestroy.')
    this.$accessor.organismModels.OrganismWaitingMember.doUnsubscribe()
  },
  methods: {
    async unEntryRoomAndBack() {
      await this.$accessor.organismModels.OrganismWaitingMember.doUnsubscribe()
      // 前のページに戻る
      this.$router.back()
    },
  },
})
</script>
