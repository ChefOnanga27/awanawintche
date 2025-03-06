"use client"

import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import PropTypes from "prop-types"
import { Clock, MessageCircle, Star } from "lucide-react"

function RecipeCard({ recipe }) {
  const { user } = useAuth()
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "Délicieuse recette, je recommande !",
      author: "Sophie",
      date: "2024-01-15",
    },
    {
      id: 2,
      text: "J'ai adoré la préparation, très facile à suivre",
      author: "Marc",
      date: "2024-01-14",
    },
  ])

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = {
      id: comments.length + 1,
      text: newComment,
      author: user?.name || "Anonyme",
      date: new Date().toISOString().split("T")[0],
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} className="w-full h-64 object-cover" />
        {recipe.featured && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-xs">★</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Étoiles de notation */}
        {recipe.rating && (
          <div className="flex mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < recipe.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        )}

        <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.title}</h3>
        <p className="text-gray-600 mb-4">{recipe.description}</p>

        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>Durée: {recipe.duration}</span>
          </div>
          <span>Difficulté: {recipe.difficulty}</span>
        </div>

        {/* Informations sur l'auteur */}
        {recipe.author && (
          <div className="flex items-center mb-4">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-rose-500 flex items-center justify-center text-white">
              {recipe.authorImage ? (
                <img
                  src={recipe.authorImage || "/placeholder.svg"}
                  alt={recipe.author}
                  className="w-full h-full object-cover"
                />
              ) : (
                recipe.author.charAt(0)
              )}
            </div>
            <span className="ml-2 text-sm">{recipe.author}</span>
          </div>
        )}

        {/* Bouton Commentaires */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-green-500 hover:text-green-900 font-medium flex items-center gap-1"
        >
          <MessageCircle className="w-4 h-4" />
          {showComments ? "Masquer les commentaires" : `Voir les commentaires (${comments.length})`}
        </button>

        {/* Section Commentaires */}
        {showComments && (
          <div className="mt-4">
            <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span className="font-medium">{comment.author}</span>
                    <span>{comment.date}</span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>

            {/* Formulaire nouveau commentaire */}
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50"
                >
                  Publier
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

// Define prop types for validation
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    author: PropTypes.string,
    authorImage: PropTypes.string,
    rating: PropTypes.number,
    featured: PropTypes.bool,
  }).isRequired,
}

export default RecipeCard

