import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#37003c', // Premier League purple
      light: '#520060',
      dark: '#26002a',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff2882', // Premier League pink
      light: '#ff5ca1',
      dark: '#c90062',
      contrastText: '#fff',
    },
    success: {
      main: '#00ff85', // Premier League turquoise
      light: '#66ffa6',
      dark: '#00c967',
    },
    background: {
      default: '#f7f7f7',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600, 
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

export default theme; 