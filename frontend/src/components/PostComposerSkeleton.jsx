import { Card, CardContent, Skeleton, Stack } from '@mui/material';

const PostComposerSkeleton = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack spacing={1.4}>
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="rounded" height={120} />
          <Skeleton variant="rounded" width={140} height={38} />
          <Skeleton variant="rounded" height={40} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostComposerSkeleton;
