import { Box, Container, Typography } from '@mui/material';

const Fixtures = () => {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1440, py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Fixtures
      </Typography>
      <Typography variant="body1">
        Fixtures content will be displayed here.
      </Typography>
    </Container>
  );
};

export default Fixtures; 