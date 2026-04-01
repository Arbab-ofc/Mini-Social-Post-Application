import { useMemo } from 'react';
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

const PostComposer = ({ text, imageFile, imagePreview, loading, error, onTextChange, onImageChange, onSubmit }) => {
  const disabled = useMemo(() => !text.trim() && !imageFile, [text, imageFile]);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1.5 }}>
          Create Post
        </Typography>

        <Stack component="form" spacing={1.5} onSubmit={onSubmit}>
          <TextField
            multiline
            minRows={3}
            placeholder="What's on your mind?"
            value={text}
            onChange={(event) => onTextChange(event.target.value)}
          />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Button
              component="label"
              startIcon={<AddPhotoAlternateRoundedIcon />}
              variant="outlined"
              sx={{
                width: { xs: '100%', sm: 'auto' },
                flexShrink: 0,
                maxWidth: { xs: '100%', sm: 'fit-content' }
              }}
            >
              {imageFile ? 'Change Image' : 'Upload Image'}
              <input hidden type="file" accept="image/*" onChange={onImageChange} />
            </Button>
            {imageFile && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  minWidth: 0,
                  maxWidth: { xs: '100%', sm: 260 },
                  wordBreak: 'break-word'
                }}
              >
                {imageFile.name}
              </Typography>
            )}
          </Stack>

          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="Preview"
              sx={{ width: '100%', borderRadius: 2, maxHeight: 320, objectFit: 'cover' }}
            />
          )}

          {error && <Alert severity="error">{error}</Alert>}

          <Button type="submit" variant="contained" disabled={disabled || loading}>
            {loading ? 'Posting...' : 'Post'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostComposer;
