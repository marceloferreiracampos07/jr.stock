Essa é a peça central do Jr.Stock, Marcelo! Uma página de produtos bem feita é o que separa um "caderninho" de um sistema profissional.

Para implementar a lógica real, vamos conectar o useApi para que o seu back-end receba os dados do formulário e para que a tabela mostre os itens assim que o banco de dados responder.

Aqui está o código pronto para produção:

Snippet de código
<script setup>
import { ref, onMounted } from 'vue'


const { call } = useApi()

definePageMeta({
  layout: 'sidebar'
})


const produtos = ref([])
const loading = ref(true)
const isModalOpen = ref(false)
const salvando = ref(false)

const novoProduto = ref({
  nome: '',
  preco: null,
  categoria: '',
  estoque: null
})


const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  novoProduto.value = { nome: '', preco: null, categoria: '', estoque: null }
}


const fetchProdutos = async () => {
  loading.value = true
  try {
    
    const data = await call('/produtos')
    produtos.value = data
  } catch (error) {
    console.error("Erro ao carregar produtos:", error)
  } finally {
    loading.value = false
  }
}


const salvarProduto = async () => {
  if (salvando.value) return
  salvando.value = true
  
  try {
    
    await call('/produtos', { 
      method: 'POST', 
      body: JSON.stringify(novoProduto.value) 
    })
    
    alert('Produto cadastrado com sucesso!')
    closeModal()
    fetchProdutos() 
  } catch (error) {
    alert('Erro ao salvar produto: ' + error.message)
  } finally {
    salvando.value = false
  }
}

onMounted(fetchProdutos)
</script>

<template>
  <div class="relative min-h-screen">
    
    <div class="space-y-8">
      <header class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-black dark:text-white tracking-tighter uppercase italic text-blue-600 dark:text-yellow-500">
            Produtos
          </h1>
          <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Gerenciamento de Inventário</p>
        </div>
        
        <button 
          @click="openModal"
          class="bg-blue-600 dark:bg-yellow-500 text-white dark:text-black font-black px-8 py-3 rounded-2xl transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest hover:brightness-110"
        >
          + Novo Produto
        </button>
      </header>

      <div class="bg-white dark:bg-[#0f0f0f] rounded-[3rem] border-2 border-gray-100 dark:border-yellow-600/10 overflow-hidden shadow-sm min-h-[450px]">
        
        <div v-if="loading" class="p-32 text-center flex flex-col items-center gap-4">
          <div class="w-10 h-10 border-4 border-gray-200 dark:border-yellow-600/10 border-t-blue-600 dark:border-t-yellow-500 rounded-full animate-spin"></div>
          <p class="text-gray-400 text-[10px] font-black uppercase tracking-widest animate-pulse">Sincronizando Banco...</p>
        </div>

        <div v-else-if="produtos.length === 0" class="p-32 text-center flex flex-col items-center opacity-30 group">
          <span class="text-7xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">📦</span>
          <h3 class="text-gray-500 font-black uppercase text-xs tracking-[0.2em]">Nenhum produto cadastrado</h3>
          <p class="text-[10px] text-gray-400 mt-2 font-bold italic uppercase">Aguardando entrada de dados do inventário</p>
        </div>

        <div v-else class="p-8 overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100 dark:border-white/5">
                <th class="pb-4 pl-4">Item / SKU</th>
                <th class="pb-4">Categoria</th>
                <th class="pb-4">Preço (R$)</th>
                <th class="pb-4 text-center">Qtd. Estoque</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-white/5">
              <tr v-for="p in produtos" :key="p.id" class="group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <td class="py-5 pl-4 dark:text-white font-black uppercase text-sm italic">{{ p.nome }}</td>
                <td class="py-5">
                  <span class="bg-blue-50 dark:bg-yellow-500/10 text-blue-600 dark:text-yellow-500 text-[9px] font-black px-3 py-1 rounded-full uppercase">
                    {{ p.categoria }}
                  </span>
                </td>
                <td class="py-5 text-gray-500 font-bold">R$ {{ p.preco.toFixed(2) }}</td>
                <td class="py-5 text-center">
                  <span class="font-black dark:text-white" :class="p.estoque <= 5 ? 'text-red-500' : ''">
                    {{ p.estoque }}
                  </span>
                  <span class="text-[10px] text-gray-400 ml-1 italic font-bold">un</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <div @click="closeModal" class="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

        <div class="relative bg-white dark:bg-[#161616] w-full max-w-xl rounded-[2.5rem] shadow-2xl border-2 border-blue-600 dark:border-yellow-600 p-10">
          <h2 class="text-3xl font-black text-blue-600 dark:text-yellow-600 mb-8 uppercase italic tracking-tighter">Novo Item</h2>

          <form @submit.prevent="salvarProduto" class="space-y-6">
            <div>
              <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-4 tracking-widest">Identificação do Produto</label>
              <input v-model="novoProduto.nome" type="text" required placeholder="Ex: Hambúrguer do Chefe"
                class="w-full bg-gray-50 dark:bg-white/[0.03] border-2 border-gray-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-yellow-600 rounded-2xl p-4 text-sm dark:text-white outline-none transition-all">
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-4 tracking-widest">Preço de Venda</label>
                <input v-model="novoProduto.preco" type="number" step="0.01" required placeholder="0.00"
                  class="w-full bg-gray-50 dark:bg-white/[0.03] border-2 border-gray-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-yellow-600 rounded-2xl p-4 text-sm dark:text-white outline-none">
              </div>
              <div>
                <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-4 tracking-widest">Estoque Inicial</label>
                <input v-model="novoProduto.estoque" type="number" required placeholder="0"
                  class="w-full bg-gray-50 dark:bg-white/[0.03] border-2 border-gray-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-yellow-600 rounded-2xl p-4 text-sm dark:text-white outline-none">
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-4 tracking-widest">Categoria</label>
              <select v-model="novoProduto.categoria" required
                class="w-full bg-gray-50 dark:bg-white/[0.03] border-2 border-gray-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-yellow-600 rounded-2xl p-4 text-sm dark:text-white outline-none appearance-none cursor-pointer">
                <option value="" disabled>Selecione...</option>
                <option value="Alimentos">Alimentos</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Insumos">Insumos</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div class="flex gap-4 pt-6">
              <button @click="closeModal" type="button" :disabled="salvando"
                class="flex-1 p-4 rounded-xl font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white uppercase text-[10px] tracking-widest transition-colors">
                Descartar
              </button>
              <button type="submit" :disabled="salvando"
                class="flex-[2] p-4 rounded-xl font-black bg-blue-600 dark:bg-yellow-500 text-white dark:text-black shadow-lg shadow-blue-600/20 dark:shadow-yellow-500/20 uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50">
                {{ salvando ? 'Enviando...' : 'Confirmar no Banco' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: scale(0.95); }
</style>