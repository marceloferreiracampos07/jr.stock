<script setup>
defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' }, 
  disabled: Boolean
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="px-4 py-2 rounded font-medium transition-colors duration-200 disabled:opacity-50"
    :class="{
      'bg-blue-600 hover:bg-blue-700 text-white': variant === 'primary',
      'bg-green-600 hover:bg-green-700 text-white': variant === 'success',
      'bg-red-600 hover:bg-red-700 text-white': variant === 'danger'
    }"
  >
    <slot />
  </button>
</template>