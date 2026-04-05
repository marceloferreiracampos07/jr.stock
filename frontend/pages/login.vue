<script setup>
import { ref } from 'vue'

// Nuxt importa automaticamente seu useApi
const { call } = useApi()

definePageMeta({
  layout: 'default' 
})

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) return
  
  loading.value = true
  
  try {
    // Chamada para a rota de sessões do seu back-end
    const response = await call('/sessions', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        senha: password.value
      })
    })

    // Salva o Token e os dados básicos do usuário
    // O prefixo '@jrstock:' ajuda a organizar o localStorage
    localStorage.setItem('@jrstock:token', response.token)
    localStorage.setItem('@jrstock:user', JSON.stringify(response.user))

    console.log('Login realizado com sucesso!')
    
    // Redireciona para o Dashboard agora autenticado
    navigateTo('/dashboard') 
    
  } catch (error) {
    alert(error.message || 'E-mail ou senha incorretos.')
    console.error('Erro no login:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-black p-4 transition-colors duration-300">
    
    <div class="bg-white dark:bg-zinc-950 rounded-3xl shadow-xl dark:shadow-yellow-500/5 p-6 md:p-10 flex flex-col md:flex-row gap-10 max-w-5xl w-full border dark:border-zinc-800 transition-all">
      
      <div class="md:w-1/2 flex flex-col items-center justify-center p-6 md:border-r border-gray-100 dark:border-zinc-800">
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-800 dark:text-yellow-500 mb-6 flex items-center gap-2 justify-center italic tracking-tighter">
            Jr.<span class="text-blue-600 dark:text-white uppercase font-black">Stock</span>
          </p>

          <h2 class="text-3xl md:text-5xl font-black text-gray-800 dark:text-white leading-tight uppercase italic">
            Estoque que dá <br>
            <span class="dark:text-yellow-500 text-blue-600">Qualidade e performance</span>
          </h2>
          
          <p class="text-gray-500 dark:text-zinc-400 mt-4 max-w-sm mx-auto text-sm font-medium">
            O melhor lugar para gerenciar o inventário da <span class="font-bold text-gray-800 dark:text-yellow-500">sua empresa</span>.
          </p>
        </div>
      </div>

      <div class="md:w-1/2 flex items-center justify-center p-6">
        <div class="max-w-md w-full">
          <header class="mb-8 text-center md:text-left">
            <h3 class="text-xl font-black text-gray-800 dark:text-white uppercase tracking-widest italic">
              Acesse sua conta 
            </h3>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Insira suas credenciais abaixo</p>
          </header>
          
          <form @submit.prevent="handleLogin" class="space-y-6">
            <AppInput 
              v-model="email" 
              label="E-mail" 
              type="email" 
              placeholder="seu@email.com" 
              required 
              :disabled="loading"
              class="rounded-xl dark:bg-zinc-900 dark:border-zinc-700 dark:text-white h-12"
            />
            
            <AppInput 
              v-model="password" 
              label="Senha" 
              type="password" 
              placeholder="••••••••" 
              required 
              :disabled="loading"
              class="rounded-xl dark:bg-zinc-900 dark:border-zinc-700 dark:text-white h-12"
            />
            
            <div class="pt-4">
              <AppButton 
                type="submit" 
                class="w-full justify-center py-4 bg-blue-600 hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-black rounded-xl text-white font-black uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-blue-600/20 dark:shadow-none active:scale-95 disabled:opacity-50" 
                :disabled="loading"
              >
                {{ loading ? 'Autenticando...' : 'Entrar no Sistema' }}
              </AppButton>
            </div>
          </form>

          <p class="mt-8 text-center text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500">
            Não tem uma conta? 
            <NuxtLink to="/cadastro" class="text-blue-600 dark:text-yellow-500 hover:underline underline-offset-4">
              Inscreva-se agora
            </NuxtLink>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>