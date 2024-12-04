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
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
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
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="text-white max-w-lg">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">{recipe.title}</h2>
                  <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-none">{recipe.description}</p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <span className="text-sm sm:text-base bg-primary bg-opacity-80 px-3 py-1 rounded-full">
                      {recipe.duration}
                    </span>
                    <span className="text-sm sm:text-base bg-primary bg-opacity-80 px-3 py-1 rounded-full">
                      {recipe.difficulty}
                    </span>
                  </div>
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="mt-4 sm:mt-6 bg-primary hover:bg-primary-dark text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg inline-block transition-colors text-sm sm:text-base"
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
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;