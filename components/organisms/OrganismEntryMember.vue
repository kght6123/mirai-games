<template>
  <div
    class="pb-2"
    v-if="$store.getters['organismModels/OrganismSignInAndOut/isLogin']"
  >
    jinro-room-id {{ roomId }}
    <molcules-textbox-label
      v-model="nickname"
      id="nickname"
      placeholder="ニックネームを入力してください"
      >ニックネーム</molcules-textbox-label
    >
    <atom-button @click="entryRoom" class="btn--primary">Entry</atom-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    roomId: { type: String, required: true },
  },
  data() {
    return {}
  },
  computed: {
    nickname: {
      get(): string {
        return this.$accessor.organismModels.OrganismWaitingMember.getNickname
      },
      set(value: string): void {
        this.$accessor.organismModels.OrganismWaitingMember.setNickname(value)
      },
    },
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
    async entryRoom() {
      // 参加登録をする
      if (!this.nickname) {
        alert('ニックネームを入力してください。')
        return
      }
      console.log('this', this)
      await this.$accessor.organismModels.OrganismWaitingMember.entryMember(
        this.roomId as string
      )
      // 参加登録済みに移動する
      const fbLoginUid = this.$accessor.organismModels.OrganismSignInAndOut
        .fbUserUid
      this.$router.push({
        name: 'jinroRoom-roomId-entryUsers-fbLoginUid',
        params: {
          roomId: this.roomId,
          fbLoginUid: fbLoginUid as string,
        },
      })
    },
  },
})
</script>
