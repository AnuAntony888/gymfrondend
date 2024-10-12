import React from "react";
import { TypographyText } from "../Reuse/Reuse";
import { Box, Grid, Paper } from "@mui/material";

const Dashboard = () => (
  <Box >
    <TypographyText
      Typography={"Dashboard"}
      fontSize="2rem"
      fontWeight="600"
    
    />
    {/* Add more dashboard content here */}
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {/* Gym Image */}
      <Grid item xs={12} md={6} lg={3}>
        
          <img
            src={'https://img.freepik.com/premium-photo/handsome-young-man-spreads-his-arms-with-dumbbells-sides-shoulder-pumping-fitness-bodybuilding-concept_392761-1776.jpg?w=996'}
            alt="Gym Dashboard"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
    
      </Grid>

      {/* Dashboard Content */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <TypographyText
            Typography={"Welcome to Your Gym Dashboard"}
            fontSize="1.5rem"
            fontWeight="500"
          />
          <TypographyText
            Typography={"Track your workouts, manage your schedules, and stay motivated!"}
            fontSize="1rem"
            fontWeight="400"
            sx={{ mt: 1 }}
          />
          <TypographyText
            Typography={"Key Metrics:"}
            fontSize="1rem"
            fontWeight="500"
            sx={{ mt: 2 }}
          />
          <ul>
            <li><TypographyText Typography={"Total Members: 150"} fontSize="1rem" /></li>
            <li><TypographyText Typography={"Active Sessions: 45"} fontSize="1rem" /></li>
            <li><TypographyText Typography={"Upcoming Classes: 10"} fontSize="1rem" /></li>
          </ul>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default Dashboard;
