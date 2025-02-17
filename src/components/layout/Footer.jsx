function Footer() {
  return (
    <footer className="bg-green-600 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1: Logo */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-green-100">Mon secret Culinaire</h3>
            <p className="text-lg">Partagez vos meilleures recettes</p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-green-200 hover:text-green-400 transition duration-300 ease-in-out">Accueil</a>
              </li>
              <li>
                <a href="/recipes" className="text-green-200 hover:text-green-400 transition duration-300 ease-in-out">Recettes</a>
              </li>
              <li>
                <a href="/contact" className="text-green-200 hover:text-green-400 transition duration-300 ease-in-out">Contact</a>
              </li>
            </ul>
          </div>

          {/* Section 3: Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-lg">Email: <a href="mailto:nangbiteghe@gmail.com" className="text-green-200 hover:text-green-400 transition duration-300 ease-in-out">nangbiteghe@gmail.com</a></p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-green-200">
          <p>&copy; {new Date().getFullYear()} Mon secret Culinaire. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
