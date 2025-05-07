import { Box, Container, Grid, Typography, Button, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
        <Grid container spacing={6}>
          {/* Hero Text */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography 
              variant="h2" 
              sx={{ 
                color: 'white', 
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2.25rem', md: '3rem' } 
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
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={6}
              sx={{ 
                borderRadius: '8px',
                overflow: 'hidden',
                height: '100%',
                minHeight: 400
              }}
            >
              {/* This would be a slider or featured video in the real site */}
              <Box 
                sx={{ 
                  bgcolor: '#111',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    position: 'absolute'
                  }}
                >
                  Featured Video Content
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Quick Links */}
        <Box sx={{ mt: 6 }}>
          <Grid container spacing={3}>
            {['Latest News', 'Match Highlights', 'Player Interviews', 'Fantasy Premier League'].map((item, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    p: 2,
                    borderRadius: '4px',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.15)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    {item}
                    <ArrowForwardIcon sx={{ fontSize: '1rem' }} />
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeHero; 