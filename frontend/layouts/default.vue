<template>
  <div class="min-h-screen transition-colors duration-300 bg-white dark:bg-black">
    
    <nav class="flex items-center justify-between p-6 bg-transparent">
      <div class="text-2xl font-bold text-blue-600 dark:text-white">
        Jr.<span class="text-blue-600 dark:text-yellow-500">Estoque</span>
      </div>
      
      <div class="flex items-center gap-4">
        <NuxtLink to="/cadastro" class="px-4 py-2 rounded-full dark:bg-yellow-400 bg-blue-600 font-semibold text-sm hover:scale-105">
          Cadastre-se
        </NuxtLink>
        <NuxtLink to="/login" class="px-4 py-2 rounded-full dark:bg-yellow-400 bg-blue-600 font-semibold text-sm hover:scale-105">
          Login
        </NuxtLink>
        <ThemeToggle />
      </div>
    </nav>

    <main>
      <slot />
    </main>

  </div>
</template>