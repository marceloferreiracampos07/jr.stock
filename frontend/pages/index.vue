<script setup>
import { ref, onMounted, computed } from 'vue'

const { call } = useApi()

definePageMeta({
  layout: 'sidebar'
})


const loading = ref(true)
const dadosDashboard = ref({
  totalProdutos: 0,
  valorTotal: 0,
  alertasEstoque: 0,
  movimentacoesMes: 0
})


const fetchDashboardData = async () => {
  const token = localStorage.getItem('@jrstock:token');
  if (!token) return;

  loading.value = true
  try {
    const produtos = await call('/produtos')
    const movimentacoes = await call('/movimentacoes') 
    
    dadosDashboard.value.totalProdutos = produtos.length
    dadosDashboard.value.valorTotal = produtos.reduce((acc, p) => acc + (p.preco * p.quantidade), 0)
    
    const configSalva = JSON.parse(localStorage.getItem('@jrstock:config') || '{}')
    const estoqueMin = configSalva.estoqueMinimoGlobal || 5
    dadosDashboard.value.alertasEstoque = produtos.filter(p => p.quantidade <= estoqueMin).length
    
    dadosDashboard.value.movimentacoesMes = movimentacoes.length
    
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error)
  } finally {
    loading.value = false
  }
}


const metrics = computed(() => [
  { 
    label: 'Produtos em Estoque', 
    value: loading.value ? '...' : dadosDashboard.value.totalProdutos, 
    icon: '📦', 
    color: 'text-blue-500' 
  },
  { 
    label: 'Valor total', 
    value: loading.value ? '...' : `R$ ${dadosDashboard.value.valorTotal.toFixed(2)}`, 
    icon: '💰', 
    color: 'text-yellow-500' 
  },
  { 
    label: 'Alertas de Estoque', 
    value: loading.value ? '...' : dadosDashboard.value.alertasEstoque, 
    icon: '⚠️', 
    color: 'text-red-500' 
  },
  { 
    label: 'Movimentações (Mês)', 
    value: loading.value ? '...' : dadosDashboard.value.movimentacoesMes, 
    icon: '📈', 
    color: 'text-green-500' 
  },
])

onMounted(fetchDashboardData)
</script>

<template>
  <div class="space-y-8">
    <header class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-black dark:text-yellow-500 tracking-tighter uppercase italic text-blue-600">
          Dashboard
        </h1>
        <p class="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
          Controle de Inventário Jr.Stock
        </p>
      </div>
      
      <button 
        @click="navigateTo('/estoque/novo')"
        class="dark:bg-yellow-500 bg-blue-600 hover:scale-105 text-white dark:text-black font-black px-8 py-3 rounded-2xl transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest"
      >
        + Nova Entrada
      </button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="item in metrics" :key="item.label" 
        class="p-8 rounded-[2.5rem] bg-white dark:bg-[#0f0f0f] border-2 border-gray-100 dark:border-yellow-600/10 shadow-sm transition-all hover:border-blue-600 dark:hover:border-yellow-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-2">{{ item.label }}</p>
            <h3 class="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {{ item.value }}
            </h3>
          </div>
          <span class="text-2xl p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">{{ item.icon }}</span>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-[#0f0f0f] rounded-[3rem] border-2 border-gray-100 dark:border-yellow-600/10 p-12 min-h-[400px] flex flex-col items-center justify-center text-center transition-all">
      
      <div v-if="loading" class="animate-pulse flex flex-col items-center">
        <div class="w-16 h-16 bg-gray-200 dark:bg-white/10 rounded-full mb-4"></div>
        <div class="h-4 w-48 bg-gray-200 dark:bg-white/10 rounded-full"></div>
      </div>

      <template v-else>
        <div class="w-20 h-20 bg-blue-50 dark:bg-yellow-500/5 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
          📊
        </div>
        <h3 class="text-xl font-black text-gray-800 dark:text-yellow-500 uppercase italic tracking-tighter">
          Resumo de Atividades
        </h3>
        <p class="text-gray-500 dark:text-gray-400 text-xs max-w-xs mt-2 font-medium leading-relaxed">
          As estatísticas de vendas e movimentações do seu estoque aparecerão aqui em tempo real.
        </p>
        
        <button 
          v-if="dadosDashboard.totalProdutos === 0"
          @click="navigateTo('/produtos')"
          class="mt-8 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-yellow-500 hover:underline"
        >
          Cadastre seu primeiro produto →
        </button>
      </template>
    </div>
  </div>
</template>