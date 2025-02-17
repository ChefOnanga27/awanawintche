import  { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

function RecipeForm({ onSubmit, initialValues = {} }) {
  const [ingredients, setIngredients] = useState(initialValues.ingredients || []);
  const [instructions, setInstructions] = useState(initialValues.instructions || []);

  const formik = useFormik({
    initialValues: {
      name: initialValues.name || '',
      description: initialValues.description || '',
      prepTime: initialValues.prepTime || '',
      cookTime: initialValues.cookTime || '',
      category: initialValues.category || '',
      image: initialValues.image || '',
      ingredients: '',  // Vide au début
      instructions: '',  // Vide au début
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nom requis'),
      description: Yup.string().required('Description requise'),
      prepTime: Yup.number().required('Temps de préparation requis').positive('Le temps doit être positif').integer('Le temps doit être un nombre entier'),
      cookTime: Yup.number().required('Temps de cuisson requis').positive('Le temps doit être positif').integer('Le temps doit être un nombre entier'),
      category: Yup.string().required('Catégorie requise'),
      image: Yup.string().url('L\'URL de l\'image doit être valide').required('Image requise'),
    }),
    onSubmit: (values) => {
      onSubmit({ ...values, ingredients, instructions });
    },
  });

  const handleAddIngredient = () => {
    if (formik.values.ingredients) {
      setIngredients([...ingredients, formik.values.ingredients]);
      formik.setFieldValue('ingredients', '');  // Réinitialiser le champ des ingrédients
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleAddInstruction = () => {
    if (formik.values.instructions) {
      setInstructions([...instructions, formik.values.instructions]);
      formik.setFieldValue('instructions', '');  // Réinitialiser le champ des instructions
    }
  };

  const handleRemoveInstruction = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Champ du nom de la recette */}
      <div>
        <label htmlFor="name" className="block text-gray-700">Nom de la recette</label>
        <input
          type="text"
          id="name"
          name="name"
          {...formik.getFieldProps('name')}
          className="mt-2 p-3 border rounded w-full"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        )}
      </div>

      {/* Champ de la description */}
      <div>
        <label htmlFor="description" className="block text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          {...formik.getFieldProps('description')}
          className="mt-2 p-3 border rounded w-full"
        />
        {formik.touched.description && formik.errors.description && (
          <div className="text-red-500 text-sm">{formik.errors.description}</div>
        )}
      </div>

      {/* Champ du temps de préparation */}
      <div>
        <label htmlFor="prepTime" className="block text-gray-700">Temps de préparation (min)</label>
        <input
          type="number"
          id="prepTime"
          name="prepTime"
          {...formik.getFieldProps('prepTime')}
          className="mt-2 p-3 border rounded w-full"
        />
        {formik.touched.prepTime && formik.errors.prepTime && (
          <div className="text-red-500 text-sm">{formik.errors.prepTime}</div>
        )}
      </div>

      {/* Champ du temps de cuisson */}
      <div>
        <label htmlFor="cookTime" className="block text-gray-700">Temps de cuisson (min)</label>
        <input
          type="number"
          id="cookTime"
          name="cookTime"
          {...formik.getFieldProps('cookTime')}
          className="mt-2 p-3 border rounded w-full"
        />
        {formik.touched.cookTime && formik.errors.cookTime && (
          <div className="text-red-500 text-sm">{formik.errors.cookTime}</div>
        )}
      </div>

      {/* Champ de la catégorie */}
      <div>
        <label htmlFor="category" className="block text-gray-700">Catégorie</label>
        <input
          type="text"
          id="category"
          name="category"
          {...formik.getFieldProps('category')}
          className="mt-2 p-3 border rounded w-full"
        />
        {formik.touched.category && formik.errors.category && (
          <div className="text-red-500 text-sm">{formik.errors.category}</div>
        )}
      </div>

      {/* Champ de l'image */}
      <div>
        <label htmlFor="image" className="block text-gray-700">URL de l/Simage</label>
        <input
          type="text"
          id="image"
          name="image"
          {...formik.getFieldProps('image')}
          className="mt-2 p-3 border rounded w-full"
        />
        {formik.touched.image && formik.errors.image && (
          <div className="text-red-500 text-sm">{formik.errors.image}</div>
        )}
      </div>

      {/* Liste des ingrédients */}
      <div>
        <label htmlFor="ingredients" className="block text-gray-700">Ingrédients</label>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          {...formik.getFieldProps('ingredients')}
          className="mt-2 p-3 border rounded w-full"
        />
        <button
          type="button"
          onClick={handleAddIngredient}
          className="mt-2 text-white bg-green-500 p-2 rounded"
        >
          Ajouter un ingrédient
        </button>
        <ul className="mt-4 space-y-2">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="flex justify-between items-center">
              {ingredient}
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="text-red-500"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Liste des instructions */}
      <div>
        <label htmlFor="instructions" className="block text-gray-700">Instructions</label>
        <input
          type="text"
          id="instructions"
          name="instructions"
          {...formik.getFieldProps('instructions')}
          className="mt-2 p-3 border rounded w-full"
        />
        <button
          type="button"
          onClick={handleAddInstruction}
          className="mt-2 text-white bg-green-500 p-2 rounded"
        >
          Ajouter une instruction
        </button>
        <ul className="mt-4 space-y-2">
          {instructions.map((instruction, index) => (
            <li key={index} className="flex justify-between items-center">
              {instruction}
              <button
                type="button"
                onClick={() => handleRemoveInstruction(index)}
                className="text-red-500"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bouton de soumission */}
      <div>
        <button type="submit" className="w-full py-3 bg-green-500 text-white rounded">
          Soumettre la recette
        </button>
      </div>
    </form>
  );
}

RecipeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    prepTime: PropTypes.number,
    cookTime: PropTypes.number,
    category: PropTypes.string,
    image: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    instructions: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default RecipeForm;
