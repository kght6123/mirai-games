<template>
  <div
    class="pb-2"
    v-if="state.login === true"
  >
    jinro-room-id {{ roomId }}
    <input type="text"
      v-model="state.nickname"
      id="nickname"
      placeholder="ニックネームを入力してください"
      />
    <button @click="entryRoom" class="btn--primary">エントリーする</button>
  </div>
</template>

<script>
// vue
import { defineComponent, defineProps, ref, onMounted } from "vue";
// stores
import { useFbAuthStore } from "../stores/LoginAndLogout";
// router
import { useRoute, useRouter } from "vue-router";
// firebase
// import * as firebase from "firebase/app";
// import "firebase/firestore";

export default defineComponent({
  name: "EntryMember",
  props: {
    roomId: {
      type: String,
      required: true
    },
  },
  setup(props) {
    console.log("setup!", props.roomId);

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

    // Method
    const entryRoom = async () => {
      // 参加登録をする
      if (!state.nickname) {
        alert('ニックネームを入力してください。')
        return
      }
      // await this.$accessor.organismModels.OrganismWaitingMember.entryMember(
      //   roomId
      // )
      // 参加登録済みに移動する
      router.push({
        name: 'jinroRoom-roomId-entryUsers-fbLoginUid',
        params: {
          roomId: props.roomId,
          fbLoginUid: state.fbUser.uid,
        },
      })
    }

    return {
      state,
      entryRoom,
    };
  },
});
</script>
