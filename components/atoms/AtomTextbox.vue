<template>
  <input
    :value="value"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="$emit('input', $event.target.value)"
    @search="$emit('search', $event.target.value)"
    @keyup.enter="$emit('enter', $event.target.value)"
  />
</template>
<script>
export default {
  props: {
    type: { type: String, required: false, default: 'text' },
    value: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    disabled: { type: Boolean, required: false, default: false },
  },
}
</script>
