// src/pages/recipes/RecipeDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      // Simuler un appel API
      const data = {
        id: parseInt(id),
        name: "Coq au Vin",
        description: "Une recette traditionnelle française de poulet mijoté dans du vin rouge avec des légumes.",
        prepTime: 40,
        cookTime: 90,
        rating: 4.7,
        category: "Plat principal",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e",
        ingredients: [
          "1 poulet entier découpé",
          "750ml de vin rouge",
          "200g de lardons",
          "24 petits oignons",
          "250g de champignons",
          "2 carottes",
          "Thym, laurier",
          "Sel et poivre"
        ],
        instructions: [
          "Faire revenir les lardons dans une cocotte",
          "Ajouter les morceaux de poulet et faire dorer",
          "Incorporer les légumes et faire suer",
          "Verser le vin rouge et les herbes",
          "Laisser mijoter 1h30 à feu doux"
        ],
        author: {
          name: "Chef Jean",
          id: 1
        },
        createdAt: "2024-01-15"
      };
      setRecipe(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement de la recette:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl text-gray-600">Recette non trouvée</h1>
        <Link to="/" className="text-primary hover:text-primary-dark">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête de la recette */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-8">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{recipe.name}</h1>
              <p className="text-white/90 text-lg">{recipe.description}</p>
            </div>
          </div>
        </div>

        {/* Informations de la recette */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Temps de préparation</h3>
            <p className="text-2xl text-primary">{recipe.prepTime} min</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Temps de cuisson</h3>
            <p className="text-2xl text-primary">{recipe.cookTime} min</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Note</h3>
            <p className="text-2xl text-primary">⭐ {recipe.rating}/5</p>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ingrédients */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Ingrédients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <p className="pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">
                Publié par{' '}
                <Link to={`/user/${recipe.author.id}`} className="text-primary hover:text-primary-dark">
                  {recipe.author.name}
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                {new Date(recipe.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="space-x-4">
              <button className="text-gray-600 hover:text-primary">
                Sauvegarder ❤️
              </button>
              <button className="text-gray-600 hover:text-primary">
                Partager 🔗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;