import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Notify} from 'quasar';
import {CreateSchedulerFinance} from 'src/interfaces/models'; // Para notificações de erros

// Criação de instância do Axios com configuração base
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8070/api', // URL base para suas requisições
  timeout: 10000, // Tempo limite
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador de requisições para adicionar headers, tokens, etc.
// api.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     // Exemplo: adicionar token de autenticação
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Interceptador de respostas para tratamento de erros
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Exibir erro como notificação do Quasar
    Notify.create({
      type: 'negative',
      message: error.response?.data?.message || 'Erro desconhecido',
      timeout: 3000,
    });
    return Promise.reject(error);
  }
);

// Funções para fazer requisições
const ApiService = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await api.get<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: response.config
    };
  },

  post<T>(url: string, data: CreateSchedulerFinance, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api.post<T>(url, data, config);
  },
};

export default ApiService;
