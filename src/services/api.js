import axios from 'axios';

const api = axios.create({
  baseURL: 'https://resto-back-qsyz.onrender.com', // Remplace par l'URL correcte de ton API
});

// Intercepteur pour ajouter le token aux requêtes (sans localStorage)
api.interceptors.request.use((config) => {
  if (config.requiresAuth && config.headers.Authorization === undefined) {
    return Promise.reject(new Error("Authentification requise"));
  }
  return config;
});

// ✅ Authentification (connexion et inscription)
export const authApi = {
  login: async (credentials) => {
    try {
      const response = await api.post('/api/user/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Erreur de connexion';
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/api/user/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Erreur lors de l\'inscription';
    }
  }
};

// ✅ Mise à jour du profil utilisateur
export const updateUserProfile = async (userData, token) => {
  try {
    const response = await api.put('/users/profile', userData, {
      headers: { Authorization: `Bearer ${token}` },
      requiresAuth: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Erreur lors de la mise à jour du profil';
  }
};

// ✅ Téléchargement de l'avatar utilisateur
export const uploadUserAvatar = async (file, token) => {
  try {
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('La taille du fichier ne doit pas dépasser 5MB');
    }

    if (!file.type.startsWith('image/')) {
      throw new Error('Seules les images sont acceptées');
    }

    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post('/user/upload-avatar', formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      requiresAuth: true,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || 'Erreur lors du téléchargement de l\'avatar';
  }
};

export default api;
