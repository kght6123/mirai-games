<template>
  <div
    v-if="$store.getters['organismModels/OrganismSignInAndOut/isLogin']"
    class="pb-2"
  >
    <atom-button v-if="roomId === ''" @click="generageRoom" class="btn--primary"
      >Create room</atom-button
    >
    <p v-if="roomId !== ''" class="mb-2">
      クリップボードに部屋のURLを貼り付けました、SNSやチャットを使って他の参加者に伝えてください。
    </p>
    <atom-button v-if="roomId !== ''" @click="gotoRoom" class="btn--primary"
      >Move room</atom-button
    >
    <atom-textbox v-model="roomId" class="hidden" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getters, RootState } from '~/store'
export default Vue.extend({
  data() {
    return {
      isLogin: false,
      roomId: '',
    }
  },
  computed: {
    bar: {
      get(): String {
        return 'foo'
      },
      /* set(value: any): void {}, */
    },
  },
  async created(): Promise<void> {},
  mounted() {
    // this.$nuxt.$loading.start()
    this.$nextTick(() => {
      setTimeout(() => {
        // this.$nuxt.$loading.finish()
        console.log('this.$store.getters', this.$store.getters)
      }, 250)
    })
  },
  methods: {
    foo(bar: String) {},
    generageRoom() {
      console.log('click!!')
      this.roomId = this.$firestore.collection('jinro-room').doc().id
      navigator.clipboard.writeText(`${location.origin}/${this.roomId}`)
    },
    gotoRoom() {
      this.$router.push({
        name: 'jinroRoom-roomId',
        params: { roomId: this.roomId },
      })
    },
  },
})
</script>
