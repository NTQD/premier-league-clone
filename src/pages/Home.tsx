import { Box, Container, Grid, Typography, Card, CardContent, CardMedia, Button, Tabs, Tab } from '@mui/material';
import HomeHero from '../components/home/HomeHero';
import Partners from '../components/Partners';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <HomeHero />
      
      {/* Fixtures Section */}
      <Container maxWidth={false} sx={{ maxWidth: 1440, py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Upcoming Fixtures
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              All times shown are your local time
            </Typography>
            <Button variant="outlined" color="primary">
              View All Fixtures
            </Button>
          </Box>
        </Box>
        
        {/* Fixture Cards */}
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((fixture) => (
            <Grid item xs={12} sm={6} md={3} key={fixture}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Saturday 20 Apr
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      15:00
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box 
                        component="img" 
                        src={`https://resources.premierleague.com/premierleague/badges/t${fixture * 2}.png`}
                        alt="Team logo"
                        sx={{ width: 30, height: 30 }}
                      />
                      <Typography variant="body2" fontWeight={500}>
                        Team {fixture * 2}
                      </Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={700} sx={{ width: 20, textAlign: 'center' }}>
                      vs
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'row-reverse' }}>
                      <Box 
                        component="img" 
                        src={`https://resources.premierleague.com/premierleague/badges/t${fixture * 2 + 1}.png`}
                        alt="Team logo"
                        sx={{ width: 30, height: 30 }}
                      />
                      <Typography variant="body2" fontWeight={500}>
                        Team {fixture * 2 + 1}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Latest News Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Latest News
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Get the latest Premier League news
              </Typography>
              <Button variant="outlined" color="primary">
                More News
              </Button>
            </Box>
          </Box>
          
          {/* News Cards */}
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((news) => (
              <Grid item xs={12} sm={6} md={4} key={news}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://placehold.co/800x400/37003c/white?text=News+${news}`}
                    alt={`News ${news}`}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="subtitle1" component="div" fontWeight={600}>
                      News headline goes here for article {news}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Feature Section */}
      <Container maxWidth={false} sx={{ maxWidth: 1440, py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Featured Content
              </Typography>
            </Box>
            
            <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                height="400"
                image="https://placehold.co/1200x800/37003c/white?text=Featured+Content"
                alt="Featured Content"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" fontWeight={600}>
                  Premier League Insights: Key talking points
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Experts discuss the latest trends, player performances, and predictions for the upcoming matches in the Premier League.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                League Table
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Live League Table
              </Typography>
            </Box>
            
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Premier League
              </Typography>
              
              {/* Table Header */}
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: '50px 1fr 50px 50px 50px 50px',
                mb: 1, 
                borderBottom: '1px solid rgba(0,0,0,0.1)', 
                pb: 1,
                color: 'text.secondary',
                fontSize: '0.75rem'
              }}>
                <Box>Pos</Box>
                <Box>Club</Box>
                <Box sx={{ textAlign: 'center' }}>Pl</Box>
                <Box sx={{ textAlign: 'center' }}>GD</Box>
                <Box sx={{ textAlign: 'center' }}>Pts</Box>
              </Box>
              
              {/* Table Rows */}
              {[
                { pos: 1, club: 'Liverpool', played: 33, gd: 44, pts: 79 },
                { pos: 2, club: 'Arsenal', played: 34, gd: 34, pts: 67 },
                { pos: 3, club: 'Man City', played: 34, gd: 23, pts: 61 },
                { pos: 4, club: "Nott'm Forest", played: 33, gd: 14, pts: 60 },
                { pos: 5, club: 'Newcastle', played: 33, gd: 18, pts: 59 },
              ].map((team) => (
                <Box key={team.pos} sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '50px 1fr 50px 50px 50px 50px',
                  py: 1,
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  alignItems: 'center',
                  fontSize: '0.875rem'
                }}>
                  <Box fontWeight={600}>{team.pos}</Box>
                  <Box fontWeight={500}>{team.club}</Box>
                  <Box sx={{ textAlign: 'center' }}>{team.played}</Box>
                  <Box sx={{ textAlign: 'center' }}>{team.gd}</Box>
                  <Box sx={{ textAlign: 'center', fontWeight: 600 }}>{team.pts}</Box>
                </Box>
              ))}
              
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button variant="text" color="primary" size="small">
                  Full Table
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Partners />
    </Box>
  );
};

export default Home; 