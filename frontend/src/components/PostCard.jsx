import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Stack,
  Typography
} from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { getImageUrl } from '../api/axios';
import { formatDate } from '../utils/formatDate';
import CommentSection from './CommentSection';

const getInitials = (name = 'U') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || '')
    .join('');

const PostCard = ({
  post,
  canInteract,
  onLike,
  onComment,
  actionLoading,
  onNeedAuth
}) => {
  const [showComments, setShowComments] = useState(false);

  const liked = Boolean(post.isLikedByCurrentUser);
  const imageUrl = getImageUrl(post.image);

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'primary.light' }}>{getInitials(post.username)}</Avatar>}
        title={<Typography variant="subtitle1">{post.username}</Typography>}
        subheader={formatDate(post.createdAt)}
      />

      {post.text && (
        <CardContent sx={{ pt: 0 }}>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{post.text}</Typography>
        </CardContent>
      )}

      {imageUrl && (
        <CardMedia
          component="img"
          image={imageUrl}
          alt="Post"
          sx={{
            width: '100%',
            maxHeight: { xs: 420, md: 520 },
            objectFit: 'contain',
            backgroundColor: '#F4F8FF',
            borderTop: '1px solid #EAF1FD',
            borderBottom: '1px solid #EAF1FD'
          }}
        />
      )}

      <CardActions sx={{ px: 2, pb: 2, pt: 1.2 }}>
        <Stack direction="row" spacing={1} sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              color={liked ? 'error' : 'primary'}
              variant={liked ? 'contained' : 'outlined'}
              startIcon={liked ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
              disabled={Boolean(actionLoading.like)}
              onClick={() => {
                if (!canInteract) {
                  onNeedAuth();
                  return;
                }
                onLike();
              }}
            >
              {post.likesCount}
            </Button>

            <Button
              size="small"
              variant="outlined"
              startIcon={<ChatBubbleOutlineRoundedIcon />}
              onClick={() => setShowComments((prev) => !prev)}
            >
              {post.commentsCount}
            </Button>
          </Stack>

          <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
            {liked ? 'You and others liked this' : 'Tap to like'}
          </Typography>
        </Stack>
      </CardActions>

      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Box sx={{ px: 2, pb: 2 }}>
          <CommentSection
            comments={post.comments}
            canComment={canInteract}
            loading={Boolean(actionLoading.comment)}
            onComment={(text) => {
              if (!canInteract) {
                onNeedAuth();
                return Promise.resolve(false);
              }
              return onComment(text);
            }}
          />
        </Box>
      </Collapse>
    </Card>
  );
};

export default PostCard;
