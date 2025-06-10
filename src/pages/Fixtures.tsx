import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Avatar, Divider, Button, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Partners from '../components/Partners';
import StadiumIcon from '@mui/icons-material/Stadium';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

// Mock data types
interface Team {
  name: string;
  logo: string;
}
interface Match {
  home: Team;
  away: Team;
  time: string;
  stadium: string;
}
interface Day {
  date: string;
  matches: Match[];
}

// Fixture data (updated to match the image)
const fixturesData: Day[] = [
  {
    date: 'Saturday 17 May 2025',
    matches: [
      {
        home: { name: 'Aston Villa', logo: '/images/clubs/aston-villa.png' },
        away: { name: 'Spurs', logo: '/images/clubs/tottenham.png' },
        time: '01:30',
        stadium: 'Villa Park, Birmingham',
      },
      {
        home: { name: 'Chelsea', logo: '/images/clubs/chelsea.png' },
        away: { name: 'Man Utd', logo: '/images/clubs/manchester-united.png' },
        time: '02:15',
        stadium: 'Stamford Bridge, London',
      },
    ],
  },
  {
    date: 'Sunday 18 May 2025',
    matches: [
      {
        home: { name: 'Everton', logo: '/images/clubs/everton.png' },
        away: { name: 'Southampton', logo: '/images/clubs/southampton.png' },
        time: '18:00',
        stadium: 'Goodison Park, Liverpool',
      },
      {
        home: { name: 'West Ham', logo: '/images/clubs/west-ham.png' },
        away: { name: "Nott'm Forest", logo: '/images/clubs/nottingham-forest.png' },
        time: '20:15',
        stadium: 'London Stadium, London',
      },
      {
        home: { name: 'Brentford', logo: '/images/clubs/brentford.png' },
        away: { name: 'Fulham', logo: '/images/clubs/fulham.png' },
        time: '21:00',
        stadium: 'Gtech Community Stadium, Brentford',
      },
      {
        home: { name: 'Leicester', logo: '/images/clubs/leicester.png' },
        away: { name: 'Ipswich', logo: '/images/clubs/ipswich.png' },
        time: '21:00',
        stadium: 'King Power Stadium, Leicester',
      },
      {
        home: { name: 'Arsenal', logo: '/images/clubs/arsenal.png' },
        away: { name: 'Newcastle', logo: '/images/clubs/newcastle.png' },
        time: '22:30',
        stadium: 'Emirates Stadium, London',
      },
    ],
  },
  {
    date: 'Tuesday 20 May 2025',
    matches: [
      {
        home: { name: 'Brighton', logo: '/images/clubs/brighton.png' },
        away: { name: 'Liverpool', logo: '/images/clubs/liverpool.png' },
        time: '02:00',
        stadium: 'American Express Stadium, Falmer',
      },
    ],
  },
  {
    date: 'Wednesday 21 May 2025',
    matches: [
      {
        home: { name: 'Crystal Palace', logo: '/images/clubs/crystal-palace.png' },
        away: { name: 'Wolves', logo: '/images/clubs/wolves.png' },
        time: '02:00',
        stadium: 'Selhurst Park, London',
      },
      {
        home: { name: 'Man City', logo: '/images/clubs/manchester-city.png' },
        away: { name: 'Bournemouth', logo: '/images/clubs/bournemouth.png' },
        time: '02:00',
        stadium: 'Etihad Stadium, Manchester',
      },
    ],
  },
  {
    date: 'Sunday 25 May 2025',
    matches: [
      {
        home: { name: 'Bournemouth', logo: '/images/clubs/bournemouth.png' },
        away: { name: 'Leicester', logo: '/images/clubs/leicester.png' },
        time: '22:00',
        stadium: 'Vitality Stadium, Bournemouth',
      },
      {
        home: { name: 'Fulham', logo: '/images/clubs/fulham.png' },
        away: { name: 'Man City', logo: '/images/clubs/manchester-city.png' },
        time: '22:00',
        stadium: 'Craven Cottage, London',
      },
      {
        home: { name: 'Ipswich', logo: '/images/clubs/ipswich.png' },
        away: { name: 'West Ham', logo: '/images/clubs/west-ham.png' },
        time: '22:00',
        stadium: 'Portman Road, Ipswich',
      },
      {
        home: { name: 'Liverpool', logo: '/images/clubs/liverpool.png' },
        away: { name: 'Crystal Palace', logo: '/images/clubs/crystal-palace.png' },
        time: '22:00',
        stadium: 'Anfield, Liverpool',
      },
      {
        home: { name: 'Man Utd', logo: '/images/clubs/manchester-united.png' },
        away: { name: 'Aston Villa', logo: '/images/clubs/aston-villa.png' },
        time: '22:00',
        stadium: 'Old Trafford, Manchester',
      },
      {
        home: { name: 'Newcastle', logo: '/images/clubs/newcastle.png' },
        away: { name: 'Everton', logo: '/images/clubs/everton.png' },
        time: '22:00',
        stadium: "St. James' Park, Newcastle",
      },
      {
        home: { name: "Nott'm Forest", logo: '/images/clubs/nottingham-forest.png' },
        away: { name: 'Chelsea', logo: '/images/clubs/chelsea.png' },
        time: '22:00',
        stadium: 'The City Ground, Nottingham',
      },
      {
        home: { name: 'Southampton', logo: '/images/clubs/southampton.png' },
        away: { name: 'Arsenal', logo: '/images/clubs/arsenal.png' },
        time: '22:00',
        stadium: "St. Mary's Stadium, Southampton",
      },
      {
        home: { name: 'Spurs', logo: '/images/clubs/tottenham.png' },
        away: { name: 'Brighton', logo: '/images/clubs/brighton.png' },
        time: '22:00',
        stadium: 'Tottenham Hotspur Stadium, London',
      },
      {
        home: { name: 'Wolves', logo: '/images/clubs/wolves.png' },
        away: { name: 'Brentford', logo: '/images/clubs/brentford.png' },
        time: '22:00',
        stadium: 'Molineux Stadium, Wolverhampton',
      },
    ],
  },
];

const MatchDetail = (match: Match) => ({
  standings: [
    { pos: 11, club: match.home.name, logo: match.home.logo, pl: 36, gd: '+1', pts: 51 },
    { pos: 13, club: match.away.name, logo: match.away.logo, pl: 36, gd: '-5', pts: 42 },
  ],
  previousMeetings: [
    { date: 'Saturday 10 May 2025', home: match.home, away: match.away, score: '1 - 3' },
    { date: 'Saturday 26 October 2024', home: match.away, away: match.home, score: '1 - 1' },
  ],
  homeRecent: [
    { date: 'Saturday 10 May 2025', home: match.home, away: match.away, score: '1 - 3' },
    { date: 'Saturday 3 May 2025', home: { name: 'AVL', logo: '/images/clubs/aston-villa.png' }, away: match.home, score: '1 - 0' },
    { date: 'Saturday 26 April 2025', home: { name: 'SOU', logo: '/images/clubs/southampton.png' }, away: match.home, score: '1 - 2' },
  ],
  awayRecent: [
    { date: 'Saturday 10 May 2025', home: match.home, away: match.away, score: '1 - 3' },
    { date: 'Saturday 3 May 2025', home: match.away, away: { name: 'IPS', logo: '/images/clubs/ipswich.png' }, score: '2 - 2' },
    { date: 'Saturday 26 April 2025', home: { name: 'CHE', logo: '/images/clubs/chelsea.png' }, away: match.away, score: '1 - 0' },
  ],
});

const premierLeagueLogo = 'https://resources.premierleague.com/premierleague/competitions/competition_1.png';

const Fixtures = () => {
  const [open, setOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const handleOpen = (match: Match) => {
    setSelectedMatch(match);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMatch(null);
  };

  const matchDetail = selectedMatch ? MatchDetail(selectedMatch) : null;

  return (
    <Box>
      {/* Header with gradient and title */}
      <Box
        sx={{
          width: '100%',
          height: 160,
          background: 'linear-gradient(90deg, #1E90FF, #8A2BE2)',
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, md: 8 },
          mb: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: 'white',
            fontWeight: 900,
            fontSize: { xs: '2.8rem', md: '4.5rem' },
            lineHeight: 1.1,
          }}
        >
          Fixtures
        </Typography>
      </Box>

      {/* Filter Section */}
      <Container maxWidth={false} sx={{ maxWidth: 1440, px: { xs: 2, md: 8 }, py: 2, bgcolor: '#fff' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Filter by Competition
            </Typography>
            <select style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option>Premier League</option>
            </select>
            <Typography variant="body2" color="textSecondary">
              Filter by Club
            </Typography>
            <select style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option>All Clubs</option>
            </select>
            <Button variant="outlined" size="small" onClick={() => {}}>
              Reset Filters
            </Button>
          </Box>
          <Button variant="outlined" size="small" startIcon={<SportsSoccerIcon />}>
            Add fixtures to calendar
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            my: 2,
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 1.2,
              borderRadius: 3,
              bgcolor: '#7b5cff',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              textAlign: 'center',
              transition: 'all 0.2s',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: '#fff',
                color: '#7b5cff',
                border: '1.5px solid #7b5cff',
              },
            }}
          >
            Possible Premier League fixture changes in 2024/25 →
          </Box>
        </Box>
      </Container>

      {/* Match List */}
      <Container maxWidth={false} sx={{ maxWidth: 1440, px: { xs: 2, md: 8 }, py: 4 }}>
        {fixturesData.map((day, idx) => (
          <Box key={day.date} mb={4}>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Grid item>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2d014d', fontSize: '1.5rem' }}>
              {day.date}
            </Typography>
                    </Grid>
              <Grid item display="flex" alignItems="center">
                <img src={premierLeagueLogo} alt="Premier League" style={{ height: 32, marginRight: 8 }} />
                <Typography variant="h5" sx={{ fontWeight: 900, color: '#2d014d' }}>
                  {/* Premier League */}
                </Typography>
                    </Grid>
                    </Grid>
            <Divider sx={{ mb: 1 }} />
            {day.matches.map((match, i) => (
              <Box
                key={i}
                sx={{
                  py: 2,
                  borderBottom: '1px solid #e0e0e0',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #4fc3f7 0%, #7b5cff 100%)',
                  },
                }}
              >
                {/* Đội chủ nhà */}
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: 0 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, color: '#2d014d', pr: 1, textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {match.home.name}
                  </Typography>
                  <Avatar src={match.home.logo} alt={match.home.name} sx={{ width: 28, height: 28, ml: 1 }} />
                </Box>
                {/* Giờ thi đấu */}
                <Box
                  sx={{
                    width: 70,
                    minWidth: 70,
                    maxWidth: 70,
                    mx: 2,
                    bgcolor: '#f5f2fa',
                    borderRadius: 2,
                    textAlign: 'center',
                    fontWeight: 700,
                    color: '#2d014d',
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 36,
                  }}
                >
                  {match.time}
                </Box>
                {/* Đội khách */}
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', minWidth: 0 }}>
                  <Avatar src={match.away.logo} alt={match.away.name} sx={{ width: 28, height: 28, mr: 1 }} />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, color: '#2d014d', pl: 1, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {match.away.name}
                  </Typography>
                </Box>
                {/* Sân vận động */}
                <Box sx={{ flex: 1.2, display: 'flex', alignItems: 'center', pl: 2 }}>
                  <StadiumIcon sx={{ fontSize: 20, color: '#6c3483', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: '#6c3483', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {match.stadium}
                  </Typography>
                </Box>
                {/* Quick View Button */}
                <Box sx={{ minWidth: 120, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      fontWeight: 700,
                      color: '#2d014d',
                      borderColor: '#e1d5f7',
                      '&:hover': { borderColor: '#7b5cff', bgcolor: '#f3f0fa' },
                    }}
                  >
                        Quick View
                      </Button>
                  <ArrowForwardIosIcon sx={{ color: '#7b5cff', fontSize: 20, ml: 1 }} />
                </Box>
              </Box>
            ))}
          </Box>
        ))}

      {/* Modal Quick View */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#5a2d82', color: '#fff' }}>
          {selectedMatch && (
            <>
              <Box display="flex" alignItems="center">
                <Avatar src={selectedMatch.home.logo} sx={{ width: 32, height: 32, mr: 1 }} />
                <Typography sx={{ fontWeight: 700 }}>{selectedMatch.home.name}</Typography>
                <Typography sx={{ mx: 2, fontWeight: 700 }}>{selectedMatch.time}</Typography>
                <Avatar src={selectedMatch.away.logo} sx={{ width: 32, height: 32, mx: 1 }} />
                <Typography sx={{ fontWeight: 700 }}>{selectedMatch.away.name}</Typography>
              </Box>
              <IconButton onClick={handleClose} sx={{ color: '#fff' }}>
                <CloseIcon />
              </IconButton>
            </>
          )}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#faf7ff' }}>
          {matchDetail && (
            <Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                {/* Standings */}
                <Box width="30%">
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Standings</Typography>
                    {matchDetail.standings.map((team: any, idx: number) => (
                      <Box key={idx} display="flex" alignItems="center" mb={1}>
                        <Typography sx={{ width: 20 }}>{team.pos}</Typography>
                        <Avatar src={team.logo} sx={{ width: 24, height: 24, mx: 1 }} />
                        <Typography sx={{ flex: 1 }}>{team.club}</Typography>
                        <Typography sx={{ width: 30 }}>{team.pl}</Typography>
                        <Typography sx={{ width: 30 }}>{team.gd}</Typography>
                        <Typography sx={{ width: 30, fontWeight: 700 }}>{team.pts}</Typography>
                      </Box>
                    ))}
                </Box>
                {/* Previous Meetings */}
                <Box width="30%">
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Previous Meeting</Typography>
                    {matchDetail.previousMeetings.map((m: any, idx: number) => (
                      <Box key={idx} display="flex" alignItems="center" mb={1}>
                        <Typography sx={{ fontSize: 12, width: 90 }}>{m.date}</Typography>
                        <Avatar src={m.home.logo} sx={{ width: 20, height: 20, mx: 1 }} />
                        <Typography sx={{ fontWeight: 700 }}>{m.home.name}</Typography>
                        <Typography sx={{ mx: 1 }}>{m.score}</Typography>
                        <Avatar src={m.away.logo} sx={{ width: 20, height: 20, mx: 1 }} />
                        <Typography sx={{ fontWeight: 700 }}>{m.away.name}</Typography>
                      </Box>
                    ))}
                </Box>
                {/* Stadium */}
                <Box width="30%">
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Stadium</Typography>
                    <Box display="flex" alignItems="center">
                      <StadiumIcon sx={{ fontSize: 18, color: '#7b5cff', mr: 0.5 }} />
                  <Typography>{selectedMatch?.stadium}</Typography>
                    </Box>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                {/* Home Recent Results */}
                <Box width="48%">
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{selectedMatch?.home.name} - Recent Results</Typography>
                    {matchDetail.homeRecent.map((m: any, idx: number) => (
                      <Box key={idx} display="flex" alignItems="center" mb={1}>
                        <Typography sx={{ fontSize: 12, width: 90 }}>{m.date}</Typography>
                        <Avatar src={m.home.logo} sx={{ width: 20, height: 20, mx: 1 }} />
                        <Typography sx={{ fontWeight: 700 }}>{m.home.name}</Typography>
                        <Typography sx={{ mx: 1 }}>{m.score}</Typography>
                        <Avatar src={m.away.logo} sx={{ width: 20, height: 20, mx: 1 }} />
                        <Typography sx={{ fontWeight: 700 }}>{m.away.name}</Typography>
                      </Box>
                    ))}
                </Box>
                {/* Away Recent Results */}
                <Box width="48%">
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{selectedMatch?.away.name} - Recent Results</Typography>
                    {matchDetail.awayRecent.map((m: any, idx: number) => (
                      <Box key={idx} display="flex" alignItems="center" mb={1}>
                        <Typography sx={{ fontSize: 12, width: 90 }}>{m.date}</Typography>
                        <Avatar src={m.home.logo} sx={{ width: 20, height: 20, mx: 1 }} />
                        <Typography sx={{ fontWeight: 700 }}>{m.home.name}</Typography>
                        <Typography sx={{ mx: 1 }}>{m.score}</Typography>
                        <Avatar src={m.away.logo} sx={{ width: 20, height: 20, mx: 1 }} />
                        <Typography sx={{ fontWeight: 700 }}>{m.away.name}</Typography>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
        <Partners />
    </Container>
    </Box>
  );
};

export default Fixtures; 