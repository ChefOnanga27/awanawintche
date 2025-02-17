import { useState } from 'react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Recherche pour:', searchTerm);
    // Ajoutez ici la logique de recherche, par exemple, pour filtrer des éléments ou rediriger
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-200 rounded-md px-4 py-2">
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="bg-transparent border-none focus:outline-none text-sm text-gray-700 w-full"
      />
      <button type="submit" className="ml-2 p-2 bg-black text-white rounded-md hover:bg-green-dark">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M18 9a9 9 0 11-9-9 9 9 0 019 9z" />
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;
