import { useState } from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!form.username.trim()) nextErrors.username = 'Username is required';

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Enter a valid email';
    }

    if (!form.password) {
      nextErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      nextErrors.password = 'Minimum 6 characters';
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password';
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setApiError('');

    if (!validate()) return;

    try {
      setSubmitting(true);
      await signup({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password
      });
      navigate('/feed', { replace: true });
    } catch (error) {
      setApiError(error.response?.data?.message || 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <AuthForm
        mode="signup"
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

export default SignupPage;
