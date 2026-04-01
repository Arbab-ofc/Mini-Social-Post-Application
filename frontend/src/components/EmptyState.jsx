import { Card, CardContent, Typography } from '@mui/material';

const EmptyState = ({ message = 'No posts yet. Be the first to share something.' }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Nothing here yet
        </Typography>
        <Typography color="text.secondary">{message}</Typography>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
