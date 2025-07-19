import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userId') !== null;
  const role = localStorage.getItem('role'); 
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/');
  };

  const navItems = [    
    { label: 'Jobs', path: '/jobs' },
    
  ];

  if (!isLoggedIn) {
    navItems.push({ label: 'Login', path: '/login' });
    navItems.push({ label: 'Signup', path: '/signup' });
    navItems.push({ label: 'Home', path: '/' });
  } else {
    if (role === 'CLIENT') {
      navItems.push({ label: 'Client Dashboard', path: `/client-dashboard/${userId}` });
      navItems.push({ label: 'Post Job', path: '/post-job' });
      navItems.push({ label: 'Caregivers', path: '/caregivers' });
    } else {
      navItems.push({ label: 'Caregiver Dashboard', path: `/caregiver-dashboard/${userId}` });
      navItems.push({ label: 'Clients', path: '/clients' });
    }
  }

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
            {isLoggedIn && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
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
