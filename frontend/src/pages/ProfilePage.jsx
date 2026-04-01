import { useEffect, useState } from 'react';
import { Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchMyStats = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/posts?page=1&limit=100');
        const mine = (data.posts || []).filter((post) => String(post.user) === String(user?._id));
        setPostCount(mine.length);
      } catch (error) {
        setPostCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchMyStats();
  }, [user?._id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Profile
          </Typography>

          <Stack spacing={1.2} sx={{ mb: 2 }}>
            <Typography>
              <strong>Username:</strong> {user?.username}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography>
              <strong>Total Authored Posts:</strong> {postCount}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.2}>
            <Button variant="outlined" onClick={() => navigate('/feed')}>
              Back to Feed
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Logout
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
