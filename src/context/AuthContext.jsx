import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';  // Importer PropTypes
import { authApi } from '../services/api';  // Assurez-vous d'importer votre api

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérification de l'utilisateur lors du chargement de la page
  useEffect(() => {
    setLoading(false);  // Terminer le chargement
  }, []);

  // Fonction de login
  const login = async (credentials) => {
    setLoading(true); // Démarrer le chargement pendant la tentative de connexion
    try {
      const response = await authApi.login(credentials);
      if (response.token && response.user) {
        setUser(response.user);  // Mettre à jour l'utilisateur dans l'état
        return response.user;
      }
      throw new Error('Réponse du serveur invalide');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw new Error('Identifiants invalides ou problème de connexion');
    } finally {
      setLoading(false); // Terminer le chargement après la tentative de connexion
    }
  };

  // Fonction d'enregistrement
  const register = async (userData) => {
    setLoading(true); // Démarrer le chargement pendant l'enregistrement
    try {
      const response = await authApi.register(userData);
      if (response.token && response.user) {
        setUser(response.user);  // Mettre à jour l'utilisateur dans l'état
        return response.user;
      }
      throw new Error('Réponse du serveur invalide');
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw new Error('Erreur lors de l\'inscription ou problème de connexion');
    } finally {
      setLoading(false); // Terminer le chargement après l'enregistrement
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);  // Réinitialiser l'utilisateur dans l'état
  };

  // Mise à jour de l'utilisateur dans le contexte
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Création du contexte pour éviter le recalcul des valeurs à chaque rendu
  const value = useMemo(() => ({
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Validation des props
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Valider que 'children' est un élément React
};

// Hook personnalisé pour accéder au contexte d'authentification
export function useAuth() {
  return useContext(AuthContext);
}
