// src/components/layout/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-primary shadow-md">
      <nav className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.jpg" alt="logo" className="h-8 w-8 rounded-full" />
            <Link to="/" className="text-2xl font-bold text-white">Awanawintche</Link>
          </div> 
          <div className="space-x-6">
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
      </nav>
    </header>
  );
}

export default Navbar;