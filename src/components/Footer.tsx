import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box component="footer" sx={{ py: 2, textAlign: 'center', backgroundColor: '#f1f1f1' }}>
    <Typography variant="body2" color="textSecondary">
      &copy; {new Date().getFullYear()} TrackSprint. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
