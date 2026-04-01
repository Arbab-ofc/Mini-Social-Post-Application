import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1769E0',
      light: '#4D8EF3',
      dark: '#0D47A1'
    },
    background: {
      default: '#EEF3FB',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#14233C'
    }
  },
  shape: {
    borderRadius: 18
  },
  typography: {
    fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h4: {
      fontWeight: 700
    },
    h6: {
      fontWeight: 700
    },
    subtitle1: {
      fontWeight: 600
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: '1px solid #DFE9FB',
          boxShadow: '0 12px 30px rgba(16, 77, 177, 0.08)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true
      }
    }
  }
});

export default theme;
