import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Button, Card, CardContent, Chip, Container, Divider, Snackbar, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import EmptyState from '../components/EmptyState';
import PostCard from '../components/PostCard';
import PostComposer from '../components/PostComposer';
import PostComposerSkeleton from '../components/PostComposerSkeleton';
import PostCardSkeleton from '../components/PostCardSkeleton';
import { useAuth } from '../context/AuthContext';

const normalizePost = (post, currentUserId) => {
  const likes = post.likes || [];
  const comments = post.comments || [];
  const likedByCurrentUser = currentUserId
    ? likes.some((like) => String(like.userId) === String(currentUserId))
    : Boolean(post.isLikedByCurrentUser);

  return {
    ...post,
    likes,
    comments,
    likesCount: post.likesCount ?? likes.length,
    commentsCount: post.commentsCount ?? comments.length,
    isLikedByCurrentUser: likedByCurrentUser
  };
};

const createSeededRandom = (seed) => {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

const shuffleBySeed = (items, seed) => {
  const arr = [...items];
  const random = createSeededRandom(seed);
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const FeedPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [posts, setPosts] = useState([]);
  const [sortMode, setSortMode] = useState('random');
  const [randomSeed, setRandomSeed] = useState(() => Date.now());
  const [feedMode, setFeedMode] = useState('all');
  const [loading, setLoading] = useState(true);
  const [composer, setComposer] = useState({ text: '', imageFile: null, imagePreview: '' });
  const [composerError, setComposerError] = useState('');
  const [creating, setCreating] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  const maxImageSizeBytes = 5 * 1024 * 1024;

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/posts?page=1&limit=20');
      setPosts((data.posts || []).map((post) => normalizePost(post, user?._id)));
    } catch (error) {
      showSnackbar('Failed to load feed', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [user?._id]);

  const clearComposer = () => {
    setComposer({ text: '', imageFile: null, imagePreview: '' });
    setComposerError('');
  };

  const canPost = useMemo(() => composer.text.trim() || composer.imageFile, [composer]);
  const filteredPosts = useMemo(() => {
    if (feedMode !== 'mine' || !isAuthenticated || !user?._id) {
      return posts;
    }

    return posts.filter((post) => String(post.user) === String(user._id));
  }, [posts, feedMode, isAuthenticated, user?._id]);

  const sortedPosts = useMemo(() => {
    if (sortMode === 'random') {
      return shuffleBySeed(filteredPosts, randomSeed);
    }

    if (sortMode === 'oldest') {
      return [...filteredPosts].reverse();
    }

    return filteredPosts;
  }, [filteredPosts, sortMode, randomSeed]);

  const handleCreatePost = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      showSnackbar('Please login to create posts', 'warning');
      navigate('/login', { state: { from: '/feed' } });
      return;
    }

    const text = composer.text.trim();
    const hasImage = Boolean(composer.imageFile);

    if (!text && !hasImage) {
      setComposerError('Please add text or an image');
      return;
    }

    setComposerError('');
    setCreating(true);

    const tempId = `temp-${Date.now()}`;
    const optimisticPost = normalizePost(
      {
        _id: tempId,
        username: user.username,
        text,
        image: composer.imagePreview,
        likes: [],
        comments: [],
        createdAt: new Date().toISOString()
      },
      user._id
    );

    setPosts((prev) => [optimisticPost, ...prev]);

    const formData = new FormData();
    if (text) formData.append('text', text);
    if (composer.imageFile) formData.append('image', composer.imageFile);

    try {
      const { data } = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const savedPost = normalizePost(data.post, user._id);
      setPosts((prev) => prev.map((post) => (post._id === tempId ? savedPost : post)));
      clearComposer();
      showSnackbar('Post created', 'success');
    } catch (error) {
      setPosts((prev) => prev.filter((post) => post._id !== tempId));
      showSnackbar(error.response?.data?.message || 'Failed to create post', 'error');
    } finally {
      setCreating(false);
    }
  };

  const handleLike = async (postId) => {
    if (!isAuthenticated) {
      showSnackbar('Login required to like posts', 'warning');
      navigate('/login', { state: { from: '/feed' } });
      return;
    }

    const prevPosts = posts;

    setPosts((current) =>
      current.map((post) => {
        if (post._id !== postId) return post;
        const liked = Boolean(post.isLikedByCurrentUser);
        return {
          ...post,
          isLikedByCurrentUser: !liked,
          likesCount: liked ? Math.max(post.likesCount - 1, 0) : post.likesCount + 1
        };
      })
    );

    setActionLoading((prev) => ({ ...prev, [postId]: { ...prev[postId], like: true } }));

    try {
      const { data } = await api.post(`/posts/${postId}/like`);
      setPosts((current) =>
        current.map((post) => (post._id === postId ? normalizePost(data.post, user._id) : post))
      );
    } catch (error) {
      setPosts(prevPosts);
      showSnackbar(error.response?.data?.message || 'Could not update like', 'error');
    } finally {
      setActionLoading((prev) => ({ ...prev, [postId]: { ...prev[postId], like: false } }));
    }
  };

  const handleComment = async (postId, text) => {
    if (!isAuthenticated) {
      showSnackbar('Login required to comment', 'warning');
      navigate('/login', { state: { from: '/feed' } });
      return false;
    }

    const prevPosts = posts;

    const optimisticComment = {
      _id: `temp-comment-${Date.now()}`,
      userId: user._id,
      username: user.username,
      text,
      createdAt: new Date().toISOString()
    };

    setPosts((current) =>
      current.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: [...post.comments, optimisticComment],
              commentsCount: post.commentsCount + 1
            }
          : post
      )
    );

    setActionLoading((prev) => ({ ...prev, [postId]: { ...prev[postId], comment: true } }));

    try {
      const { data } = await api.post(`/posts/${postId}/comment`, { text });
      setPosts((current) =>
        current.map((post) => (post._id === postId ? normalizePost(data.post, user._id) : post))
      );
      return true;
    } catch (error) {
      setPosts(prevPosts);
      showSnackbar(error.response?.data?.message || 'Failed to comment', 'error');
      return false;
    } finally {
      setActionLoading((prev) => ({ ...prev, [postId]: { ...prev[postId], comment: false } }));
    }
  };

  const handleShare = async (post) => {
    if (!post?._id || String(post._id).startsWith('temp-')) {
      showSnackbar('Please wait for post to finish saving before sharing', 'warning');
      return;
    }

    const url = `${window.location.origin}/post/${post._id}`;
    const shareData = {
      title: `Post by ${post.username}`,
      text: post.text ? post.text.slice(0, 120) : 'Check out this post on Mini Social',
      url
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error?.name === 'AbortError') return;
      }
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      showSnackbar('Post link copied to clipboard', 'success');
      return;
    }

    showSnackbar(url, 'info');
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: { xs: '1.55rem', md: '2rem' }, mb: 0.8 }}>
            Social Feed
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              label="All Posts"
              clickable
              onClick={() => {
                setFeedMode('all');
                setSortMode('random');
                setRandomSeed(Date.now());
              }}
              color={feedMode === 'all' && sortMode === 'random' ? 'primary' : 'default'}
              variant={feedMode === 'all' && sortMode === 'random' ? 'filled' : 'outlined'}
            />
            <Chip
              label="Newest"
              clickable
              onClick={() => {
                setFeedMode('all');
                setSortMode('newest');
              }}
              color={sortMode === 'newest' ? 'primary' : 'default'}
              variant={sortMode === 'newest' ? 'filled' : 'outlined'}
            />
            <Chip
              label="Oldest"
              clickable
              onClick={() => {
                setFeedMode('all');
                setSortMode('oldest');
              }}
              color={sortMode === 'oldest' ? 'primary' : 'default'}
              variant={sortMode === 'oldest' ? 'filled' : 'outlined'}
            />
            <Chip
              label={isAuthenticated ? 'My Posts' : 'Public View'}
              clickable
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login', { state: { from: '/feed' } });
                  return;
                }
                setFeedMode((prev) => (prev === 'mine' ? 'all' : 'mine'));
                setSortMode('newest');
              }}
              color={isAuthenticated && feedMode === 'mine' ? 'primary' : 'default'}
              variant={isAuthenticated && feedMode === 'mine' ? 'filled' : 'outlined'}
            />
          </Stack>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '320px 1fr', lg: '360px 1fr' },
            gap: { xs: 2, md: 2.5, lg: 3 },
            alignItems: 'start'
          }}
        >
          <Box sx={{ position: { md: 'sticky' }, top: { md: 92 } }}>
            {loading && isAuthenticated ? (
              <PostComposerSkeleton />
            ) : isAuthenticated ? (
              <PostComposer
                text={composer.text}
                imageFile={composer.imageFile}
                imagePreview={composer.imagePreview}
                loading={creating}
                error={composerError}
                onTextChange={(text) => setComposer((prev) => ({ ...prev, text }))}
                onImageChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  if (!allowedImageTypes.includes(file.type)) {
                    setComposerError('Invalid image type. Allowed: PNG, JPG, JPEG, WEBP');
                    event.target.value = '';
                    return;
                  }
                  if (file.size > maxImageSizeBytes) {
                    setComposerError('Image size must be 5MB or smaller');
                    event.target.value = '';
                    return;
                  }
                  setComposer((prev) => ({ ...prev, imageFile: file, imagePreview: URL.createObjectURL(file) }));
                  setComposerError('');
                }}
                onSubmit={handleCreatePost}
              />
            ) : (
              <Alert
                severity="info"
                action={
                  <Button color="inherit" size="small" onClick={() => navigate('/login', { state: { from: '/feed' } })}>
                    Login
                  </Button>
                }
                sx={{ mb: 2 }}
              >
                You can view posts publicly. Login to create posts, like and comment.
              </Alert>
            )}

            <Card>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Feed Tips
                </Typography>
                <Divider sx={{ mb: 1.2 }} />
                <Typography variant="body2" color="text.secondary">
                  Text posts, image posts, and mixed posts are supported. Likes and comments update live without page refresh.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ '@keyframes fadeSlideIn': { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
            {!canPost && isAuthenticated && composerError && <Alert severity="error">{composerError}</Alert>}

            {loading ? (
              <>
                {[1, 2, 3].map((key) => (
                  <PostCardSkeleton key={key} />
                ))}
              </>
            ) : sortedPosts.length === 0 ? (
              <EmptyState />
            ) : (
              sortedPosts.map((post, index) => (
                <Box
                  key={post._id}
                  sx={{
                    animationName: 'fadeSlideIn',
                    animationDuration: '280ms',
                    animationTimingFunction: 'ease',
                    animationFillMode: 'both',
                    animationDelay: `${Math.min(index * 35, 260)}ms`
                  }}
                >
                  <PostCard
                    post={post}
                    canInteract={isAuthenticated}
                    actionLoading={actionLoading[post._id] || {}}
                    onNeedAuth={() => {
                      showSnackbar('Please login to interact', 'warning');
                      navigate('/login', { state: { from: '/feed' } });
                    }}
                    onLike={() => handleLike(post._id)}
                    onComment={(text) => handleComment(post._id, text)}
                    onShare={() => handleShare(post)}
                  />
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          variant="filled"
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FeedPage;
