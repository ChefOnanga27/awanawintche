import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user' // Valeur par défaut pour le rôle
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Nom requis')
        .min(2, 'Le nom doit contenir au moins 2 caractères'),
      email: Yup.string()
        .email('Adresse email invalide')
        .required('Email requis'),
      password: Yup.string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .required('Mot de passe requis'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
        .required('Confirmation du mot de passe requise'),
      role: Yup.string()
        .oneOf(['user', 'admin'], 'Le rôle doit être soit "user" soit "admin"')
        .required('Rôle requis')
    }),
    onSubmit: async (values) => {
      try {
        // Envoi des données à l'API
        const response = await fetch('https://restaurant-backend-snowy.vercel.app/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        // Vérifier si l'inscription a réussi
        if (response.ok) {
          console.log('Inscription réussie');
          navigate('/login'); // Rediriger vers la page de login
        } else {
          const data = await response.json();
          console.error('Erreur d\'inscription:', data.message);
        }
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-green-600">
            Créer un compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-800">
              connectez-vous à votre compte existant
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                id="username"
                name="username"
                type="text"
                {...formik.getFieldProps('username')}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                {...formik.getFieldProps('email')}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                {...formik.getFieldProps('password')}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...formik.getFieldProps('confirmPassword')}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
              )}
            </div>

            {/* Champ de sélection pour le rôle */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Rôle
              </label>
              <select
                id="role"
                name="role"
                {...formik.getFieldProps('role')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
              {formik.touched.role && formik.errors.role && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.role}</div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
