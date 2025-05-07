import { Box, Container, Typography } from '@mui/material';

const Players = () => {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1440, py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Players
      </Typography>
      <Typography variant="body1">
        Players content will be displayed here.
      </Typography>
    </Container>
  );
};

export default Players; 