import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ChevronLeft, Search, Bell, Plus, Edit, Share2, BookOpen, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://resto-back-qsyz.onrender.com/api';

const ProfileSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Trop court !').max(50, 'Trop long !').required('Requis'),
  email: Yup.string().email('Email invalide').required('Requis'),
  bio: Yup.string().max(200, 'La bio ne doit pas dépasser 200 caractères'),
  location: Yup.string().max(100, 'La localisation ne doit pas dépasser 100 caractères'),
});

function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '/default-avatar.png');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('recipes');
  const [recipeCount, setRecipeCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    if (user?.avatar) {
      setAvatarPreview(user.avatar);
    }
    
    // Charger les statistiques du profil
    if (user?.id) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/stats`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        setRecipeCount(data.recipeCount || 0);
        setFollowerCount(data.followerCount || 0);
        setFollowingCount(data.followingCount || 0);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Fonction pour uploader un avatar
  const handleAvatarChange = async (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch(`${BASE_URL}/user/upload-avatar`, {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erreur lors du téléchargement');

      setAvatarPreview(data.avatarUrl);
      setFieldValue('avatar', data.avatarUrl);
      showMessage('success', 'Photo de profil mise à jour !');
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  // Fonction pour mettre à jour le profil utilisateur
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erreur lors de la mise à jour');

      updateUser(data);
      setIsEditing(false);
      showMessage('success', 'Profil mis à jour avec succès !');
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateRecipe = () => {
    navigate('/Recipes/Create');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button 
          className="bg-teal-700 text-white p-2 rounded"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="relative flex-1 mx-4">
          <input 
            type="text" 
            placeholder="Rechercher" 
            className="w-full rounded-full border border-gray-300 py-2 px-4 text-gray-500"
          />
          <Search className="absolute right-3 top-2 text-gray-400" size={20} />
        </div>
        
        <div className="flex items-center gap-4">
          <Bell size={20} />
          <button 
            onClick={handleCreateRecipe}
            className="bg-teal-700 text-white py-2 px-4 rounded flex items-center gap-2"
          >
            <span>Créer une recette</span>
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Messages de notification */}
      {message.text && (
        <div className={`m-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      {/* Profile Info */}
      <Formik
        initialValues={{
          name: user?.name || 'nangbiteghe',
          email: user?.email || '',
          bio: user?.bio || 'NANG BITEGHE ALEC JORAINE',
          location: user?.location || '',
          avatar: user?.avatar || '',
        }}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form>
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {avatarPreview === '/default-avatar.png' ? (
                    <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'N'}
                    </div>
                  ) : (
                    <img src={avatarPreview} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                  )}
                  
                  {isEditing ? (
                    <label className="absolute bottom-0 right-0 bg-gray-100 p-1 rounded-full cursor-pointer">
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => handleAvatarChange(e, setFieldValue)} 
                      />
                      <Edit size={18} />
                    </label>
                  ) : (
                    <button className="absolute bottom-0 right-0 bg-gray-100 p-1 rounded-full">
                      <Share2 size={18} />
                    </button>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <Field 
                        type="text" 
                        name="name" 
                        className="text-3xl font-bold border-b border-gray-300 focus:outline-none focus:border-teal-500 px-1" 
                      />
                    ) : (
                      <h1 className="text-3xl font-bold">{user?.name || 'nangbiteghe'}</h1>
                    )}
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(!isEditing)}
                      aria-label={isEditing ? "Annuler" : "Modifier"}
                    >
                      <Edit size={20} className="text-teal-700" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <div className="text-center">
                      <div className="font-bold text-xl">{recipeCount}</div>
                      <div className="text-sm">Recette{recipeCount !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl">{followerCount}</div>
                      <div className="text-sm">Abonné{followerCount !== 1 ? '(e)s' : '(e)'}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl">{followingCount}</div>
                      <div className="text-sm">Abonnement{followingCount !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                {isEditing ? (
                  <div className="space-y-2 mt-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500">Bio</label>
                      <Field as="textarea" name="bio" rows={2} className="w-full px-2 py-1 border rounded-md text-sm" />
                      {errors.bio && touched.bio && <p className="text-xs text-red-600">{errors.bio}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500">Email</label>
                      <Field type="email" name="email" className="w-full px-2 py-1 border rounded-md text-sm" />
                      {errors.email && touched.email && <p className="text-xs text-red-600">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500">Localisation</label>
                      <Field type="text" name="location" className="w-full px-2 py-1 border rounded-md text-sm" />
                    </div>
                    
                    <div className="flex justify-end pt-2">
                      <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="px-4 py-1 bg-teal-700 text-white rounded-md text-sm"
                      >
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <h2 className="uppercase font-bold">{user?.bio || 'NANG BITEGHE ALEC JORAINE'}</h2>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
      
      {/* Tabs */}
      <div className="border-b">
        <div className="flex justify-center gap-8">
          <button 
            onClick={() => setActiveTab('recipes')} 
            className={`flex items-center gap-2 py-3 ${activeTab === 'recipes' ? 'border-b-2 border-teal-700 text-teal-700' : 'text-gray-500'} font-medium`}
          >
            <UtensilsCrossed size={18} />
            <span>Recettes</span>
          </button>
          <button 
            onClick={() => setActiveTab('books')} 
            className={`flex items-center gap-2 py-3 ${activeTab === 'books' ? 'border-b-2 border-teal-700 text-teal-700' : 'text-gray-500'} font-medium`}
          >
            <BookOpen size={18} />
            <span>Livres</span>
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto p-4">
        <button className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm whitespace-nowrap">
          🔥 Récentes
        </button>
        <button className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm whitespace-nowrap">
          Tous les plats
        </button>
        <button className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm whitespace-nowrap">
          Tous les ingrédients
        </button>
        <button className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm whitespace-nowrap">
          Tous les régimes
        </button>
        <button className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm whitespace-nowrap">
          Tous les besoins
        </button>
        <button className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm whitespace-nowrap">
          Tous les allergènes
        </button>
      </div>
    {/* Section des recettes ou des livres */}
      <div className="p-4">
        {activeTab === 'recipes' ? (
          <div>
            <h3 className="text-xl font-semibold mb-4">Mes Recettes</h3>
            {/* Ici vous pouvez afficher les recettes de l'utilisateur */}
            <div className="grid grid-cols-2 gap-4">
              {/* Exemple d'affichage de recettes */}
              <div className="border rounded-lg p-4">
                <h4 className="text-lg font-medium">Recette 1</h4>
                <p className="text-sm">Description de la recette...</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="text-lg font-medium">Recette 2</h4>
                <p className="text-sm">Description de la recette...</p>
              </div>
              {/* Ajoutez d'autres recettes ici */}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4">Mes Livres</h3>
            {/* Ici vous pouvez afficher les livres de l'utilisateur */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="text-lg font-medium">Livre 1</h4>
                <p className="text-sm">Description du livre...</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="text-lg font-medium">Livre 2</h4>
                <p className="text-sm">Description du livre...</p>
              </div>
              {/* Ajoutez d'autres livres ici */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
