import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const BASE_URL = 'https://resto-back-qsyz.onrender.com/api';

const ProfileSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Trop court !').max(50, 'Trop long !').required('Requis'),
  email: Yup.string().email('Email invalide').required('Requis'),
  bio: Yup.string().max(200, 'La bio ne doit pas dépasser 200 caractères'),
  location: Yup.string().max(100, 'La localisation ne doit pas dépasser 100 caractères'),
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

  // ✅ Fonction pour uploader un avatar
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

  // ✅ Fonction pour mettre à jour le profil utilisateur
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Messages de notification */}
        {message.text && (
          <div className={`mb-4 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {/* Profil */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-green-500 to-green-600">
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <img src={avatarPreview} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-white shadow-lg" />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-white text-green-500 p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-50">
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleAvatarChange(e)} />
                    📷
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
                    <h1 className="text-3xl font-bold">{isEditing ? 'Modifier mon profil' : user?.name || 'Mon profil'}</h1>
                    <button type="button" onClick={() => setIsEditing(!isEditing)} className={`px-4 py-2 rounded-md ${isEditing ? 'border border-green-500 text-green-500' : 'bg-green-500 text-white'}`}>
                      {isEditing ? 'Annuler' : 'Modifier'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium">Nom</label>
                        <Field type="text" name="name" disabled={!isEditing} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                        {errors.name && touched.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Email</label>
                        <Field type="email" name="email" disabled={!isEditing} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                        {errors.email && touched.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium">Bio</label>
                        <Field as="textarea" name="bio" disabled={!isEditing} rows={3} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Localisation</label>
                        <Field type="text" name="location" disabled={!isEditing} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                      </button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
