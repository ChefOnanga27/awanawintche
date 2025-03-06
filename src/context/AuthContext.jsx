// src/context/AuthContext.js
import { createContext, useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = (token, role) => {
    setLoading(true);
    try {
      // Sauvegarde du token et du rôle dans le contexte (par exemple dans localStorage ou directement dans le contexte)
      localStorage.setItem('token', token); // Si vous souhaitez garder le token dans le stockage local
      setUser({ token, role });
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw new Error('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch('https://resto-back-qsyz.onrender.com/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        return data.user;
      }
      throw new Error(data.message || 'Erreur lors de l’inscription');
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw new Error('Impossible de s’inscrire');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = useMemo(() => ({
    user, loading, login, register, logout, updateUser,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext };
