import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const featuredRecipes = [
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

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredRecipes.length);
    }, 5000); // Change de slide toutes les 5 secondes

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden">
      {featuredRecipes.map((recipe, index) => (
        <div
          key={recipe.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative h-full">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40">
              <div className="container mx-auto px-6 h-full flex items-center">
                <div className="text-white max-w-lg">
                  <h2 className="text-4xl font-bold mb-4">{recipe.title}</h2>
                  <p className="text-xl mb-6">{recipe.description}</p>
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg inline-block transition-colors"
                  >
                    Voir la recette
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredRecipes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-primary' : 'bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;