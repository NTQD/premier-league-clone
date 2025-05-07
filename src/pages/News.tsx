import { Box, Container, Typography } from '@mui/material';

const News = () => {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1440, py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        News
      </Typography>
      <Typography variant="body1">
        News content will be displayed here.
      </Typography>
    </Container>
  );
};

export default News; 