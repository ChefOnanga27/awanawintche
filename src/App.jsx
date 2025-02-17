import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// composants Layout
import Sidebar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Composants
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/Profile';
import RecipeCreate from './pages/recipes/RecipeCreate';
import RecipeDetail from './pages/recipes/RecipeDetail';
import RecipeEdit from './pages/recipes/RecipeEdit';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-secondary-black flex flex-col">
          <Sidebar />
          
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              
              {/* Routes protégées */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recipes/create"
                element={
                  <ProtectedRoute>
                    <RecipeCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recipes/edit/:id"
                element={
                  <ProtectedRoute>
                    <RecipeEdit />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;