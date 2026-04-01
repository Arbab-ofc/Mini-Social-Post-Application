import { CircularProgress, Stack } from '@mui/material';

const Loader = () => {
  return (
    <Stack minHeight="40vh" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Stack>
  );
};

export default Loader;
