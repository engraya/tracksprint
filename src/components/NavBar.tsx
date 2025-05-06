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
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              TrackSprint
            </Typography>
  
            {/* Desktop nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
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
              <Button
                onClick={handleLogout}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                }}
              >
                Logout
              </Button>
  
            )}
             <UserAvatar  currentUser={currentUser}/>
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
            <UserAvatar  currentUser={currentUser}/>
            </List>
          </Box>
        </Drawer>
      </>
    );
  };
  
  export default Navbar;
  