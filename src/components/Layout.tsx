import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomAppBar from './CustomAppBar';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Login', path: '/login' },
  { label: 'Signup', path: '/signup' },
  { label: 'Forgot Password', path: '/forgot-password' },
  { label: 'Caregivers', path: '/caregivers' },
  { label: 'Caregiver Dashboard', path: '/caregiver-dashboard' },
  { label: 'Client Dashboard', path: '/client-dashboard' },
  { label: 'Jobs', path: '/jobs' },
  { label: 'Post Job', path: '/post-job' },
  { label: 'Messages', path: '/messages' },
  { label: 'Payments', path: '/payments' },
  { label: 'Profile', path: '/profile' },
  { label: 'Edit Profile', path: '/edit-profile' },
];

const Layout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CareConnect NL
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ textTransform: 'none' }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
