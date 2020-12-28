<template>
  <select v-model="value1" @change="onchange">
    <option v-for="(label, val) in options" :value="val" :key="val">
      {{ label }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    value1: {
      get() {
        return this.value
      },
      set(_value) {
        this.$emit('input', _value)
      },
    },
  },
  methods: {
    onchange() {
      this.$emit('change', this.value1)
    },
  },
}
</script>
