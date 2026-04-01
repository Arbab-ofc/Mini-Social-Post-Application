import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navValue = location.pathname.startsWith('/profile')
    ? '/profile'
    : location.pathname.startsWith('/feed') || location.pathname.startsWith('/post/')
      ? '/feed'
      : location.pathname;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: 600,
        mx: 'auto',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        overflow: 'hidden',
        border: '1px solid #DDE8FB',
        display: { xs: 'block', md: 'none' }
      }}
    >
      <BottomNavigation showLabels value={navValue} onChange={(_, value) => navigate(value)}>
        <BottomNavigationAction label="Feed" value="/feed" icon={<HomeRoundedIcon />} />
        <BottomNavigationAction label="Create" value="/feed" icon={<AddCircleRoundedIcon />} />
        <BottomNavigationAction label="Profile" value="/profile" icon={<PersonRoundedIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;
