import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StadiumIcon from '@mui/icons-material/Stadium';
import { styled } from '@mui/material/styles';
import { CardProps } from '@mui/material';
import Partners from '../components/Partners';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

interface Club {
  name: string;
  // stadium: string;
  imageUrl: string;
  website?: string;
  primaryColor: string;
}

interface AllTimeClub {
  name: string;
  stadium: string;
  imageUrl: string;
  website?: string;
}

const clubs: Club[] = [
  {
    name: 'Arsenal',
    // stadium: 'Emirates Stadium',
    imageUrl: '/images/clubs/arsenal.png',
    website: 'https://www.arsenal.com',
    primaryColor: '#EF0107'
  },
  {
    name: 'Aston Villa',
    // stadium: 'Villa Park',
    imageUrl: '/images/clubs/aston-villa.png',
    website: 'https://www.avfc.co.uk',
    primaryColor: '#95BFE5'
  },
  {
    name: 'Bournemouth',
    // stadium: 'Vitality Stadium',
    imageUrl: '/images/clubs/bournemouth.png',
    website: 'https://www.afcb.co.uk',
    primaryColor: '#DA291C'
  },
  {
    name: 'Brentford',
    // stadium: 'Gtech Community Stadium',
    imageUrl: '/images/clubs/brentford.png',
    website: 'https://www.brentfordfc.com',
    primaryColor: '#142C54'
  },
  {
    name: 'Brighton & Hove Albion',
    // stadium: 'American Express Stadium',
    imageUrl: '/images/clubs/brighton.png',
    website: 'https://www.brightonandhovealbion.com',
    primaryColor: '#0057B8'
  },
  {
    name: 'Chelsea',
    // stadium: 'Stamford Bridge',
    imageUrl: '/images/clubs/chelsea.png',
    website: 'https://www.chelseafc.com',
    primaryColor: '#034694'
  },
  {
    name: 'Crystal Palace',
    // stadium: 'Selhurst Park',
    imageUrl: '/images/clubs/crystal-palace.png',
    website: 'https://www.cpfc.co.uk',
    primaryColor: '#1B458F'
  },
  {
    name: 'Everton',
    // stadium: 'Goodison Park',
    imageUrl: '/images/clubs/everton.png',
    website: 'https://www.evertonfc.com',
    primaryColor: '#003399'
  },
  {
    name: 'Fulham',
    // stadium: 'Craven Cottage',
    imageUrl: '/images/clubs/fulham.png',
    website: 'https://www.fulhamfc.com',
    primaryColor: '#000000'
  },
  {
    name: 'Ipswich Town',
    // stadium: 'Portman Road',
    imageUrl: '/images/clubs/ipswich.png',
    website: 'https://www.itfc.co.uk',
    primaryColor: '#E32017'
  },
  {
    name: 'Leicester City',
    // stadium: 'King Power Stadium',
    imageUrl: '/images/clubs/leicester.png',
    website: 'https://www.lcfc.com',
    primaryColor: '#003090'
  },
  {
    name: 'Liverpool',
    // stadium: 'Anfield',
    imageUrl: '/images/clubs/liverpool.png',
    website: 'https://www.liverpoolfc.com',
    primaryColor: '#C8102E'
  },
  {
    name: 'Manchester City',
    // stadium: 'Etihad Stadium',
    imageUrl: '/images/clubs/manchester-city.png',
    website: 'https://www.mancity.com',
    primaryColor: '#6CABDD'
  },
  {
    name: 'Manchester United',
    // stadium: 'Old Trafford',
    imageUrl: '/images/clubs/manchester-united.png',
    website: 'https://www.manutd.com',
    primaryColor: '#DA291C'
  },
  {
    name: 'Newcastle United',
    // stadium: 'St. James\' Park',
    imageUrl: '/images/clubs/newcastle.png',
    website: 'https://www.newcastleunited.com',
    primaryColor: '#241F40'
  },
  {
    name: 'Nottingham Forest',
    // stadium: 'The City Ground',
    imageUrl: '/images/clubs/nottingham-forest.png',
    website: 'https://www.nottinghamforest.co.uk',
    primaryColor: '#E32017'
  },
  {
    name: 'Southampton',
    // stadium: 'St. Mary\'s Stadium',
    imageUrl: '/images/clubs/southampton.png',
    website: 'https://www.southamptonfc.com',
    primaryColor: '#CC0000'
  },
  {
    name: 'Tottenham Hotspur',
    // stadium: 'Tottenham Hotspur Stadium',
    imageUrl: '/images/clubs/tottenham.png',
    website: 'https://www.tottenhamhotspur.com',
    primaryColor: '#132257'
  },
  {
    name: 'West Ham United',
    // stadium: 'London Stadium',
    imageUrl: '/images/clubs/west-ham.png',
    website: 'https://www.whufc.com',
    primaryColor: '#7A263A'
  },
  {
    name: 'Wolverhampton Wanderers',
    // stadium: 'Molineux Stadium',
    imageUrl: '/images/clubs/wolves.png',
    website: 'https://www.wolves.co.uk',
    primaryColor: '#FDB913'
  }
];

const allTimeClubs: AllTimeClub[] = [
  { 
    name: 'Arsenal', 
    stadium: 'Emirates Stadium', 
    imageUrl: '/images/clubs/arsenal.png', 
    website: 'https://www.arsenal.com' },
  { name: 'Aston Villa', 
    stadium: 'Villa Park', 
    imageUrl: '/images/clubs/aston-villa.png', 
    website: 'https://www.avfc.co.uk' },
  { name: 'Barnsley', 
    stadium: 'Oakwell', 
    imageUrl: '/images/clubs/barnsley.png', 
    website: 'https://www.barnsleyfc.co.uk' },
  { name: 'Birmingham City', 
    stadium: "St. Andrew's Trillion Trophy Stadium", 
    imageUrl: '/images/clubs/birmingham.png', 
    website: 'https://www.bcfc.com' },
  { name: 'Blackburn Rovers', 
    stadium: 'Ewood Park', 
    imageUrl: '/images/clubs/blackburn.png', 
    website: 'https://www.rovers.co.uk' },
  { name: 'Blackpool', 
    stadium: 'Bloomfield Road', 
    imageUrl: '/images/clubs/blackpool.png', 
    website: 'https://www.blackpoolfc.co.uk' },
  { name: 'Bolton Wanderers', 
    stadium: 'Toughsheet Community Stadium', 
    imageUrl: '/images/clubs/bolton.png', 
    website: 'https://www.bwfc.co.uk' },
  { name: 'Bournemouth', 
    stadium: 'Vitality Stadium', 
    imageUrl: '/images/clubs/bournemouth.png', 
    website: 'https://www.afcb.co.uk' },
  { name: 'Bradford City', 
    stadium: 'Valley Parade', 
    imageUrl: '/images/clubs/bradford.png', 
    website: 'https://www.bradfordcityafc.com' },
  { name: 'Brentford', 
    stadium: 'Gtech Community Stadium', 
    imageUrl: '/images/clubs/brentford.png', 
    website: 'https://www.brentfordfc.com' },
  { name: 'Brighton & Hove Albion', 
    stadium: 'American Express Stadium', 
    imageUrl: '/images/clubs/brighton.png', 
    website: 'https://www.brightonandhovealbion.com' },
  { name: 'Burnley', 
    stadium: 'Turf Moor', 
    imageUrl: '/images/clubs/burnley.png', 
    website: 'https://www.burnleyfootballclub.com' },
  { name: 'Cardiff City', 
    stadium: 'Cardiff City Stadium', 
    imageUrl: '/images/clubs/cardiff.png', 
    website: 'https://www.cardiffcityfc.co.uk' },
  { name: 'Charlton Athletic', 
    stadium: 'The Valley', 
    imageUrl: '/images/clubs/charlton.png', 
    website: 'https://www.charltonafc.com' },
  { name: 'Chelsea', 
    stadium: 'Stamford Bridge', 
    imageUrl: '/images/clubs/chelsea.png', 
    website: 'https://www.chelseafc.com' },
  { name: 'Coventry City', 
    stadium: 'Highfield Road', 
    imageUrl: '/images/clubs/coventry.png', 
    website: 'https://www.ccfc.co.uk' },
  { name: 'Crystal Palace', 
    stadium: 'Selhurst Park', 
    imageUrl: '/images/clubs/crystal-palace.png', 
    website: 'https://www.cpfc.co.uk' },
  { name: 'Derby County', 
    stadium: 'Pride Park Stadium', 
    imageUrl: '/images/clubs/derby.png', 
    website: 'https://www.dcfc.co.uk' },
  { name: 'Everton', 
    stadium: 'Goodison Park', 
    imageUrl: '/images/clubs/everton.png', 
    website: 'https://www.evertonfc.com' },
  { name: 'Fulham', 
    stadium: 'Craven Cottage', 
    imageUrl: '/images/clubs/fulham.png', 
    website: 'https://www.fulhamfc.com' },
  { name: 'Huddersfield Town', 
    stadium: "John Smith's Stadium", 
    imageUrl: '/images/clubs/huddersfield.png', 
    website: 'https://www.htafc.com' },
  { name: 'Hull City', 
    stadium: 'MKM Stadium', 
    imageUrl: '/images/clubs/hull.png', 
    website: 'https://www.wearehullcity.co.uk' },
  { name: 'Ipswich Town', 
    stadium: 'Portman Road', 
    imageUrl: '/images/clubs/ipswich.png', 
    website: 'https://www.itfc.co.uk' },
  { name: 'Leeds United', 
    stadium: 'Elland Road', 
    imageUrl: '/images/clubs/leeds.png', 
    website: 'https://www.leedsunited.com' },
  { name: 'Leicester City', 
    stadium: 'King Power Stadium', 
    imageUrl: '/images/clubs/leicester.png', 
    website: 'https://www.lcfc.com' },
  { name: 'Liverpool', 
    stadium: 'Anfield', 
    imageUrl: '/images/clubs/liverpool.png', 
    website: 'https://www.liverpoolfc.com' },
  { name: 'Luton Town', 
    stadium: 'Kenilworth Road', 
    imageUrl: '/images/clubs/luton.png', 
    website: 'https://www.lutontown.co.uk' },
  { name: 'Manchester City', 
    stadium: 'Etihad Stadium', 
    imageUrl: '/images/clubs/manchester-city.png', 
    website: 'https://www.mancity.com' },
  { name: 'Manchester United', 
    stadium: 'Old Trafford', 
    imageUrl: '/images/clubs/manchester-united.png', 
    website: 'https://www.manutd.com' },
  { name: 'Middlesbrough', 
    stadium: 'Riverside Stadium', 
    imageUrl: '/images/clubs/middlesbrough.png', 
    website: 'https://www.mfc.co.uk' },
  { name: 'Newcastle United', 
    stadium: "St. James's Park", 
    imageUrl: '/images/clubs/newcastle.png', 
    website: 'https://www.newcastleunited.com' },
  { name: 'Norwich City', 
    stadium: 'Carrow Road', 
    imageUrl: '/images/clubs/norwich.png', 
    website: 'https://www.canaries.co.uk' },
  { name: 'Nottingham Forest', 
    stadium: 'The City Ground', 
    imageUrl: '/images/clubs/nottingham-forest.png', 
    website: 'https://www.nottinghamforest.co.uk' },
  { name: 'Oldham Athletic', 
    stadium: 'Boundary Park', 
    imageUrl: '/images/clubs/oldham.png', 
    website: 'https://www.oldhamathletic.co.uk' },
  { name: 'Portsmouth', 
    stadium: 'Fratton Park', 
    imageUrl: '/images/clubs/portsmouth.png', 
    website: 'https://www.portsmouthfc.co.uk' },
  { name: 'Queens Park Rangers', 
    stadium: 'MATRADE Loftus Road Stadium', 
    imageUrl: '/images/clubs/qpr.png', 
    website: 'https://www.qpr.co.uk' },
  { name: 'Reading', 
    stadium: 'Madejski Stadium', 
    imageUrl: '/images/clubs/reading.png', 
    website: 'https://www.readingfc.co.uk' },
  { name: 'Sheffield United', 
    stadium: 'Bramall Lane', 
    imageUrl: '/images/clubs/sheffield-united.png', 
    website: 'https://www.sufc.co.uk' },
  { name: 'Sheffield Wednesday', 
    stadium: 'Hillsborough', 
    imageUrl: '/images/clubs/sheffield-wednesday.png', 
    website: 'https://www.swfc.co.uk' },
  { name: 'Southampton', 
    stadium: "St. Mary's Stadium", 
    imageUrl: '/images/clubs/southampton.png', 
    website: 'https://www.southamptonfc.com' },
  { name: 'Stoke City', 
    stadium: 'bet365 Stadium', 
    imageUrl: '/images/clubs/stoke.png', 
    website: 'https://www.stokecityfc.com' },
  { name: 'Sunderland', 
    stadium: 'Stadium of Light', 
    imageUrl: '/images/clubs/sunderland.png', 
    website: 'https://www.safc.com' },
  { name: 'Swansea City', 
    stadium: 'Liberty Stadium', 
    imageUrl: '/images/clubs/swansea.png', 
    website: 'https://www.swanseacity.com' },
  { name: 'Swindon Town', 
    stadium: 'County Ground', 
    imageUrl: '/images/clubs/swindon.png', 
    website: 'https://www.swindontownfc.co.uk' },
  { name: 'Tottenham Hotspur', 
    stadium: 'Tottenham Hotspur Stadium', 
    imageUrl: '/images/clubs/tottenham.png', 
    website: 'https://www.tottenhamhotspur.com' },
  { name: 'Watford', 
    stadium: 'Vicarage Road', 
    imageUrl: '/images/clubs/watford.png', 
    website: 'https://www.watfordfc.com' },
  { name: 'West Bromwich Albion', 
    stadium: 'The Hawthorns', 
    imageUrl: '/images/clubs/west-brom.png', 
    website: 'https://www.wba.co.uk' },
  { name: 'West Ham United', 
    stadium: 'London Stadium', 
    imageUrl: '/images/clubs/west-ham.png', 
    website: 'https://www.whufc.com' },
  { name: 'Wigan Athletic', 
    stadium: 'DW Stadium', 
    imageUrl: '/images/clubs/wigan.png', 
    website: 'https://www.wiganathletic.com' },
  { name: 'Wimbledon', 
    stadium: 'Selhurst Park', 
    imageUrl: '/images/clubs/wimbledon.png', 
    website: 'https://www.afcwimbledon.co.uk' },
  { name: 'Wolverhampton Wanderers', 
    stadium: 'Molineux Stadium', 
    imageUrl: '/images/clubs/wolves.png', 
    website: 'https://www.wolves.co.uk' },
];

interface StyledCardProps extends CardProps {
  hovercolor: string;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'hovercolor'
})<StyledCardProps>(({ theme, hovercolor }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    backgroundColor: hovercolor,
    '& .club-logo': {
      transform: 'scale(1.1)',
    },
    '& .club-info': {
      backgroundColor: 'transparent',
      color: '#fff',
      '& .club-name': {
        color: '#fff',
      }
    }
  }
}));

const ClubLogo = styled('div')(({ theme }) => ({
  height: 200,
  transition: 'transform 0.3s ease',
  padding: theme.spacing(2),
  backgroundColor: '#fff',
  '& img': {
    objectFit: 'contain',
    height: '100%',
    width: 'auto',
    margin: '0 auto',
  }
}));

const ClubInfo = styled(CardContent)(({ theme }) => ({
  transition: 'all 0.3s ease',
  backgroundColor: '#f7f7fa',
  padding: theme.spacing(2),
  textAlign: 'center',
  '& .club-name': {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: '#37003c',
    transition: 'color 0.3s ease',
  },
  '& .stadium-name': {
    color: '#666',
    fontSize: '0.875rem',
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#f7f7fa',
    '& .club-cell': {
      '& .club-name': {
        color: '#37003c',
      }
    },
    '& .visit-icon': {
      transform: 'translateX(5px)',
      color: '#37003c',
    }
  }
}));

const VisitIcon = styled(ArrowForwardIosIcon)(({ theme }) => ({
  transition: 'all 0.2s ease',
  color: '#666',
  fontSize: '1rem',
}));

const Clubs = () => {
  const [search, setSearch] = useState('');

  return (
    <Box sx={{ width: '100%', bgcolor: 'white', minHeight: '100vh' }}>
      {/* Header với gradient, chữ lớn và ô tìm kiếm */}
      <Box
        sx={{
          width: '100%',
          minHeight: 180,
          background: 'linear-gradient(120deg, #4fc3f7 0%, #7b5cff 100%)',
          display: 'flex',
          alignItems: 'center',
          px: { xs: 1, md: 3 },
          mb: 4,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: 'white',
            fontWeight: 900,
            fontSize: { xs: '2.5rem', md: '4rem' },
            lineHeight: 1.1,
            mr: 2,
          }}
        >
          Clubs
        </Typography>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'left' }}>
          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              width: { xs: '100%', md: 400 },
              boxShadow: 2,
              height: 48,
            }}
          >
            <input
              type="text"
              placeholder="Search Clubs"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: 18,
                padding: '0 16px',
                flex: 1,
                background: 'transparent',
                color: '#7b5cff',
                height: 48,
              }}
            />
            {/* <Box sx={{ height: 32, width: 1, bgcolor: '#e0e0e0', mx: 1 }} /> */}
            <SearchIcon sx={{ color: '#37003c', fontSize: 24, mr: 2, cursor: 'pointer' }} />
          </Box>
        </Box>
      </Box>
      <Container maxWidth={false} sx={{ maxWidth: 1440, py: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            mb: 4,
            textAlign: 'center',
            color: '#37003c'
          }}
        >
          Premier League Clubs
        </Typography>
        
        <Grid container spacing={3}>
          {clubs.map((club) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={club.name}>
              <StyledCard hovercolor={club.primaryColor}>
                <a href={club.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <ClubLogo className="club-logo">
                    <img src={club.imageUrl} alt={club.name} />
                  </ClubLogo>
                  <ClubInfo className="club-info">
                    <Typography variant="h6" component="div" className="club-name">
                      {club.name}
                    </Typography>
                    <Typography variant="body2" className="stadium-name" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      {/* <StadiumIcon sx={{ fontSize: 18, color: '#37003c', mr: 0.5 }} /> */}
                      {/* {club.stadium} */}
                    </Typography>
                  </ClubInfo>
                </a>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              mb: 4,
              color: '#37003c'
            }}
          >
            All-time Premier League Clubs
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4, boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: '#37003c' }}>Club</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: '#37003c' }}>Stadium</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: '#37003c' }} align="center">Visit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allTimeClubs.map((club) => (
                  <StyledTableRow key={club.name}>
                    <TableCell className="club-cell">
                      <a href={club.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box 
                            component="img" 
                            src={club.imageUrl} 
                            alt={club.name} 
                            sx={{ 
                              width: 28, 
                              height: 28, 
                              mr: 1, 
                              borderRadius: '50%', 
                              border: '1px solid #eee', 
                              background: '#fff',
                              transition: 'transform 0.2s ease',
                              '&:hover': {
                                transform: 'scale(1.1)'
                              }
                            }} 
                          />
                          <Typography variant="body1" sx={{ fontWeight: 500, transition: 'color 0.2s ease' }} className="club-name">
                            {club.name}
                          </Typography>
                        </Box>
                      </a>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StadiumIcon sx={{ fontSize: 18, color: '#37003c', mr: 0.5 }} />
                        {club.stadium}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <a href={club.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <VisitIcon className="visit-icon" />
                      </a>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Partners />
      </Container>
    </Box>
  );
};

export default Clubs; 