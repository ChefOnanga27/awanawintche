const BASE_URL = 'https://resto-back-qsyz.onrender.com/api'; // Lien de ton API

// Fonction générique pour les requêtes HTTP avec gestion des erreurs
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // Ajouter le token si présent
    },
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Une erreur est survenue');
    }

    return data;
  } catch (error) {
    console.error(`Erreur API (${endpoint}):`, error);
    throw error;
  }
}

// API pour les recettes
export const recipesApi = {
  getAll: () => request('/recette'),
  getById: (id) => request(`/recette/${id}`),
  create: (data) => request('/recette', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/recette/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/recette/${id}`, { method: 'DELETE' }),
};

// API pour l'authentification
export const authApi = {
  register: (data) => request('/user/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/user/login', { method: 'POST', body: JSON.stringify(data) }),
  getProfile: () => request('/user/profile'),
};

export default { recipesApi, authApi };
