import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentification
export const authApi = {
  login: async (credentials) => {
    // Simulation d'une réponse API
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      token: 'fake-jwt-token',
      user: {
        email: credentials.email,
        name: 'Utilisateur Test'
      }
    };
  },
  
  register: async (userData) => {
    // Simulation d'une réponse API
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      token: 'fake-jwt-token',
      user: {
        email: userData.email,
        name: userData.name
      }
    };
  }
};

// Mise à jour du profil utilisateur
export const updateUserProfile = async (userData) => {
  try {
    // Simulation de l'API avec localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...currentUser, ...userData };

    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));

    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    throw new Error('Impossible de mettre à jour le profil. Veuillez réessayer.');
  }
};

// Téléchargement de l'avatar utilisateur
export const uploadUserAvatar = async (file) => {
  try {
    // Vérification de la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('La taille du fichier ne doit pas dépasser 5MB');
    }

    // Vérification du type de fichier
    if (!file.type.startsWith('image/')) {
      throw new Error('Seules les images sont acceptées');
    }

    // Simulation du téléchargement
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Stocker l'URL de l'image dans le localStorage
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        currentUser.avatar = reader.result;
        localStorage.setItem('user', JSON.stringify(currentUser));
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'avatar:', error);
    throw error.message || 'Impossible de télécharger l\'avatar. Veuillez réessayer.';
  }
};

export default api;
