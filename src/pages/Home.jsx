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
      {
        id: 2,
        title: 'Poulet Yassa',
        description: 'Un poulet mariné au citron et aux oignons',
        image: '/poulet-yassa.jpg',
        duration: '1h',
        difficulty: 'Facile',
        createdAt: '2024-02-01'
      },
      {
        id: 3,
        title: 'Poisson braisé',
        description: 'Poisson grillé avec une sauce épicée',
        image: '/poisson-braise.jpg',
        duration: '45min',
        difficulty: 'Moyen',
        createdAt: '2024-03-01'
      },
      {
        id: 4,
        title: 'Riz Jollof',
        description: 'Riz épicé avec des légumes et du poulet',
        image: '/riz-jollof.jpg',
        duration: '1h',
        difficulty: 'Moyen',
        createdAt: '2024-01-10'
      },
      {
        id: 5,
        title: 'Soupe à l\'arachide',
        description: 'Une soupe crémeuse à base d\'arachides',
        image: '/soupe-arachide.jpg',
        duration: '1h15',
        difficulty: 'Difficile',
        createdAt: '2023-12-05'
      },
      {
        id: 6,
        title: 'Attiéké',
        description: 'Un plat traditionnel à base de manioc',
        image: '/attieke.jpg',
        duration: '45min',
        difficulty: 'Facile',
        createdAt: '2024-01-20'
      },
      {
        id: 7,
        title: 'Boudin créole',
        description: 'Un boudin épicé à base de porc et de riz',
        image: '/boudin-creole.jpg',
        duration: '2h',
        difficulty: 'Difficile',
        createdAt: '2024-02-10'
      },
      {
        id: 8,
        title: 'Ndolé',
        description: 'Plat camerounais à base de feuilles d\'amarante, arachides et viande',
        image: '/ndole.jpg',
        duration: '1h30',
        difficulty: 'Moyen',
        createdAt: '2024-01-30'
      },
      {
        id: 9,
        title: 'Poisson frit',
        description: 'Poisson frit accompagné de légumes frais',
        image: '/poisson-frit.jpg',
        duration: '1h',
        difficulty: 'Facile',
        createdAt: '2024-03-05'
      },
      {
        id: 10,
        title: 'Mafé',
        description: 'Un ragoût de viande en sauce d\'arachide',
        image: '/mafe.jpeg',
        duration: '1h45',
        difficulty: 'Moyen',
        createdAt: '2024-01-25'
      },
      {
        id: 11,
        title: 'Tô',
        description: 'Une pâte de maïs accompagnée de sauce tomate ou d\'arachides',
        image: '/to.jpg',
        duration: '1h',
        difficulty: 'Facile',
        createdAt: '2023-12-15'
      },
      {
        id: 12,
        title: 'Kedjenou',
        description: 'Un ragoût de poulet cuit lentement avec des légumes',
        image: '/kedjenou.jpg',
        duration: '2h',
        difficulty: 'Moyen',
        createdAt: '2024-02-05'
      }
      // Ajouter d'autres recettes si nécessaire
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
        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          <h1 className="text-white text-3xl font-bold text-center sm:text-left mb-4 sm:mb-0">
            Bienvenue sur notre site de recettes !
          </h1>
          {user ? (
            <Link
              to="/profile"
              className="bg-white text-green-500 hover:bg-gray-100 px-6 py-2 rounded-full font-semibold transition-colors w-full sm:w-auto text-center"
            >
              Mon Profil
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto text-center">
              <Link
                to="/register"
                className="bg-white text-green-500 hover:bg-gray-100 px-6 py-2 rounded-full font-semibold transition-colors w-full sm:w-auto"
              >
                S'inscrire
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white hover:bg-white/10 px-6 py-2 rounded-full font-semibold transition-colors w-full sm:w-auto"
              >
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
