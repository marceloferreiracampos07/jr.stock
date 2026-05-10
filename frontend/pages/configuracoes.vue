<script setup>

import { ref, onMounted } from 'vue'


const { call } = useApi()

definePageMeta({
  layout: 'sidebar'
})

const loading = ref(false)


const config = ref({
  nomeEmpresa: '',
  cnpj: '',
  estoqueMinimoGlobal: 5,
  notificacoes: true,
  moeda: 'BRL'
})


onMounted(() => {
  const savedConfig = localStorage.getItem('@jrstock:config')
  if (savedConfig) {
    try {
      config.value = JSON.parse(savedConfig)
    } catch (e) {
      console.error("Erro ao ler configurações locais")
    }
  }
})

const salvarConfig = async () => {
  loading.value = true
  
  try {
    
    localStorage.setItem('@jrstock:config', JSON.stringify(config.value))
    
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    alert('Configurações atualizadas com sucesso!')
  } catch (error) {
    alert('Erro ao salvar configurações.')
  } finally {
    loading.value = false
  }
}

const limparBanco = async () => {
  const confirmar = confirm("ATENÇÃO: Isso apagará TODOS os dados de produtos e estoque do seu MySQL. Deseja continuar?")
  
  if (confirmar) {
    loading.value = true
    try {
      
      
      
      alert('Banco de dados resetado com sucesso (Simulação).')
    } catch (error) {
      alert('Erro ao resetar banco: ' + error.message)
    } finally {
      loading.value = false
    }
  }
}
</script>

<template>
  <div class="space-y-10 px-4 pb-20">
    
    <header>
      <h1 class="text-3xl font-black dark:text-white tracking-tighter uppercase italic text-blue-600 dark:text-yellow-500">
        Configurações
      </h1>
      <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Ajustes do Sistema & Preferências</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      <div class="lg:col-span-2 space-y-8">
        
        <section class="bg-white dark:bg-[#0f0f0f] p-10 rounded-[3rem] border-2 border-gray-100 dark:border-yellow-600/10 shadow-sm transition-all duration-300">
          <h2 class="text-xs font-black uppercase tracking-widest dark:text-white mb-8 flex items-center gap-3">
            <span class="w-2 h-6 bg-blue-600 dark:bg-yellow-500 rounded-full"></span>
            Perfil da Empresa
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-4">Nome de Exibição</label>
              <input v-model="config.nomeEmpresa" type="text" placeholder="Ex: Hamburgueria do Dev"
                class="w-full bg-gray-50 dark:bg-white/[0.03] border-2 border-gray-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-yellow-600 rounded-2xl p-4 text-sm dark:text-white outline-none transition-all">
            </div>
            <div>
              <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-4">CNPJ (Opcional)</label>
              <input v-model="config.cnpj" type="text" placeholder="00.000.000/0001-00"
                class="w-full bg-gray-50 dark:bg-white/[0.03] border-2 border-gray-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-yellow-600 rounded-2xl p-4 text-sm dark:text-white outline-none transition-all">
            </div>
          </div>
        </section>

        <section class="bg-white dark:bg-[#0f0f0f] p-10 rounded-[3rem] border-2 border-gray-100 dark:border-yellow-600/10 shadow-sm transition-all duration-300">
          <h2 class="text-xs font-black uppercase tracking-widest dark:text-white mb-8 flex items-center gap-3">
            <span class="w-2 h-6 bg-blue-600 dark:bg-yellow-500 rounded-full"></span>
            Parâmetros de Inventário
          </h2>

          <div class="flex flex-col md:flex-row gap-10 items-center">
            <div class="flex-1">
              <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-4">Alerta de Estoque Crítico</label>
              <div class="flex items-center gap-4">
                <input v-model.number="config.estoqueMinimoGlobal" type="number" 
                  class="w-24 bg-gray-50 dark:bg-white/[0.03] border-2 border-gray-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-yellow-600 rounded-2xl p-4 text-sm dark:text-white outline-none transition-all text-center">
                <span class="text-[10px] font-bold text-gray-500 uppercase">Unidades restantes</span>
              </div>
            </div>
            
            <div class="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-6 rounded-3xl border border-dashed border-gray-200 dark:border-yellow-600/30">
              <input v-model="config.notificacoes" type="checkbox" class="w-5 h-5 accent-blue-600 dark:accent-yellow-500 cursor-pointer">
              <span class="text-[10px] font-black uppercase dark:text-gray-300 select-none cursor-pointer">Ativar avisos visuais no Dashboard</span>
            </div>
          </div>
        </section>
      </div>

      <aside class="space-y-8">
        <div class="bg-blue-600 dark:bg-yellow-500 p-10 rounded-[3rem] shadow-xl text-white dark:text-black transition-all duration-500">
          <h3 class="font-black uppercase text-xs tracking-widest mb-4">Status da Nuvem</h3>
          <p class="text-[10px] font-bold uppercase opacity-70 mb-6 italic">Banco de dados sincronizado em tempo real</p>
          <button 
            @click="salvarConfig" 
            :disabled="loading"
            class="w-full bg-white dark:bg-black text-blue-600 dark:text-yellow-500 font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-md active:scale-95 disabled:opacity-50">
            {{ loading ? 'Salvando...' : 'Salvar Alterações' }}
          </button>
        </div>

        <div class="bg-red-500/10 border-2 border-red-500/20 p-10 rounded-[3rem] transition-all duration-300">
          <h3 class="font-black uppercase text-xs tracking-widest text-red-500 mb-4">Zona de Perigo</h3>
          <p class="text-[9px] font-bold text-gray-500 uppercase mb-6">Ações irreversíveis no banco de dados</p>
          <button 
            @click="limparBanco"
            :disabled="loading"
            class="w-full border-2 border-red-500 text-red-500 font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95 disabled:opacity-50">
            Limpar Banco de Dados
          </button>
        </div>
      </aside>
    </div>

  </div>
</template>