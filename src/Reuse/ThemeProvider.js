import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = (theme) => {
    setMode(theme);
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#FFFFFF',
              paper: '#F5F5F5',
            },
            text: {
              primary: '#000000',
              secondary: '#757575',
            },
            button: {
              main: '#FEB602',
            },
          }
        : mode === 'dark'
        ? {
            background: {
              default: '#121212',
            },
            text: {
              primary: '#FFFFFF',
            },
            button: {
              main: '#FEB602',
            },
          }
        : mode === 'custom'
        ? {
            background: {
              default: '#FFC0CB', // Custom pink background
              paper: '#FFB6C1',
            },
            text: {
              primary: '#0000FF', // Blue text for custom theme
            },
          }
        : {
            // Fallback in case an unsupported mode is passed
            background: {
              default: '#FFFFFF',
              paper: '#F5F5F5',
            },
            text: {
              primary: '#000000',
            },
          }),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'custom' ? '#FFC0CB' : undefined, // Apply button styles if needed
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
