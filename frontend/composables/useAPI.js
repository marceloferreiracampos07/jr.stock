export const useApi = () => {
  const config = {
    baseURL: 'http://localhost:3333',
  };

  const call = async (endpoint, options = {}) => {
    const token = localStorage.getItem('@jrstock:token');

    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };

    const response = await fetch(`${config.baseURL}${endpoint}`, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro na requisição');
    }

    return response.json();
  };

  return { call };
};