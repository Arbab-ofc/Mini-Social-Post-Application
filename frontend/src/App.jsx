import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import BottomNavBar from './components/BottomNavBar';
import ProtectedRoute from './components/ProtectedRoute';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';

const App = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        backgroundImage: 'radial-gradient(circle at 20% 0%, rgba(77,142,243,0.18), transparent 35%)'
      }}
    >
      <AppHeader />
      <Box sx={{ pb: { xs: 10, md: 4 } }}>
        <Routes>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/feed" replace />} />
        </Routes>
      </Box>
      <BottomNavBar />
    </Box>
  );
};

export default App;
