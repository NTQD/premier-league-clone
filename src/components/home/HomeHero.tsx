import { Chip, Box, Container, Grid, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
const featured = {
  image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/12/ecfa828d-1c41-436e-b9ba-7627d4e77cbb/1-NEW-WWL-MW36-LEAD.jpg?width=764&height=430',
  tag: 'Feature',
  title: 'Premier League weekend review: What we learned',
  desc: "Alex Keble on the key takeaways, including Villa's important victory and Arsenal's Anfield comeback",
  link: '/news/4308862',
};
const HomeHero = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.light',
        pt: { xs: 4, md: 6 },
        pb: { xs: 6, md: 8 },
        backgroundImage: 'linear-gradient(to right, #37003c, #520060)',
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
        <Grid container spacing={6} alignItems="stretch">
          {/* Hero Text */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2.25rem', md: '3rem' },
                background: 'linear-gradient(90deg, #ff0080, #7928ca)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
              }}
            >
              Welcome to the Premier League
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                mb: 4,
                opacity: 0.9,
                fontWeight: 400,
                lineHeight: 1.5
              }}
            >
              The most competitive league in the world with the best players and passionate fans
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                to="/fixtures"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: '4px',
                }}
              >
                View Fixtures
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/tables"
                sx={{
                  px: 4,
                  py: 1.5,
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  },
                  fontWeight: 600,
                  borderRadius: '4px',
                }}
              >
                League Table
              </Button>
            </Box>
          </Grid>
          {/* Featured Content */}
          {/* Ô lớn bên trái */}
          <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                height: '100%',
                bgcolor: 'transparent',
                boxShadow: 'none',
              }}
            >
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block', borderRadius: 16, overflow: 'hidden' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 250, md: 350 },
                    width: '100%',
                    background: `url(${featured.image}) center/cover no-repeat`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  {/* Tag */}
                  <Chip
                    label={featured.tag}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      bgcolor: '#00e396',
                      color: '#111',
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  />
                  {/* Overlay + Title */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '100%',
                      bgcolor: 'rgba(44,0,60,0.85)',
                      p: 3,
                      pt: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#fff',
                        fontWeight: 900,
                        mb: 1,
                        textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {featured.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#fff',
                        opacity: 0.85,
                        fontWeight: 400,
                        textShadow: '0 1px 4px rgba(0,0,0,0.2)',
                      }}
                    >
                      {featured.desc}
                    </Typography>
                  </Box>
                </Box>
              </a>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeHero; 