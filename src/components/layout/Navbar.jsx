import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';

function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative">
      {/* Bouton pour ouvrir la sidebar */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="fixed top-4 left-4 text-white bg-green-700 p-2 rounded-md z-50"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-green-900 text-white shadow-lg transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} duration-300`}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <img src="/logo.png" alt="logo" className="h-8 w-8 rounded-full" />
            <Link to="/" className="text-xl font-bold text-white">Mon secret culinaire</Link>
          </div>

          {/* Navigation principale */}
          <nav className="flex flex-col space-y-4 flex-grow">
            <Link 
              to="/" 
              className="text-white hover:bg-green-700 p-2 rounded"
              onClick={() => setIsSidebarOpen(false)}
            >
              Découvrir
            </Link>
            {user && (
              <>
                <Link 
                  to="/recipes" 
                  className="text-white hover:bg-green-700 p-2 rounded"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Mes Recettes
                </Link>
                <Link 
                  to="/recipes/create" 
                  className="text-white hover:bg-green-700 p-2 rounded"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Créer une recette
                </Link>
                <Link 
                  to="/profile" 
                  className="text-white hover:bg-green-700 p-2 rounded"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Mon compte
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-white hover:bg-green-700 p-2 rounded text-left"
                >
                  Déconnexion
                </button>
              </>
            )}
            {!user && (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:bg-green-700 p-2 rounded"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Se connecter
                </Link>
                <Link 
                  to="/register" 
                  className="text-white hover:bg-green-700 p-2 rounded"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  S'inscrire
                </Link>
              </>
            )}
          </nav>

          {/* Footer (dans la sidebar) */}
          <div className="mt-auto">
            <p className="text-sm text-white text-center mb-2">© 2024 Mon secret culinaire</p>
            <div className="flex justify-center space-x-4">
              <Link to="/privacy-policy" className="text-white hover:bg-green-700 p-2 rounded text-sm">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-white hover:bg-green-700 p-2 rounded text-sm">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
