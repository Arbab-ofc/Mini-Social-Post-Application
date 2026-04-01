import { useEffect, useState } from 'react';
import { Alert, Box, Button, Container, Snackbar, Stack, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import EmptyState from '../components/EmptyState';
import PostCard from '../components/PostCard';
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

const PostDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({ like: false, comment: false });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const loadPost = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/posts/${id}`);
      setPost(normalizePost(data.post, user?._id));
    } catch (error) {
      setPost(null);
      showSnackbar(error.response?.data?.message || 'Unable to load post', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [id, user?._id]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      showSnackbar('Login required to like posts', 'warning');
      navigate('/login', { state: { from: `/post/${id}` } });
      return;
    }

    const previous = post;
    setPost((current) => {
      if (!current) return current;
      const liked = Boolean(current.isLikedByCurrentUser);
      return {
        ...current,
        isLikedByCurrentUser: !liked,
        likesCount: liked ? Math.max(current.likesCount - 1, 0) : current.likesCount + 1
      };
    });

    setActionLoading((prev) => ({ ...prev, like: true }));

    try {
      const { data } = await api.post(`/posts/${id}/like`);
      setPost(normalizePost(data.post, user._id));
    } catch (error) {
      setPost(previous);
      showSnackbar(error.response?.data?.message || 'Could not update like', 'error');
    } finally {
      setActionLoading((prev) => ({ ...prev, like: false }));
    }
  };

  const handleComment = async (text) => {
    if (!isAuthenticated) {
      showSnackbar('Login required to comment', 'warning');
      navigate('/login', { state: { from: `/post/${id}` } });
      return false;
    }

    const previous = post;
    const optimisticComment = {
      _id: `temp-comment-${Date.now()}`,
      userId: user._id,
      username: user.username,
      text,
      createdAt: new Date().toISOString()
    };

    setPost((current) => {
      if (!current) return current;
      return {
        ...current,
        comments: [...current.comments, optimisticComment],
        commentsCount: current.commentsCount + 1
      };
    });

    setActionLoading((prev) => ({ ...prev, comment: true }));

    try {
      const { data } = await api.post(`/posts/${id}/comment`, { text });
      setPost(normalizePost(data.post, user._id));
      return true;
    } catch (error) {
      setPost(previous);
      showSnackbar(error.response?.data?.message || 'Failed to comment', 'error');
      return false;
    } finally {
      setActionLoading((prev) => ({ ...prev, comment: false }));
    }
  };

  const handleShare = async () => {
    if (!post?._id) return;

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
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 3 } }}>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/feed')} sx={{ borderRadius: 999 }}>
            Back to Feed
          </Button>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.15rem' } }}>
            Shared Post
          </Typography>
        </Stack>

        {loading ? (
          <PostCardSkeleton />
        ) : !post ? (
          <Box>
            <Alert severity="warning" sx={{ mb: 1.5 }}>
              This post is unavailable or was removed.
            </Alert>
            <EmptyState title="Post not found" description="Try opening another post from the feed." />
          </Box>
        ) : (
          <PostCard
            post={post}
            canInteract={isAuthenticated}
            actionLoading={actionLoading}
            onNeedAuth={() => {
              showSnackbar('Please login to interact', 'warning');
              navigate('/login', { state: { from: `/post/${id}` } });
            }}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
          />
        )}
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2600}
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

export default PostDetailsPage;
