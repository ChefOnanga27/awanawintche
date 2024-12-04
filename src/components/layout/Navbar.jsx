import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-primary shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.jpg" alt="logo" className="h-8 w-8 rounded-full" />
            <Link to="/" className="text-xl sm:text-2xl font-bold text-white">Awanawintche</Link>
          </div>
          
          {/* Menu burger pour mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Menu desktop */}
          <div className="hidden lg:flex space-x-6">
            <Link to="/" className="text-white hover:text-accent-light">Accueil</Link>
            {user ? (
              <>
                <Link to="/recipes/create" className="text-white hover:text-accent-light">Créer une recette</Link>
                <Link to="/profile" className="text-white hover:text-accent-light">Mon Profil</Link>
                <button 
                  onClick={handleLogout}
                  className="text-white hover:text-accent-light"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-accent-light">Connexion</Link>
                <Link to="/register" className="text-white hover:text-accent-light">Inscription</Link>
              </>
            )}
          </div>
        </div>

        {/* Menu mobile */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white hover:text-accent-light"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            {user ? (
              <>
                <Link 
                  to="/recipes/create" 
                  className="text-white hover:text-accent-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Créer une recette
                </Link>
                <Link 
                  to="/profile" 
                  className="text-white hover:text-accent-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mon Profil
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-white hover:text-accent-light text-left"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-accent-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="text-white hover:text-accent-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;