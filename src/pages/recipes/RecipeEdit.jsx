// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // À ajuster selon votre configuration
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const recipesApi = {
  // Récupérer toutes les recettes
  getAll: () => api.get('/recipes'),
  
  // Récupérer une recette par son ID
  getById: (id) => api.get(`/recipes/${id}`),
  
  // Créer une nouvelle recette
  create: (data) => api.post('/recipes', data),
  
  // Mettre à jour une recette
  update: (id, data) => api.put(`/recipes/${id}`, data),
  
  // Supprimer une recette
  delete: (id) => api.delete(`/recipes/${id}`)
};

export const authApi = {
  // Inscription
  register: (data) => api.post('/auth/register', data),
  
  // Connexion
  login: (data) => api.post('/auth/login', data),
  
  // Récupérer le profil de l'utilisateur
  getProfile: () => api.get('/auth/profile')
};

export default api;