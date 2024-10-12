import React from 'react';
import { Box, Grid } from '@mui/material';
import { useThemeContext } from '../Reuse/ThemeProvider';
import { TypographyText } from '../Reuse/Reuse';

const Themes = () => {
  const { toggleTheme } = useThemeContext();

  const themes = [
    { name: 'Default', color: '#FFFFFF', mode: 'light' },
    { name: 'Dark', color: '#424242', mode: 'dark' },

  ];

  const handleThemeChange = (mode) => {
    toggleTheme(mode);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TypographyText
            Typography={"Themes"}
            fontSize="1.5rem"
            fontWeight="600"
          />
        </Grid>
        {themes.map((theme, index) => (
          <Grid item xs={3} lg={1} md={1} sm={2} key={index}>
            <Box
              onClick={() => handleThemeChange(theme.mode)}
              sx={{
                width: '100%',
                height: '50px',
                border: '.5px solid',
                backgroundColor: theme.color,
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '0 10px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)', // Correct hover syntax
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Themes;
