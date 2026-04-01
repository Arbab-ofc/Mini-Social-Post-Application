import { AppBar, Avatar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AppHeader = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const initials = user?.username
    ? user.username
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase() || '')
        .join('')
    : 'MS';

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: '1px solid #DDE8FB',
        backdropFilter: 'blur(6px)',
        bgcolor: 'rgba(255,255,255,0.92)'
      }}
    >
      <Toolbar sx={{ maxWidth: 1120, mx: 'auto', width: '100%', px: { xs: 2, md: 3 } }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
          <Box
            onClick={() => navigate('/feed')}
            sx={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigate('/feed');
              }
            }}
          >
            <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
              Mini Social
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Share moments with your community
            </Typography>
          </Box>
        </Stack>

        {isAuthenticated ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              onClick={() => navigate('/profile')}
              sx={{
                minWidth: 0,
                px: 0.9,
                py: 0.45,
                borderRadius: 999,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(242,248,255,0.92))',
                border: '1px solid #CFE0FF',
                boxShadow: '0 10px 24px rgba(23, 105, 224, 0.18), inset 0 1px 0 rgba(255,255,255,0.95)',
                gap: 0.8,
                transition: 'all 180ms ease',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '45%',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0))'
                },
                '&:hover': {
                  background: 'linear-gradient(180deg, #FFFFFF, #ECF4FF)',
                  boxShadow: '0 14px 28px rgba(23, 105, 224, 0.24), inset 0 1px 0 rgba(255,255,255,0.98)',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              <Box
                sx={{
                  p: '2px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0D63D9, #3DA5FF 55%, #7CC7FF)',
                  boxShadow: '0 0 0 3px rgba(61, 165, 255, 0.15)'
                }}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: '#F6FAFF',
                    color: '#0D4FB8',
                    fontWeight: 800,
                    fontSize: '0.83rem'
                  }}
                >
                  {initials}
                </Avatar>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: '#0F4FAA',
                  display: { xs: 'none', sm: 'block' },
                  maxWidth: 96,
                  px: 0.35,
                  py: 0.12,
                  borderRadius: 999,
                  backgroundColor: 'rgba(23, 105, 224, 0.08)',
                  zIndex: 1
                }}
                noWrap
              >
                {user?.username}
              </Typography>
            </Button>
            <IconButton
              onClick={() => {
                logout();
                navigate('/login');
              }}
              color="primary"
            >
              <LogoutRoundedIcon />
            </IconButton>
          </Stack>
        ) : (
          <Button startIcon={<LoginRoundedIcon />} variant="contained" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
