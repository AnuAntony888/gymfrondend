import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ThemeIcon from "@mui/icons-material/Palette";
import Dashboard from "./Dashboard";
import Themes from "./Themes";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import { useThemeContext } from '../Reuse/ThemeProvider';
import { Toastsucess } from "../Reuse/Reuse";
import { useAuthContext } from "../Context/AuthContext";
import { useLogout } from "../API/UserAPI";
import { Users } from "./Users";

const AdminPanel = () => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobile);
  const { getuserdata } = useAuthContext();
  const [activeSection, setActiveSection] = useState("Dashboard");

  const { logout } = useLogout(getuserdata);

  const handleLogout = async () => {
    try {
      const params = {};
      const response = logout({ params, getuserdata }).catch((err) => {
        console.error("Failed to logout:", err.message);
      });
      Toastsucess(response.message, "sucess", "light");
    } catch (error) {
      Toastsucess(`${error.response?.data || error.message}.`);
    }
  };

  useEffect(() => {
    setIsSidebarCollapsed(isMobile);
  }, [isMobile]);

  const sidebarItems = [
    { label: "Dashboard", icon: <DashboardIcon />, content: <Dashboard /> },
    { label: "Add Member", icon: <PeopleIcon />, content: <Users /> },
    { label: "Themes", icon: <ThemeIcon />, content: <Themes /> },
    {
      label: "Logout",
      icon: <LogoutIcon />,
      content: (
        <Button
          onClick={handleLogout}
          sx={{
            display: "flex",
            alignItems: "center",
            textTransform: "capitalize",
          }}
        >
          Logout
        </Button>
      ),
    },
  ];

  const renderContent = () => {
    const activeItem = sidebarItems.find((item) => item.label === activeSection);
    return activeItem ? activeItem.content : null;
  };

  return (
    <Box display="flex">
      <Drawer
        variant="permanent"
        sx={{
          width: isSidebarCollapsed ? 60 : 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSidebarCollapsed ? 60 : 240,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                if (item.label === "Logout") {
                  handleLogout();
                } else {
                  setActiveSection(item.label);
                }
              }}
              sx={{ cursor: "pointer" }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {!isSidebarCollapsed && <ListItemText primary={item.label} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, paddingTop: "100px" }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AdminPanel;
