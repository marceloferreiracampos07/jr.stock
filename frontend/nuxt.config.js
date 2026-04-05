// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 1. Módulos: Adicionado o modo de cor junto ao Tailwind
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],

  // 2. Configuração do Modo de Cor (Preto e Amarelo)
  colorMode: {
    classSuffix: '',    // Mantém a classe como 'dark' (padrão Tailwind)
    preference: 'system', // Tenta seguir o tema do Windows, mas você pode forçar 'light' ou 'dark'
    fallback: 'light',
    storageKey: 'nuxt-color-mode'
  },

  // 3. Suas configurações de estabilidade para Windows (IPC/HMR)
  vite: {
    server: {
      watch: {
        usePolling: true, // Evita que o Nuxt pare de atualizar no Windows
      },
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
  },

  // 4. Configuração de Componentes (Auto-import das suas pastas)
  components: [
    {
      path: '~/components/UI',
      pathPrefix: false, // Permite usar <AppInput /> em vez de <UiAppInput />
    },
    '~/components'
  ],

  // 5. Configurações padrão do Nuxt
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})