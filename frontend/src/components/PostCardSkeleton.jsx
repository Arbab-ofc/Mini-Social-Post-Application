import { Card, CardContent, CardHeader, Skeleton, Stack, Box } from '@mui/material';

const PostCardSkeleton = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        title={<Skeleton variant="text" width="40%" height={26} />}
        subheader={<Skeleton variant="text" width="28%" />}
      />

      <CardContent sx={{ pt: 0 }}>
        <Stack spacing={1}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="84%" />
          <Skeleton variant="text" width="62%" />
        </Stack>
      </CardContent>

      <Box sx={{ px: 2, pb: 1 }}>
        <Skeleton variant="rounded" height={220} />
      </Box>

      <Box sx={{ px: 2, pb: 2 }}>
        <Stack direction="row" spacing={1.2}>
          <Skeleton variant="rounded" width={96} height={34} />
          <Skeleton variant="rounded" width={108} height={34} />
        </Stack>
      </Box>
    </Card>
  );
};

export default PostCardSkeleton;
