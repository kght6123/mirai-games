<template>
  <div v-if="state.login === true" class="pb-2">
    <button v-if="roomId === ''" @click="generageRoom" class="btn--primary">
      部屋を作る
    </button>
    <p v-if="roomId !== ''" class="mb-2">
      クリップボードに部屋のURLを貼り付けました、SNSやチャットを使って他の参加者に伝えてください。
    </p>
    <button v-if="roomId !== ''" @click="gotoRoom" class="btn--primary">
      部屋へ移動する
    </button>
    <input v-model="roomId" type="hidden" class="hidden" />
  </div>
</template>

<script>
// vue
import { defineComponent, ref, onMounted } from "vue";
// stores
import { useFbAuthStore } from "../stores/LoginAndLogout";
// router
import { useRoute, useRouter } from "vue-router";
// firebase
import * as firebase from "firebase/app";
import "firebase/firestore";

export default defineComponent({
  name: "CreateRoom",
  setup() {
    console.log("setup!");

    // router
    const router = useRouter();
    // const route = useRoute();

    // store
    const { state } = useFbAuthStore();

    // life cicle
    onMounted(async () => {
      console.log("mounted!");
    });

    // Data
    let roomId = ref("");

    // Method
    const generageRoom = async () => {
      console.log("click!!");
      roomId.value = await firebase.default.firestore().collection("jinro-room").doc()
        .id;
      console.log(roomId)
      navigator.clipboard.writeText(`${location.origin}/wordWolf/${roomId.value}`);
    };
    const gotoRoom = () => {
      router.push({
        name: "wordWolf-roomId",
        params: { roomId: roomId.value },
      });
    };

    return {
      state,
      roomId,
      generageRoom,
      gotoRoom,
    };
  },
});
</script>
