<template>
  <div class="relative mb-4">
    <label :for="id" class="leading-7 text-sm text-gray-600">
      <slot></slot>
    </label>
    <atom-textbox
      class="textbox"
      :id="id"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="emitEvent($event, 'input')"
      @search="emitEvent($event, 'search')"
      @enter="emitEvent($event, 'enter')"
    >
    </atom-textbox>
  </div>
</template>
<script>
export default {
  props: {
    id: { type: String, required: false, default: '' },
    type: { type: String, required: false, default: 'text' },
    value: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    disabled: { type: Boolean, required: false, default: false },
  },
  methods: {
    emitEvent(eventValue, eventName) {
      // console.log('MolculesTextboxLabel', eventName, eventValue)
      this.$emit(eventName, eventValue)
    },
  },
}
</script>
