import { useState, useEffect } from 'react';
import RecipeCard from './recipes/RecipeCard';
import Hero from '../components/layout/Hero';

function Home() {
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [oldRecipes, setOldRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des recettes depuis l'API
    const fetchRecipes = () => {
      const mockRecipes = [
        {
          id: 1,
          title: 'Poulet Rôti aux Herbes',
          description: 'Un délicieux poulet rôti avec des herbes fraîches',
          image: '/poulet roti.jpg',
          duration: '1h30',
          difficulty: 'Moyen',
          createdAt: '2024-01-15'
        },
        {
          id: 2,
          title: 'Salade César',
          description: 'Une salade césar classique avec sauce maison',
          image: '/salade Cesar.jpg',
          duration: '20min',
          difficulty: 'Facile',
          createdAt: '2024-01-14'
        },
        {
          id: 3,
          title: 'Tarte aux Pommes',
          description: 'Une tarte aux pommes traditionnelle',
          image: 'tarte aux pommes.jpg',
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
        },
        {
            id: 5,
            title: 'Feuille de manioc',
            description: 'Un plat végétarien traditionnel gabonais',
            image: '/feuille de manioc.jpg',
            duration: '1h15',
            difficulty: 'Facile',
            createdAt: '2023-12-20'
          },
          {
            id: 6,
            title: 'Choux aux poissons ',
            description: 'Un plat végétarien traditionnel africain',
            image: '/chou.jpg',
            duration: '1h15',
            difficulty: 'Facile',
            createdAt: '2023-12-20'
          }
          
      ];

      // Trier les recettes par date
      const sortedRecipes = mockRecipes.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Séparer les recettes récentes (moins de 7 jours) des anciennes
      const currentDate = new Date();
      const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));

      const recent = sortedRecipes.filter(recipe => 
        new Date(recipe.createdAt) >= sevenDaysAgo
      );
      const old = sortedRecipes.filter(recipe => 
        new Date(recipe.createdAt) < sevenDaysAgo
      );

      setRecentRecipes(recent);
      setOldRecipes(old);
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
         <div>
    <Hero />
  </div>
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Culinaire</h1>
        <p className="text-lg text-gray-600">
          Découvrez des recettes délicieuses partagées par notre communauté
        </p>
      </div>

      {/* Recettes récentes */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Recettes Récentes</h2>
          <span className="text-sm text-gray-500">
            Derniers 7 jours
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Recettes plus anciennes */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Recettes Plus Anciennes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oldRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;