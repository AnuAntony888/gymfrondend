import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Avatar, Typography } from "@mui/material"; // Importing Typography from MUI
// import { navItems } from "./navItems"; // Make sure navItems is correctly imported

const Header = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppBar
      sx={{
        backgroundColor: theme.palette.background.paper, // Use theme background
        width: "100%",
        justifyContent: "space-between",
        height: "64px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {matches ? (
          <>
            <Typography
              color={theme.palette.text.primary} // Use theme text color
              fontSize="1.5rem"
              fontWeight="600"
            >
              {/* Logo */}
            </Typography>
            <Box>
              {/* {navItems.map((item, index) => (
                <Button
                  key={index}
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => handleScrollToSection(item.sectionId)}
                >
                  {item.label}
                </Button>
              ))} */}
              <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
            </Box>
          </>
        ) : (<>
          <Typography
            color={theme.palette.text.primary} // Use theme text color
            fontSize="1.5rem"
            fontWeight="600"
          >
            {/* Logo */}
            </Typography>
               <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
               </>)}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
