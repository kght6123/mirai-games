<template>
  <div>
    <organism-waiting-member :roomId="$route.params.roomId" />
    <organism-sign-in-and-out />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      roomId: this.$route.params.roomId,
    }
  },
})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
