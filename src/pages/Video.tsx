import { Box, Container, Typography } from '@mui/material';

const Video = () => {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1440, py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Videos
      </Typography>
      <Typography variant="body1">
        Video content will be displayed here.
      </Typography>
    </Container>
  );
};

export default Video; 