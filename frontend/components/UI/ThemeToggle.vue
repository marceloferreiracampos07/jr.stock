<script setup>
const colorMode = useColorMode()

// Função para alternar entre light e dark
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    @click="toggleTheme"
    class="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 transition-all hover:bg-gray-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-yellow-500 dark:hover:bg-zinc-800"
    aria-label="Alternar modo de cor"
  >
    <svg
      v-if="colorMode.value === 'dark'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 fill-current"
      viewBox="0 0 24 24"
    >
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
    </svg>

    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 fill-current"
      viewBox="0 0 24 24"
    >
      <path d="M12.1 2.9c.8-.1 1.5.7 1.3 1.5-.9 3.1.1 6.5 2.6 8.7 2.3 2 5.5 2.6 8.4 1.6.8-.3 1.5.5 1.1 1.2-1.9 3.5-5.3 5.9-9.5 6.1-5.9.3-11-4.2-11.4-10.1C4.2 6.9 7.4 3.4 12.1 2.9z"/>
    </svg>
  </button>
</template> 