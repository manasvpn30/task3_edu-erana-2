import axios from 'axios';

// Use port 5002 where backend is actually running
const API_BASE_URL = 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add interceptors for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Call: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export const courseAPI = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
};

export const userAPI = {
  signup: (data) => api.post('/users/signup', data),
  login: (data) => api.post('/users/login', data),
};

export const reviewAPI = {
  getAll: () => api.get('/reviews'),
  create: (data) => api.post('/reviews', data),
};

export const healthCheck = () => api.get('/health');

// Test backend connection
export const testBackendConnection = async () => {
  try {
    const response = await healthCheck();
    console.log('✅ Backend connection successful:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    return false;
  }
};

export default api;