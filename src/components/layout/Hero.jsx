import { FaPizzaSlice, FaHamburger, FaAppleAlt, FaUtensils } from 'react-icons/fa';

function Hero() {
  return (
    <div className="h-10 bg-green-800 text-white flex justify-between items-center px-6 shadow-md">
      <div className="flex space-x-4">
        <FaPizzaSlice size={22} />
        <FaHamburger size={22} />
        <FaAppleAlt size={22} />
      </div>
      <button className="bg-white text-green-700 px-3 py-1 rounded-full text-sm font-medium transition duration-300 hover:bg-green-500 hover:text-white shadow">
        Publier une recette & Apprendre des autres
      </button>
      <FaUtensils size={22} />
    </div>
  );
}

export default Hero;
