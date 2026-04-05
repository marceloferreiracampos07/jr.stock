Essa página de Fornecedores está com um design de interface (UI) impecável, Marcelo! O modal com o efeito pop e o fundo em backdrop-blur dão um ar de aplicação premium ao jr.stock.

Para implementar a lógica real, vamos substituir as simulações pelo seu useApi. Note que, como você está usando nomes de campos como contato e categoria, certifique-se de que sua Migration no Back-end tenha esses nomes (ou ajuste no body da requisição).

Aqui está a implementação completa:

Snippet de código
<script setup>
import { ref, onMounted } from 'vue'

// Importando o motor de API do jr.stock
const { call } = useApi()

definePageMeta({
  layout: 'sidebar'
})

// --- ESTADOS ---
const loading = ref(true)
const fornecedores = ref([])
const isModalOpen = ref(false)
const submetendo = ref(false) // Para evitar cliques duplos no botão de salvar

const novoFornecedor = ref({
  nome: '',
  cnpj: '',
  contato: '',
  categoria: ''
})

// BUSCAR FORNECEDORES DO BANCO
const fetchFornecedores = async () => {
  loading.value = true
  try {
    // Chamada real para a API do back-end
    const data = await call('/fornecedores')
    fornecedores.value = data
  } catch (error) {
    console.error('Erro ao carregar fornecedores:', error.message)
  } finally {
    loading.value = false
  }
}

// CADASTRAR NOVO FORNECEDOR
const handleSubmit = async () => {
  if (!novoFornecedor.value.nome) return alert('O nome é obrigatório!')
  
  submetendo.value = true
  try {
    await call('/fornecedores', {
      method: 'POST',
      body: JSON.stringify(novoFornecedor.value)
    })
    
    alert('Fornecedor cadastrado com sucesso!')
    closeModal()
    fetchFornecedores() // Recarrega a lista para mostrar o novo
  } catch (error) {
    alert(error.message || 'Erro ao salvar no banco.')
  } finally {
    submetendo.value = false
  }
}

const openModal = () => isModalOpen.value = true
const closeModal = () => {
  isModalOpen.value = false
  novoFornecedor.value = { nome: '', cnpj: '', contato: '', categoria: '' }
}

onMounted(fetchFornecedores)
</script>

<template>
  <div class="space-y-8 px-4">
    
    <header class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-black dark:text-white tracking-tighter uppercase italic text-blue-600 dark:text-yellow-500">Fornecedores</h1>
        <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Database Index</p>
      </div>
      
      <button 
        @click="openModal"
        class="bg-blue-600 dark:bg-yellow-500 text-white dark:text-black font-black px-8 py-3 rounded-2xl transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest hover:brightness-110"
      >
        + Novo Fornecedor
      </button>
    </header>

    <div class="bg-white dark:bg-[#0f0f0f] rounded-[3rem] border border-gray-100 dark:border-yellow-600/20 overflow-hidden shadow-sm min-h-[450px] flex flex-col">
      
      <div v-if="loading" class="flex-1 flex flex-col items-center justify-center">
        <div class="w-10 h-10 border-4 border-gray-200 dark:border-yellow-600/10 border-t-blue-600 dark:border-t-yellow-600 rounded-full animate-spin mb-4"></div>
        <p class="text-gray-400 text-[10px] font-black uppercase tracking-widest animate-pulse">Sincronizando...</p>
      </div>

      <div v-else-if="fornecedores.length === 0" class="flex-1 flex flex-col items-center justify-center p-20 opacity-30">
        <span class="text-6xl mb-4 grayscale">🤝</span>
        <p class="text-gray-500 font-black uppercase text-xs tracking-widest text-center">Nenhum fornecedor encontrado no banco</p>
      </div>

      <div v-else class="p-8 overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100 dark:border-white/5">
              <th class="pb-4 pl-4">Nome / Razão Social</th>
              <th class="pb-4">CNPJ</th>
              <th class="pb-4">Categoria</th>
              <th class="pb-4">Contato</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-white/5">
            <tr v-for="f in fornecedores" :key="f.id" class="group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
              <td class="py-5 pl-4 dark:text-white font-bold text-sm">{{ f.nome }}</td>
              <td class="py-5 text-gray-500 text-xs">{{ f.cnpj || '---' }}</td>
              <td class="py-5">
                <span class="bg-blue-100 dark:bg-yellow-500/10 text-blue-600 dark:text-yellow-500 text-[9px] font-black px-3 py-1 rounded-full uppercase">
                  {{ f.categoria || 'Geral' }}
                </span>
              </td>
              <td class="py-5 text-gray-500 text-xs">{{ f.contato }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Transition name="pop">
      <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <div @click="closeModal" class="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

        <div class="relative bg-white dark:bg-[#161616] w-full max-w-xl rounded-[2.5rem] shadow-2xl border-2 border-blue-600 dark:border-yellow-600 p-10">
          <h2 class="text-3xl font-black text-blue-600 dark:text-yellow-600 mb-8 uppercase italic tracking-tighter">Cadastro</h2>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-4 tracking-[0.2em]">Razão Social</label>
              <input v-model="novoFornecedor.nome" type="text" placeholder="Ex: Nome da Empresa" required
                class="w-full bg-gray-50 dark:bg-white/[0.03] border-2 border-gray-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-yellow-600 rounded-2xl p-4 text-sm text-black dark:text-white outline-none transition-all placeholder:text-gray-600">
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-4 tracking-[0.2em]">CNPJ</label>
                <input v-model="novoFornecedor.cnpj" type="text" placeholder="00.000.000/0001-00"
                  class="w-full bg-gray-50 dark:bg-white/[0.03] border-2 border-gray-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-yellow-600 rounded-2xl p-4 text-sm text-black dark:text-white outline-none transition-all placeholder:text-gray-600">
              </div>
              <div>
                <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-4 tracking-[0.2em]">Contato</label>
                <input v-model="novoFornecedor.contato" type="text" placeholder="(00) 00000-0000"
                  class="w-full bg-gray-50 dark:bg-white/[0.03] border-2 border-gray-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-yellow-600 rounded-2xl p-4 text-sm text-black dark:text-white outline-none transition-all placeholder:text-gray-600">
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-4 tracking-[0.2em]">Categoria</label>
              <input v-model="novoFornecedor.categoria" type="text" placeholder="Bebidas, Alimentos..."
                class="w-full bg-gray-50 dark:bg-white/[0.03] border-2 border-gray-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-yellow-600 rounded-2xl p-4 text-sm text-black dark:text-white outline-none transition-all placeholder:text-gray-600">
            </div>

            <div class="flex gap-4 pt-6">
              <button @click="closeModal" type="button" :disabled="submetendo" class="flex-1 p-4 rounded-xl font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white uppercase text-[10px] tracking-widest transition-colors disabled:opacity-50">
                Descartar
              </button>
              <button type="submit" :disabled="submetendo"
                class="flex-[2] p-4 rounded-xl font-black bg-blue-600 dark:bg-yellow-500 text-white dark:text-black shadow-lg shadow-blue-600/20 dark:shadow-yellow-500/20 uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50">
                {{ submetendo ? 'Processando...' : 'Confirmar no Banco' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

  </div>
</template>