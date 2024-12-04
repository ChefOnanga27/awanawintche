import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './recipes/RecipeCard';
import Hero from '../components/layout/Hero';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [oldRecipes, setOldRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de chargement des recettes
    const recipes = [
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
        image: '/tarte aux pommes.jpg',
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
        title: 'Choux aux poissons',
        description: 'Un plat végétarien traditionnel africain',
        image: '/chou.jpg',
        duration: '1h15',
        difficulty: 'Facile',
        createdAt: '2023-12-20'
      }
    ];

    // Trier les recettes par date
    const sortedRecipes = [...recipes].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Séparer les recettes récentes (7 derniers jours) des plus anciennes
    const now = new Date();
    const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));

    const recent = sortedRecipes.filter(recipe => 
      new Date(recipe.createdAt) >= sevenDaysAgo
    );
    const old = sortedRecipes.filter(recipe => 
      new Date(recipe.createdAt) < sevenDaysAgo
    );

    setRecentRecipes(recent);
    setOldRecipes(old);
    setLoading(false);
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

      {/* Bannière d'invitation à l'inscription */}
      {!user && (
        <div className="my-8 bg-gradient-to-r from-primary to-primary-dark rounded-xl overflow-hidden shadow-lg">
          <div className="px-6 py-8 sm:px-8 md:px-12 flex flex-col sm:flex-row items-center justify-between">
            <div className="text-white text-center sm:text-left mb-6 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Partagez Vos Recettes !</h2>
              <p className="text-white/90">Rejoignez notre communauté et partagez vos meilleures recettes avec le monde.</p>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/register"
                className="bg-white text-primary hover:bg-gray-100 px-6 py-2 rounded-full font-semibold transition-colors"
              >
                S'inscrire
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white hover:bg-white/10 px-6 py-2 rounded-full font-semibold transition-colors"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Section des témoignages */}
      <section className="py-16 bg-gray-50 rounded-xl my-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">L'Avis de Nos Chefs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Découvrez les retours d'expérience de nos chefs et utilisateurs passionnés</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          {[
            {
              id: 1,
              name: "Chef Anto Cocagne",
              role: "Chef Étoilé - Gastronomie Africaine",
              image: "/chef1.jpg",
              content: "Awanawintche est une plateforme exceptionnelle pour partager et préserver nos traditions culinaires africaines. La diversité des recettes est impressionnante.",
              specialty: "Cuisine Gabonaise"
            },
            {
              id: 2,
              name: "Christian Abegan",
              role: "Chef Consultant International",
              image: "/chef2.jpg",
              content: "Une initiative remarquable qui met en valeur la richesse de la cuisine africaine. La plateforme facilite le partage de connaissances entre chefs.",
              specialty: "Cuisine Panafricaine"
            },
            {
              id: 3,
              name: "Loïc Dablé",
              role: "Chef Innovateur",
              image: "/chef3.jpg",
              content: "Cette plateforme permet de moderniser et de faire rayonner notre cuisine traditionnelle. Un outil précieux pour la nouvelle génération de chefs.",
              specialty: "Cuisine Fusion"
            }
          ].map((chef) => (
            <div 
              key={chef.id}
              className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={chef.image} 
                  alt={chef.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-primary"
                />
                <div className="ml-4">
                  <h3 className="font-bold text-lg text-gray-900">{chef.name}</h3>
                  <p className="text-primary text-sm">{chef.role}</p>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mt-1">
                    {chef.specialty}
                  </span>
                </div>
              </div>

              <blockquote className="relative">
                <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-gray-700"
                     width="16"
                     height="16"
                     viewBox="0 0 16 16"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     aria-hidden="true"
                >
                  <path
                    d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                    fill="currentColor"
                  />
                </svg>
                <p className="text-gray-600 italic relative z-10 mb-6">"{chef.content}"</p>
              </blockquote>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-yellow-400 font-bold">Chef Certifié</span>
                </div>
                <a href="#" className="text-primary hover:text-primary-dark font-medium">
                  Voir ses recettes
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

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