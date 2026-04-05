<script setup>
defineProps({
  modelValue: Boolean,
  title: String
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold">{{ title }}</h3>
        <button @click="$emit('update:modelValue', false)" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>