<template>
	<div
    class="pb-2"
    v-if="state.login === true"
  >
    {{ state.nickname }}<br />
		<button @click="unEntryRoomAndBack" class="btn--primary">解除する</button>
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
  name: "WaitingMember",
  props: {
    roomId: {
      type: String,
      required: true
    },
  },
  async setup(props) {
    console.log("setup!", props.roomId);

    // router
    const router = useRouter();
    // const route = useRoute();

    // store
    const { state, doUnsubscribe, entryMember, waitingMember } = useFbAuthStore();

    // life cicle
    onMounted(async () => {
      console.log("mounted!");
			await waitingMember(props.roomId)
    });
		onBeforeUnmount(async () => {
			await doUnsubscribe()
		})

    // Data

    // Method
    const unEntryRoomAndBack = async () => {
			await doUnsubscribe()
      // 前のページに戻る
      router.back()
    }

		await entryMember(
			roomId
		)
    return {
      state,
      unEntryRoomAndBack,
    };
  },
});
</script>
