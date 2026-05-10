<script setup>
import { ref } from 'vue'


const { call } = useApi()

definePageMeta({
  layout: 'default' 
})

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value) {
    alert('Por favor, preencha todos os campos.')
    return
  }

  loading.value = true
  
  try {
    
    await call('/usuarios', {
      method: 'POST',
      body: JSON.stringify({
        nome: name.value,
        email: email.value,
        senha: password.value,
        cargo: 'admin' 
      })
    })

    console.log('Conta criada com sucesso!')
    alert('Sua conta no jr.stock foi criada!')
    
    
    navigateTo('/') 
    
  } catch (error) {
    
    alert(error.message || 'Erro ao registrar. Verifique se o e-mail já existe.')
    console.error('Erro ao registrar:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[85vh] flex items-center justify-center p-4 transition-colors duration-300">
    
    <div class="bg-white dark:bg-[#0f0f0f] w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[580px] border border-gray-100 dark:border-white/5 transition-all duration-300">
      
      <div class="md:w-1/2 flex flex-col items-center justify-center p-10 text-center bg-gray-50/50 dark:bg-transparent">
        <div class="z-10">
          <p class="text-xl font-bold text-gray-800 dark:text-white mb-12 tracking-tight">
            Jr. <span class="dark:text-yellow-600 text-blue-600 font-black">Stock</span>
          </p>

          <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-6 gap-6">
            Estoque que dá <br>
            <span class="text-white-500 dark:text-yellow-500 ">Qualidade e performance</span>
          </h2>
          
          <p class="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto leading-relaxed font-medium">
            O melhor lugar para gerenciar o inventário da <span class="text-gray-600 dark:text-yellow-500 font-bold">sua empresa</span>.
          </p>
        </div>
      </div>

      <div class="hidden md:block w-[1px] bg-gray-200 dark:bg-white/10 my-16"></div>

      <div class="md:w-1/2 flex items-center justify-center p-10">
        <div class="w-full max-w-sm">
          <header class="mb-8 text-center md:text-left">
            <h3 class="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
              Cadastre sua conta 
            </h3>
            <p class="text-gray-400 dark:text-gray-500 text-xs mt-2 font-medium">Preencha os dados abaixo para começar</p>
          </header>
          
          <form @submit.prevent="handleRegister" class="space-y-5">
            <AppInput 
              v-model="name" 
              label="Nome Completo" 
              placeholder="Ex: João Silva" 
              required 
              :disabled="loading"
              class="bg-gray-50 dark:!bg-[#1a1a1a] border border-gray-200 dark:!border-white/10 text-gray-800 dark:!text-white rounded-xl h-12"
            />

            <AppInput 
              v-model="email" 
              label="E-mail" 
              type="email" 
              placeholder="seu@email.com" 
              required 
              :disabled="loading"
              class="bg-gray-50 dark:!bg-[#1a1a1a] border border-gray-200 dark:!border-white/10 text-gray-800 dark:!text-white rounded-xl h-12"
            />
            
            <AppInput 
              v-model="password" 
              label="Senha" 
              type="password" 
              placeholder="••••••••" 
              required 
              :disabled="loading"
              class="bg-gray-50 dark:!bg-[#1a1a1a] border border-gray-200 dark:!border-white/10 text-gray-800 dark:!text-white rounded-xl h-12"
            />
            
            <div class="pt-4">
              <AppButton 
                type="submit" 
                class="w-full py-4 bg-blue-600 hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-black text-white font-bold rounded-xl hover:scale-105 text-md shadow-lg shadow-blue-100 dark:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                :disabled="loading"
              >
                {{ loading ? 'Criando conta...' : 'Cadastrar-se' }}
              </AppButton>
            </div>
          </form>

          <footer class="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
            Já tem uma conta? 
            <NuxtLink to="/" class="font-bold text-blue-600 dark:text-yellow-500 hover:underline underline-offset-4">
                Fazer login
            </NuxtLink>
          </footer>
        </div>
      </div>

    </div>
  </div>
</template>