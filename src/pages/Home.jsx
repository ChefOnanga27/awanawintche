import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './recipes/RecipeCard';
import Hero from '../components/layout/Hero';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/layout/SearchBar';

function Home() {
  const { user } = useAuth();
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [oldRecipes, setOldRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRecent, setShowRecent] = useState(true); // State to toggle between recent and old recipes

  useEffect(() => {
    const recipes = [
      {
        id: 1,
        title: 'Feuille de manioc',
        description: 'Un délicieux poulet rôti avec des herbes fraîches',
        image: '/feuille de manioc.jpg',
        duration: '1h30',
        difficulty: 'Moyen',
        createdAt: '2024-01-15'
      },
      // ... autres recettes
    ];

    const sortedRecipes = [...recipes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const now = new Date();
    const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));

    const recent = sortedRecipes.filter(recipe => new Date(recipe.createdAt) >= sevenDaysAgo);
    const old = sortedRecipes.filter(recipe => new Date(recipe.createdAt) < sevenDaysAgo);

    setRecentRecipes(recent);
    setOldRecipes(old);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-900"></div> 
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#d8f3dc]">
      <Hero />

      {/* Header avec les boutons */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 p-4 rounded-lg mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">Bienvenue sur notre site de recettes !</h1>
          {user ? (
            <Link to="/profile" className="bg-white text-green-500 hover:bg-gray-100 px-6 py-2 rounded-full font-semibold transition-colors">
              Mon Profil
            </Link>
          ) : (
            <div className="flex space-x-4">
              <Link to="/register" className="bg-white text-green-500 hover:bg-gray-100 px-6 py-2 rounded-full font-semibold transition-colors">
                S'inscrire
              </Link>
              <Link to="/login" className="border-2 border-white text-white hover:bg-white/10 px-6 py-2 rounded-full font-semibold transition-colors">
                Se connecter
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Barre de recherche */}
      <SearchBar />

      {/* Boutons pour afficher les recettes récentes et anciennes */}
      <div className="flex space-x-4 mb-6 justify-center sm:justify-start">
        <button
          className={`${
            showRecent ? 'bg-green-500' : 'bg-gray-200'
          } text-white py-2 px-4 rounded-lg hover:bg-green-600`}
          onClick={() => setShowRecent(true)}
        >
          Recettes Récentes
        </button>
        <button
          className={`${
            !showRecent ? 'bg-green-500' : 'bg-gray-200'
          } text-white py-2 px-4 rounded-lg hover:bg-green-600`}
          onClick={() => setShowRecent(false)}
        >
          Recettes Anciennes
        </button>
      </div>

      {/* Affichage des recettes en fonction du bouton cliqué */}
      <section className="my-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {showRecent ? 'Recettes Récentes' : 'Recettes Anciennes'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(showRecent ? recentRecipes : oldRecipes).map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
