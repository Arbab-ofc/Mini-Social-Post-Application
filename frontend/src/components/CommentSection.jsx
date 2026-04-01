import { useState } from 'react';
import { Avatar, Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { formatDate } from '../utils/formatDate';

const avatarText = (name = 'U') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

const CommentSection = ({ comments = [], canComment, onComment, loading }) => {
  const [text, setText] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const ok = await onComment(trimmed);
    if (ok) setText('');
  };

  return (
    <Box>
      <Stack spacing={1.2} sx={{ mb: 1.2 }}>
        {comments.map((comment) => (
          <Box key={comment._id} sx={{ bgcolor: '#F7FAFF', borderRadius: 2, px: 1.2, py: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.4 }}>
              <Avatar sx={{ width: 24, height: 24, fontSize: 11, bgcolor: 'primary.light' }}>
                {avatarText(comment.username)}
              </Avatar>
              <Typography variant="subtitle2">{comment.username}</Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(comment.createdAt)}
              </Typography>
            </Stack>
            <Typography variant="body2">{comment.text}</Typography>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ mb: 1.2 }} />

      {canComment ? (
        <Stack component="form" direction="row" spacing={1} onSubmit={submit}>
          <TextField
            size="small"
            placeholder="Write a comment"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <Button type="submit" variant="contained" disabled={!text.trim() || loading}>
            Send
          </Button>
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Login to comment.
        </Typography>
      )}
    </Box>
  );
};

export default CommentSection;
