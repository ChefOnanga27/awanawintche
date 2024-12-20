import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function RecipeCard({ recipe }) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "Délicieuse recette, je recommande !",
      author: "Sophie",
      date: "2024-01-15"
    },
    {
      id: 2,
      text: "J'ai adoré la préparation, très facile à suivre",
      author: "Marc",
      date: "2024-01-14"
    }
  ]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      text: newComment,
      author: user?.name || 'Anonyme',
      date: new Date().toISOString().split('T')[0]
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.title}</h3>
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>Durée: {recipe.duration}</span>
          <span>Difficulté: {recipe.difficulty}</span>
        </div>

        {/* Bouton Commentaires */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-primary hover:text-primary-dark font-medium"
        >
          {showComments ? 'Masquer les commentaires' : `Voir les commentaires (${comments.length})`}
        </button>

        {/* Section Commentaires */}
        {showComments && (
          <div className="mt-4">
            <div className="space-y-4 mb-4">
              {comments.map(comment => (
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
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  Publier
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;