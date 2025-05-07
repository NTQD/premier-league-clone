import { Box, Container, Typography } from '@mui/material';

const Clubs = () => {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1440, py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Clubs
      </Typography>
      <Typography variant="body1">
        Clubs content will be displayed here.
      </Typography>
    </Container>
  );
};

export default Clubs; 