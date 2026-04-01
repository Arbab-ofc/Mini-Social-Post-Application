import { useState } from 'react';
import { Alert, Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from || '/feed';

  const validate = () => {
    const nextErrors = {};
    if (!form.email.trim()) nextErrors.email = 'Email or username is required';
    if (!form.password) nextErrors.password = 'Password is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setApiError('');

    if (!validate()) return;

    try {
      setSubmitting(true);
      await login({ email: form.email.trim(), password: form.password });
      navigate(from, { replace: true });
    } catch (error) {
      setApiError(error.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      {location.state?.from && <Alert severity="info">Please login to continue.</Alert>}
      <AuthForm
        mode="login"
        form={form}
        errors={errors}
        submitting={submitting}
        apiError={apiError}
        onChange={(event) => {
          const { name, value } = event.target;
          setForm((prev) => ({ ...prev, [name]: value }));
        }}
        onSubmit={onSubmit}
      />
    </Container>
  );
};

export default LoginPage;
