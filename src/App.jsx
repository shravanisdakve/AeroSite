import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProjectsPage from './pages/ProjectsPage';
import DPRFormPage from './pages/DPRFormPage';
import ReportHistoryPage from './pages/ReportHistoryPage';
import AllReportsPage from './pages/AllReportsPage';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

          {/* Protected routes */}
          <Route
            path={ROUTES.PROJECTS}
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.DPR_FORM}
            element={
              <ProtectedRoute>
                <DPRFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.DPR_HISTORY}
            element={
              <ProtectedRoute>
                <ReportHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ALL_REPORTS}
            element={
              <ProtectedRoute>
                <AllReportsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
