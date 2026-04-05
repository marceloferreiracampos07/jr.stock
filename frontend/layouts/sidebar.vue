<script setup>
import { ref } from 'vue'

// Estado da Sidebar
const isSidebarOpen = ref(true)

// Itens do Menu
const menuItems = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Produtos', path: '/produtos', icon: '📦' },
  { name: 'Movimentações', path: '/movimentacao', icon: '🔄' },
  { name: 'Fornecedores', path: '/fornecedores', icon: '🤝' },
  { name: 'Relatórios', path: '/relatorios', icon: '📈' },
  { name: 'Configurações', path: '/configuracoes', icon: '⚙️' },
]
</script>

<template>
  <div class="flex min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
    
    <aside 
      :class="isSidebarOpen ? 'w-64' : 'w-20'" 
      class="bg-white dark:bg-[#0f0f0f] border-r border-gray-100 dark:border-white/5 transition-all duration-300 sticky top-0 h-screen overflow-hidden z-50 shadow-sm"
    >
      <div class="p-6 font-bold text-xl dark:text-white flex items-center gap-3 h-16">
      
        <span v-if="isSidebarOpen" class="transition-opacity duration-300">
          Jr.<span class="text-blue-600 dark:text-yellow-400">Stock</span>
        </span>
      </div>

      <nav class="px-4 space-y-1.5 mt-4">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          class="flex items-center gap-4 p-3 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/5 transition-all group"
          active-class="bg-blue-50 dark:bg-yellow-500/10 !text-blue-600 dark:!text-yellow-500 font-bold"
        >
          <span class="text-xl group-hover:scale-110 transition-transform">{{ item.icon }}</span>
          <span v-if="isSidebarOpen" class="text-sm truncate font-medium dark:text-yellow-400 text-blue-600">{{ item.name }}</span>
        </NuxtLink>
      </nav>
    </aside>

    <main class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      
      <header class="h-16 border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-8 bg-white/50 dark:bg-[#0f0f0f]/50 backdrop-blur sticky top-0 z-40">
        
        <div class="flex items-center">
          <button 
            @click="isSidebarOpen = !isSidebarOpen" 
            class="p-2 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors text-xl"
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>
        </div>

        <div class="flex items-center gap-4">
          <ThemeToggle /> 
          <div class="w-2"></div>
        </div>

      </header>
      
      <div class="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <slot />
      </div>

    </main>
  </div>
</template>

<style scoped>
aside::-webkit-scrollbar {
  display: none;
}
</style>