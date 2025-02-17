import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';

function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsSidebarOpen(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex bg-green-700 text-white">
      {/* Bouton pour ouvrir la sidebar */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="fixed top-4 left-4 text-white bg-green-700 p-2 rounded-md z-50"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-green-800 text-white shadow-lg transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} duration-300`}>
        <div className="p-5">
          <div className="flex items-center space-x-3 mb-6">
            <img src="/logo.jpg" alt="logo" className="h-8 w-8 rounded-full" />
            <Link to="/" className="text-xl font-bold text-white">Mon secret culinaire</Link>
          </div>

          {/* Barre de recherche */}
          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="Rechercher une recette..." 
              className="w-full p-2 pl-10 rounded bg-green-700 text-white placeholder-gray-300 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <FiSearch 
              size={18} 
              className="absolute left-3 top-3 text-gray-300 cursor-pointer"
              onClick={handleSearch}
            />
          </div>

          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white hover:bg-green-700 p-2 rounded"
              onClick={() => setIsSidebarOpen(false)}
            >
              Découvrir
            </Link>
            {user ? (
              <>
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
                  Mon Profil
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-white hover:bg-green-700 p-2 rounded text-left"
                >
                  Déconnexion
                </button>
              </>
            ) : (
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
                  S/inscrire
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
