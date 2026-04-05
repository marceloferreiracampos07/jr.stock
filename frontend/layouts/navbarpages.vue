<template>
  <div class="min-h-screen transition-colors duration-300 bg-white dark:bg-black">
    
    <nav class="flex items-center justify-between p-6 bg-transparent">
      <div class="text-2xl font-bold text-blue-600 dark:text-white">
        Jr.<span class="text-blue-600 dark:text-yellow-500">Estoque</span>
      </div>
      
      
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="px-4 py-2 rounded-full dark:bg-yellow-400 bg-blue-600 font-semibold text-sm hover:scale-105">
          Home
        </NuxtLink>
        <NuxtLink to="/produtos" class="px-4 py-2 rounded-full dark:bg-yellow-400 bg-blue-600 font-semibold text-sm hover:scale-105">
          Produtos
        </NuxtLink>
        <NuxtLink to="/movimentacao" class="px-4 py-2 rounded-full dark:bg-yellow-400 bg-blue-600 font-semibold text-sm hover:scale-105">
          Movimentações
        </NuxtLink>
        <NuxtLink to="/relatorios" class="px-4 py-2 rounded-full dark:bg-yellow-400 bg-blue-600 font-semibolt text-sm hover:scale-105">Relatorios
        </NuxtLink>
        <NuxtLink to="/fornecedores" class="px-4 py-2 rounded-full dark:bg-yellow-400 bg-blue-600 font-semibolt text-sm hover:scale-105">Fornecedores
        </NuxtLink>
        <ThemeToggle />
      </div>
    </nav>

    <main>
      <slot/>
    </main>

  </div>
</template>