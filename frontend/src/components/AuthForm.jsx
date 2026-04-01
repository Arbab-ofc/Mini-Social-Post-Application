import { useState } from 'react';
import { Alert, Box, Button, Card, CardContent, Link, Stack, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink } from 'react-router-dom';

const AuthForm = ({
  mode,
  form,
  errors,
  submitting,
  onChange,
  onSubmit,
  apiError
}) => {
  const isSignup = mode === 'signup';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Box sx={{ maxWidth: 520, mx: 'auto', mt: { xs: 2, md: 5 } }}>
      <Card>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="h5" gutterBottom>
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.2 }}>
            {isSignup
              ? 'Join Mini Social and start sharing posts.'
              : 'Login to create posts, like and comment.'}
          </Typography>

          <Stack component="form" spacing={1.5} onSubmit={onSubmit}>
            {isSignup && (
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={onChange}
                error={Boolean(errors.username)}
                helperText={errors.username}
              />
            )}

            <TextField
              label={isSignup ? 'Email' : 'Email or Username'}
              type={isSignup ? 'email' : 'text'}
              name="email"
              value={form.email}
              onChange={onChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={onChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {isSignup && (
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={onChange}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}

            {apiError && <Alert severity="error">{apiError}</Alert>}

            <Button type="submit" variant="contained" size="large" disabled={submitting} sx={{ mt: 1 }}>
              {submitting ? 'Please wait...' : isSignup ? 'Sign Up' : 'Login'}
            </Button>
          </Stack>

          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Link component={RouterLink} to={isSignup ? '/login' : '/signup'} underline="hover">
              {isSignup ? 'Login' : 'Sign Up'}
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuthForm;
