import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './recipes/RecipeCard';
import Hero from '../components/layout/Hero';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/layout/SearchBar'; // Importing SearchBar

function Home() {
  const { user } = useAuth();
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [oldRecipes, setOldRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recipes = [
      {
        id: 1,
        title: 'Poulet Rôti aux Herbes',
        description: 'Un délicieux poulet rôti avec des herbes fraîches',
        image: '/poulet_roti.jpg',
        duration: '1h30',
        difficulty: 'Moyen',
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        title: 'Salade César',
        description: 'Une salade césar classique avec sauce maison',
        image: '/salade_cesar.jpg',
        duration: '20min',
        difficulty: 'Facile',
        createdAt: '2024-01-14'
      },
      {
        id: 3,
        title: 'Tarte aux Pommes',
        description: 'Une tarte aux pommes traditionnelle',
        image: '/tarte_aux_pommes.jpg',
        duration: '1h',
        difficulty: 'Moyen',
        createdAt: '2023-12-25'
      },
      {
        id: 4,
        title: 'Ratatouille',
        description: 'Un plat végétarien traditionnel français',
        image: '/ratatouille.jpg',
        duration: '1h15',
        difficulty: 'Facile',
        createdAt: '2023-12-20'
      }
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div> {/* Vert pur au lieu du rouge */}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#d8f3dc]"> {/* Fond vert clair */}
      <Hero />
      
      {/* Integrating SearchBar */}
      <SearchBar />

      {!user && (
        <div className="my-8 bg-gradient-to-r from-green-500 to-green-600 rounded-xl overflow-hidden shadow-lg"> {/* Vert pur */}
          <div className="px-6 py-8 sm:px-8 md:px-12 flex flex-col sm:flex-row items-center justify-between">
            <div className="text-white text-center sm:text-left mb-6 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Partagez Vos Recettes !</h2>
              <p className="text-white/90">Rejoignez notre communauté et partagez vos meilleures recettes avec le monde.</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/register" className="bg-white text-green-500 hover:bg-gray-100 px-6 py-2 rounded-full font-semibold transition-colors">S/inscrire</Link>
              <Link to="/login" className="border-2 border-white text-white hover:bg-white/10 px-6 py-2 rounded-full font-semibold transition-colors">Se connecter</Link>
            </div>
          </div>
        </div>
      )}

      <section className="my-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Recettes Récentes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Recettes Anciennes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {oldRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
