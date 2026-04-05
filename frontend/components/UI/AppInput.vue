<template>
  <div class="flex flex-col gap-1 w-full">
    <label v-if="label" class="text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs" 
      class="border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      :class="props.class" 
    />
  </div>
</template>

<script setup>
const props = defineProps(['modelValue', 'label', 'class'])
defineEmits(['update:modelValue'])
</script>