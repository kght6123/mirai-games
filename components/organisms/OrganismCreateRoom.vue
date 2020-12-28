<template>
  <div>
    <atom-button
      @click="generageRoom"
      class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >部屋を作る</atom-button
    >
    <p v-if="roomId !== ''">
      クリップボードに部屋のURLを貼り付けました、SNSやチャットを使って他の参加者に伝えてください。
    </p>
    <atom-button
      v-if="roomId !== ''"
      @click="gotoRoom"
      class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >部屋に移動する</atom-button
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
        name: 'jinroRoomId',
        params: { jinroRoomId: this.roomId },
      })
    },
  },
})
</script>
