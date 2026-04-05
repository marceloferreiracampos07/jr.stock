<script setup>
import { ref, computed, onMounted } from 'vue'

// Importando o motor de API do Jr.Stock
const { call } = useApi()

definePageMeta({
  layout: 'sidebar'
})

// --- ESTADOS ---
const loading = ref(true)
const movimentacoes = ref([]) 
const filtroTipo = ref('todos')

// --- BUSCA DE DADOS REAIS ---
const fetchMovimentacoes = async () => {
  loading.value = true
  try {
    // Chamada real para o seu Back-end
    // A rota deve retornar { id, produto: { nome }, tipo, quantidade, data }
    const data = await call('/movimentacoes')
    
    // Mapeamos para garantir que a estrutura case com o seu template
    movimentacoes.value = data.map(m => ({
      id: m.id,
      produto: m.produto?.nome || 'Produto Indisponível',
      tipo: m.tipo, // 'entrada' ou 'saida'
      qtd: m.quantidade
    }))
    
  } catch (error) {
    console.error("Erro ao carregar movimentações do banco:", error)
  } finally {
    loading.value = false
  }
}

// --- LÓGICA DE FILTRO ---
const listaFiltrada = computed(() => {
  if (filtroTipo.value === 'todos') {
    return movimentacoes.value
  }
  return movimentacoes.value.filter(item => item.tipo === filtroTipo.value)
})

onMounted(() => {
  fetchMovimentacoes()
})
</script>

<template>
  <div class="space-y-8">
    
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-black dark:text-white tracking-tighter uppercase italic text-blue-600 dark:text-yellow-500">
          Movimentações
        </h1>
        <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Fluxo de estoque em tempo real</p>
      </div>

      <div class="flex bg-gray-100 dark:bg-white/5 p-1 rounded-2xl border border-gray-100 dark:border-white/5 shadow-inner">
        <button 
          v-for="tipo in ['todos', 'entrada', 'saida']" 
          :key="tipo"
          @click="filtroTipo = tipo"
          class="px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all tracking-widest capitalize"
          :class="[
            filtroTipo === tipo 
              ? 'bg-white dark:bg-white/10 shadow-md dark:text-white scale-105' 
              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
            filtroTipo === 'entrada' && tipo === 'entrada' ? 'text-green-500 !important' : '',
            filtroTipo === 'saida' && tipo === 'saida' ? 'text-red-500 !important' : ''
          ]"
        >
          {{ tipo }}
        </button>
      </div>
    </header>

    <div class="bg-white dark:bg-[#0f0f0f] rounded-[3rem] border-2 border-gray-100 dark:border-yellow-600/10 overflow-hidden shadow-sm min-h-[450px] flex flex-col transition-all duration-500">
      <table class="w-full text-left">
        <thead>
          <tr class="text-gray-400 text-[10px] uppercase font-black border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
            <th class="p-8">Produto / Item</th>
            <th class="p-8 text-center">Tipo de Fluxo</th>
            <th class="p-8 text-center">Qtd. Movimentada</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-white/5 flex-1">
          
          <tr v-if="loading">
            <td colspan="3" class="p-32 text-center">
              <div class="flex flex-col items-center gap-4">
                <div class="w-10 h-10 border-4 border-gray-200 dark:border-yellow-600/10 border-t-blue-600 dark:border-t-yellow-500 rounded-full animate-spin"></div>
                <p class="text-gray-400 text-[10px] font-black uppercase tracking-widest animate-pulse">Sincronizando Banco...</p>
              </div>
            </td>
          </tr>

          <template v-else-if="listaFiltrada.length > 0">
            <tr v-for="item in listaFiltrada" :key="item.id" class="group hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-all">
              <td class="p-8 font-black dark:text-white uppercase tracking-tight text-sm">
                {{ item.produto }}
              </td>
              <td class="p-8">
                <div class="flex justify-center">
                  <span 
                    :class="item.tipo === 'entrada' 
                      ? 'text-green-500 bg-green-500/10 border-green-500/20' 
                      : 'text-red-500 bg-red-500/10 border-red-500/20'"
                    class="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all group-hover:scale-110"
                  >
                    {{ item.tipo === 'entrada' ? '↑ Entrada' : '↓ Saída' }}
                  </span>
                </div>
              </td>
              <td class="p-8 text-center">
                <span class="font-black dark:text-white text-lg tracking-tighter">{{ item.qtd }}</span>
                <span class="text-[10px] text-gray-400 ml-1 italic font-bold uppercase">un</span>
              </td>
            </tr>
          </template>
          
          <tr v-else>
            <td colspan="3" class="p-32 text-center">
              <div class="flex flex-col items-center opacity-30 group transition-all duration-700">
                <span class="text-7xl mb-6 grayscale group-hover:grayscale-0 group-hover:rotate-12 transition-all duration-500">📊</span>
                <p class="text-gray-500 font-black uppercase text-xs tracking-[0.3em]">
                  Nenhum registro de {{ filtroTipo }}
                </p>
                <p class="text-[9px] text-gray-400 mt-3 font-bold">Aguardando novas movimentações no banco de dados...</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>