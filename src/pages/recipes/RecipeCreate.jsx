import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const RecipeSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .required('Le titre est requis'),
  description: Yup.string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .required('La description est requise'),
  duration: Yup.string()
    .required('La durée est requise'),
  difficulty: Yup.string()
    .required('La difficulté est requise'),
  ingredients: Yup.string()
    .required('Les ingrédients sont requis'),
  instructions: Yup.string()
    .required('Les instructions sont requises'),
});

function RecipeCreate() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue('video', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Convertir les ingrédients et instructions en tableaux
      const ingredientsArray = values.ingredients
        .split('\n')
        .filter(ingredient => ingredient.trim() !== '');
      
      const instructionsArray = values.instructions
        .split('\n')
        .filter(instruction => instruction.trim() !== '');

      // Créer une nouvelle recette avec un ID unique
      const newRecipe = {
        id: Date.now(),
        ...values,
        ingredients: ingredientsArray,
        instructions: instructionsArray,
        image: imagePreview,
        video: videoPreview,
        createdAt: new Date().toISOString(),
      };

      // Récupérer les recettes existantes
      const existingRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
      
      // Ajouter la nouvelle recette au tableau
      const updatedRecipes = [newRecipe, ...existingRecipes];

      // Sauvegarder dans le localStorage
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

      // Réinitialiser le formulaire
      resetForm();
      setImagePreview(null);
      setVideoPreview(null);

      // Afficher un message de succès
      alert('Recette créée avec succès !');

      // Rediriger vers la page des recettes
      navigate('/recipes');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Une erreur est survenue lors de la création de la recette');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Créer une nouvelle recette</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <Formik
            initialValues={{
              title: '',
              description: '',
              duration: '',
              difficulty: '',
              ingredients: '',
              instructions: '',
              image: null,
              video: null,
            }}
            validationSchema={RecipeSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Champ d'upload d'image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Photo de la recette
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Aperçu"
                            className="mx-auto h-32 w-32 object-cover rounded-md"
                          />
                        ) : (
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark">
                            <span>Télécharger une photo</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, setFieldValue)}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG jusqu/à 10MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Champ d'upload de vidéo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Vidéo de la recette (optionnel)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {videoPreview ? (
                          <video
                            src={videoPreview}
                            className="mx-auto h-32 w-32 object-cover rounded-md"
                            controls
                          />
                        ) : (
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M15 10l19.66 13.11a1 1 0 010 1.58L15 38"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark">
                            <span>Télécharger une vidéo</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="video/*"
                              onChange={(e) => handleVideoChange(e, setFieldValue)}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">MP4, WebM jusqu/à 50MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Autres champs du formulaire */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titre de la recette
                  </label>
                  <Field
                    type="text"
                    name="title"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Ex: Poulet rôti aux herbes"
                  />
                  {errors.title && touched.title && (
                    <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Une brève description de votre recette"
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      Durée de préparation
                    </label>
                    <Field
                      type="text"
                      name="duration"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="Ex: 1h30"
                    />
                    {errors.duration && touched.duration && (
                      <div className="text-red-500 text-sm mt-1">{errors.duration}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                      Niveau de difficulté
                    </label>
                    <Field
                      as="select"
                      name="difficulty"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    >
                      <option value="">Sélectionner</option>
                      <option value="Facile">Facile</option>
                      <option value="Moyen">Moyen</option>
                      <option value="Difficile">Difficile</option>
                    </Field>
                    {errors.difficulty && touched.difficulty && (
                      <div className="text-red-500 text-sm mt-1">{errors.difficulty}</div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                    Ingrédients
                  </label>
                  <Field
                    as="textarea"
                    name="ingredients"
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Liste des ingrédients (un par ligne)"
                  />
                  {errors.ingredients && touched.ingredients && (
                    <div className="text-red-500 text-sm mt-1">{errors.ingredients}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                    Instructions
                  </label>
                  <Field
                    as="textarea"
                    name="instructions"
                    rows="6"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Les étapes de préparation"
                  />
                  {errors.instructions && touched.instructions && (
                    <div className="text-red-500 text-sm mt-1">{errors.instructions}</div>
                  )}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/recipes')}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
                  >
                    {isSubmitting ? 'Création...' : 'Créer la recette'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>

  );
}

export default RecipeCreate;