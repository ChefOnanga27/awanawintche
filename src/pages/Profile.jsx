import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { updateUserProfile, uploadUserAvatar } from '../services/api';

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Trop court !')
    .max(50, 'Trop long !')
    .required('Requis'),
  email: Yup.string()
    .email('Email invalide')
    .required('Requis'),
  bio: Yup.string()
    .max(200, 'La bio ne doit pas dépasser 200 caractères'),
  location: Yup.string()
    .max(100, 'La localisation ne doit pas dépasser 100 caractères'),
});

function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '/default-avatar.png');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user?.avatar) {
      setAvatarPreview(user.avatar);
    }
  }, [user?.avatar]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleAvatarChange = async (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      try {
        const avatarUrl = await uploadUserAvatar(file);
        setAvatarPreview(avatarUrl);
        setFieldValue('avatar', avatarUrl);
        showMessage('success', 'Photo de profil mise à jour !');
      } catch (error) {
        showMessage('error', error.message || 'Erreur lors du téléchargement de la photo');
      }
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const updatedUser = await updateUserProfile(values);
      updateUser(updatedUser);
      setIsEditing(false);
      showMessage('success', 'Profil mis à jour avec succès !');
    } catch (error) {
      showMessage('error', error.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Message de notification */}
        {message.text && (
          <div
            className={`mb-4 p-4 rounded-md ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-400'
                : 'bg-red-50 text-red-800 border border-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* En-tête du profil avec bannière */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-green-500 to-green-600">
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-white text-green-500 p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleAvatarChange(e)}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8">
            <Formik
              initialValues={{
                name: user?.name || '',
                email: user?.email || '',
                bio: user?.bio || '',
                location: user?.location || '',
                avatar: user?.avatar || '',
              }}
              validationSchema={ProfileSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {isEditing ? 'Modifier mon profil' : user?.name || 'Mon profil'}
                    </h1>
                    <button
                      type="button"
                      onClick={() => setIsEditing(!isEditing)}
                      className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      style={{
                        backgroundColor: isEditing ? '#FFF' : '#10B981', // Vert pour "Modifier"
                        color: isEditing ? '#10B981' : '#FFF',
                        border: isEditing ? '1px solid #10B981' : 'none'
                      }}
                    >
                      {isEditing ? 'Annuler' : 'Modifier'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <Field
                          type="text"
                          name="name"
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        />
                        {errors.name && touched.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Field
                          type="email"
                          name="email"
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        />
                        {errors.email && touched.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <Field
                          as="textarea"
                          name="bio"
                          disabled={!isEditing}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                        <Field
                          type="text"
                          name="location"
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                      >
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                      </button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Section des recettes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes Recettes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.recipes?.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 text-sm">{recipe.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
