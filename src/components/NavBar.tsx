import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logoutUser } from '../store/reducers/auth';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';  
import ErrorBoundary from './ErrorBoundary';


  const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  
    const toggleDrawer = (open: boolean) => () => {
      setDrawerOpen(open);
    };

    const handleLogout = async () => {
      await supabase.auth.signOut();
      dispatch(logoutUser());
      navigate('/login'); 
    };
  
    const isActive = (path: string) => location.pathname === path;

    const pages = currentUser
    ? [
        { name: 'Home', path: '/' },
        { name: 'Sprints', path: '/sprints' },
        { name: 'Tasks', path: '/tasks' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
      ];
  
  
    return (
      <>
        <AppBar 
        position="static"
        sx={{
          backgroundColor: '#1e293b',
        }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="24"
              height="24"
              style={{ marginRight: 8 }}
            >
              <g>
                <path
                  fill="#2b6578"
                  d="M278.069,414.897c0-53.628,43.476-97.103,97.103-97.103c6.038,0,11.926,0.627,17.655,1.677V52.966 H286.897v52.966H145.655V52.966H39.724v441.379h279.72C294.453,476.778,278.069,447.77,278.069,414.897z"
                />
                <path
                  fill="#d9e3ec"
                  d="M278.069,414.897c0-47.59,34.26-87.111,79.448-95.426V88.276h-70.621v17.655H145.655V88.276H75.034v370.759H288.75 C281.971,445.784,278.069,430.804,278.069,414.897z"
                />
                <path
                  fill="#206f42"
                  d="M472.276,414.897c0-53.628-43.476-97.103-97.103-97.103s-97.103,43.476-97.103,97.103 S321.545,512,375.172,512S472.276,468.524,472.276,414.897z"
                />
                <path
                  fill="#BDC3C7"
                  d="M251.586,35.31c0-19.5-15.81-35.31-35.31-35.31s-35.31,15.81-35.31,35.31h-35.31v70.621h141.241V35.31H251.586z"
                />
              </g>
            </svg>
            TrackSprint
          </Typography>
  
            {/* Desktop nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.path}
                  sx={{
                    color: isActive(page.path) ? '#90caf9' : 'white',
                    borderBottom: isActive(page.path) ? '2px solid #90caf9' : 'none',
                    borderRadius: 0,
                    textTransform: 'none',
                  }}
                >
                  {page.name}
                </Button>
              ))}
              {currentUser && (
              <Button variant="contained" color="error" sx={{
                color: 'white',
                textTransform: 'none',
              }}  onClick={handleLogout}>
                Logout
            </Button>
  
            )}
            <ErrorBoundary>
              <UserAvatar currentUser={currentUser} />
            </ErrorBoundary>
            </Box>
  
            {/* Mobile menu icon */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
  
        {/* Mobile drawer */}
        <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 220 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
              {pages.map((page) => (
                <ListItemButton
                  key={page.name}
                  component={Link}
                  to={page.path}
                  selected={isActive(page.path)}
                >
                  <ListItemText primary={page.name} />
                </ListItemButton>
              ))}
              {currentUser && (
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              )}
            <ErrorBoundary>
              <UserAvatar currentUser={currentUser} />
            </ErrorBoundary>
            </List>
          </Box>
        </Drawer>
      </>
    );
  };
  
  export default Navbar;
  