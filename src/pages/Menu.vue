<template>
  <div v-if="state.login === true" class="pb-2">
    <button @click="gotoWordWolf" class="btn--primary">
      ワードウルフを遊ぶ
    </button>
  </div>
</template>

<script>
// vue
import { defineComponent, ref, onMounted } from "vue";
// stores
import { useFbAuthStore } from "../stores/LoginAndLogout";
// router
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Menu",
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

    // Method
    const gotoWordWolf = () => {
      router.push({
        name: "wordWolf-createRoom",
      });
    };

    return {
      state,
      gotoWordWolf,
    };
  },
});
</script>
