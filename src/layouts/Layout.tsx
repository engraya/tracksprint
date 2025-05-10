import { Box, Container } from '@mui/material';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <Box display="flex" flexDirection="column" minHeight="100vh">
    <Navbar />
    <Container component="main" sx={{ flex: 1 }}>
      <Outlet />
    </Container>
    <Footer />
  </Box>
);

export default Layout;
