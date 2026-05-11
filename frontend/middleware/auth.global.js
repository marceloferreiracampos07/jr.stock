export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;

  const token = localStorage.getItem('@jrstock:token');

  if (!token && to.path !== '/login') {
    return navigateTo('/login');
  }

  if (token && to.path === '/login') {
    return navigateTo('/');
  }
});
