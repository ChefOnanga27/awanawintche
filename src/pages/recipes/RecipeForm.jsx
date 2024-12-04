import { useFormik } from 'formik'
import * as Yup from 'yup'

function RecipeForm({ onSubmit, initialValues = {} }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      ingredients: '',
      instructions: '',
      prepTime: '',
      cookTime: '',
      category: '',
      image: '',
      ...initialValues
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nom requis'),
      description: Yup.string().required('Description requise'),
      ingredients: Yup.string().required('Ingrédients requis'),
      instructions: Yup.string().required('Instructions requises'),
      prepTime: Yup.number().required('Temps de préparation requis'),
      cookTime: Yup.number().required('Temps de cuisson requis'),
      category: Yup.string().required('Catégorie requise')
    }),
    onSubmit: values => {
      onSubmit(values)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Champs du formulaire */}
    </form>
  )
}

export default RecipeForm