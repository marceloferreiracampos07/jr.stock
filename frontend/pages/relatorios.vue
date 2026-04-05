Para fechar o ecossistema do Jr.Stock, essa tela de Business Intelligence (BI) é o que vai permitir ao gerente do restaurante tomar decisões baseadas em dados reais, e não apenas no "olhômetro".

Para a implementação real, vamos usar o useApi para buscar os agregados (Somas e Contagens) do banco. No back-end, você provavelmente usará algo como SUM(preco * quantidade) para o valor em estoque.

Aqui está a implementação conectada:

Snippet de código
<script setup>
import { ref, onMounted } from 'vue'

// Importando o motor de API do Jr.Stock
const { call } = useApi()

definePageMeta({
  layout: 'sidebar'
})

// --- ESTADOS ---
const loading = ref(true)
const periodoSelecionado = ref('mes')

// --- DADOS DO BANCO ---
const estatisticas = ref({
  totalEntradas: 0,
  totalSaidas: 0,
  valorEstoque: 0,
  giroEstoque: 0
})

// --- CHAMADA AO BACK-END ---
const fetchRelatorios = async () => {
  loading.value = true
  try {
    // Chamada real: enviamos o período como query para o back-end filtrar no SQL
    const response = await call('/relatorios', {
      method: 'GET',
      params: { periodo: periodoSelecionado.value }
    })
    
    // Mapeando a resposta do banco para o estado do front
    estatisticas.value = {
      totalEntradas: response.totalEntradas || 0,
      totalSaidas: response.totalSaidas || 0,
      valorEstoque: response.valorEstoque || 0,
      giroEstoque: response.giroEstoque || 0
    }
  } catch (error) {
    console.error("Erro ao buscar métricas do banco:", error)
    // Fallback para não quebrar a UI
    estatisticas.value = { totalEntradas: 0, totalSaidas: 0, valorEstoque: 0, giroEstoque: 0 }
  } finally {
    loading.value = false
  }
}

const exportarPDF = async () => {
  alert('Gerando relatório consolidado do banco de dados...')
  // Dica: Para PDF real no Nuxt, você pode usar a biblioteca 'jspdf' ou 'html2pdf.js'
  console.log('Exportação solicitada para o período:', periodoSelecionado.value)
}

onMounted(fetchRelatorios)
</script>

<template>
  <div class="space-y-8 px-4">
    
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        <h1 class="text-3xl font-black dark:text-white tracking-tighter uppercase italic text-blue-600 dark:text-yellow-500">
          Relatórios & Métricas
        </h1>
        <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Business Intelligence</p>
      </div>

      <div class="flex gap-3">
        <select v-model="periodoSelecionado" @change="fetchRelatorios" 
          class="bg-gray-100 dark:bg-white/5 border-2 border-transparent focus:border-blue-600 dark:focus:border-yellow-600 rounded-xl px-4 py-2 text-xs font-black uppercase outline-none dark:text-white transition-all cursor-pointer">
          <option value="hoje">Hoje</option>
          <option value="semana">Esta Semana</option>
          <option value="mes">Este Mês</option>
        </select>

        <button @click="exportarPDF" 
          class="bg-blue-600 dark:bg-yellow-500 text-white dark:text-black font-black px-6 py-2 rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95">
          Exportar PDF
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="(val, label) in {
        'Produtos Entregues': estatisticas.totalEntradas,
        'Produtos Saídos': estatisticas.totalSaidas,
        'Valor em Stock': 'R$ ' + (estatisticas.valorEstoque || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
        'Giro de Estoque': (estatisticas.giroEstoque || 0) + '%'
      }" :key="label" 
      class="bg-white dark:bg-[#0f0f0f] p-8 rounded-[2.5rem] border-2 border-gray-100 dark:border-yellow-600/10 hover:border-blue-600 dark:hover:border-yellow-600 transition-all group shadow-sm">
        <p class="text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest group-hover:text-blue-600 dark:group-hover:text-yellow-500 transition-colors">
          {{ label }}
        </p>
        <p class="text-3xl font-black dark:text-white tracking-tighter">
          {{ loading ? '---' : val }}
        </p>
      </div>
    </div>

    <div class="bg-white dark:bg-[#0f0f0f] rounded-[3rem] border-2 border-gray-100 dark:border-yellow-600/5 p-10 min-h-[400px] flex flex-col transition-all">
      <div class="flex justify-between items-center mb-10">
        <h3 class="font-black uppercase text-xs tracking-widest dark:text-white opacity-50 italic">Distribuição de Fluxo de Insumos</h3>
        <div class="flex gap-2">
           <div class="w-2 h-2 rounded-full bg-blue-600"></div>
           <div class="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
        </div>
      </div>

      <div class="flex-1 flex flex-col items-center justify-center text-center">
        <div v-if="loading" class="flex flex-col items-center gap-4">
          <div class="w-12 h-12 border-4 border-gray-200 dark:border-yellow-600/10 border-t-blue-600 dark:border-t-yellow-600 rounded-full animate-spin mb-4"></div>
          <p class="text-gray-400 text-[10px] font-black uppercase tracking-widest animate-pulse">Processando Inteligência...</p>
        </div>
        
        <template v-else-if="estatisticas.totalEntradas === 0 && estatisticas.totalSaidas === 0">
          <span class="text-7xl mb-6 grayscale opacity-20">📈</span>
          <p class="text-xs font-black uppercase tracking-[0.4em] dark:text-white opacity-30">Aguardando Conexão</p>
          <p class="text-[9px] mt-2 font-bold uppercase text-gray-500 italic opacity-40 max-w-xs leading-relaxed">
            As métricas de BI serão renderizadas assim que o banco de dados registrar a primeira movimentação de estoque.
          </p>
        </template>

        <div v-else class="w-full h-full flex items-end justify-around gap-4 px-10">
           <div class="w-20 bg-blue-600 rounded-t-3xl transition-all duration-1000" :style="{ height: (estatisticas.totalEntradas * 2) + 'px' }"></div>
           <div class="w-20 bg-yellow-500 rounded-t-3xl transition-all duration-1000" :style="{ height: (estatisticas.totalSaidas * 2) + 'px' }"></div>
           <p class="absolute bottom-20 text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">Dados Ativos</p>
        </div>
      </div>
    </div>

  </div>
</template>