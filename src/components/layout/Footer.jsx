
function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Awanawintche</h3>
            <p>Partagez vos meilleures recettes</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
            <ul>
              <li><a href="/" className="hover:text-accent-light">Accueil</a></li>
              <li><a href="/recipes" className="hover:text-accent-light">Recettes</a></li>
              <li><a href="/contact" className="hover:text-accent-light">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>Email: nangbiteghe@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer