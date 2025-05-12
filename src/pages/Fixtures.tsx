
import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Avatar, Divider, Button, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Kiểu dữ liệu cho trận đấu
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

// Dữ liệu giả lập cho các trận đấu
const fixturesData: Day[] = [
  {
    date: 'Saturday 10 May 2025',
    matches: [
      {
        home: { name: 'Fulham', logo: '/images/clubs/fulham.png' },
        away: { name: 'Everton', logo: '/images/clubs/everton.png' },
        time: '21:00',
        stadium: 'Craven Cottage, London',
      },
      {
        home: { name: 'Ipswich', logo: '/images/clubs/ipswich.png' },
        away: { name: 'Brentford', logo: '/images/clubs/brentford.png' },
        time: '21:00',
        stadium: 'Portman Road, Ipswich',
      },
      {
        home: { name: 'Southampton', logo: '/images/clubs/southampton.png' },
        away: { name: 'Man City', logo: '/images/clubs/manchester-city.png' },
        time: '21:00',
        stadium: "St. Mary's Stadium, Southampton",
      },
      {
        home: { name: 'Wolves', logo: '/images/clubs/wolves.png' },
        away: { name: 'Brighton', logo: '/images/clubs/brighton.png' },
        time: '21:00',
        stadium: 'Molineux Stadium, Wolverhampton',
      },
      {
        home: { name: 'Bournemouth', logo: '/images/clubs/bournemouth.png' },
        away: { name: 'Aston Villa', logo: '/images/clubs/aston-villa.png' },
        time: '23:30',
        stadium: 'Vitality Stadium, Bournemouth',
      },
    ],
  },
  {
    date: 'Sunday 11 May 2025',
    matches: [
      {
        home: { name: 'Newcastle', logo: '/images/clubs/newcastle.png' },
        away: { name: 'Chelsea', logo: '/images/clubs/chelsea.png' },
        time: '18:00',
        stadium: "St. James' Park, Newcastle",
      },
      {
        home: { name: 'Man Utd', logo: '/images/clubs/manchester-united.png' },
        away: { name: 'West Ham', logo: '/images/clubs/west-ham.png' },
        time: '20:15',
        stadium: 'Old Trafford, Manchester',
      },
      {
        home: { name: "Nott'm Forest", logo: '/images/clubs/nottingham-forest.png' },
        away: { name: 'Leicester', logo: '/images/clubs/leicester.png' },
        time: '20:15',
        stadium: 'The City Ground, Nottingham',
      },
      {
        home: { name: 'Spurs', logo: '/images/clubs/tottenham.png' },
        away: { name: 'Crystal Palace', logo: '/images/clubs/crystal-palace.png' },
        time: '20:15',
        stadium: 'Tottenham Hotspur Stadium, London',
      },
      {
        home: { name: 'Liverpool', logo: '/images/clubs/liverpool.png' },
        away: { name: 'Arsenal', logo: '/images/clubs/arsenal.png' },
        time: '22:30',
        stadium: 'Anfield, Liverpool',
      },
    ],
  },
  {
    date: 'Saturday 17 May 2025',
    matches: [
      {
        home: { name: 'Aston Villa', logo: '/images/clubs/arsenal.png' },
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
        away: { name: 'Bournemouth', logo: '/images/clubs/bournemouth.pngg' },
        time: '02:00',
        stadium: 'Etihad Stadium, Manchester',
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
    { date: 'Saturday 3 May 2025', home: { name: 'AVL', logo: '/images/clubs/arsenal.png' }, away: match.home, score: '1 - 0' },
    { date: 'Saturday 26 April 2025', home: { name: 'SOU', logo: '/images/clubs/southampton.png' }, away: match.home, score: '1 - 2' },
  ],
  awayRecent: [
    { date: 'Saturday 10 May 2025', home: match.home, away: match.away, score: '1 - 3' },
    { date: 'Saturday 3 May 2025', home: match.away, away: { name: 'IPS', logo: '/images/clubs/ipswich.png' }, score: '2 - 2' },
    { date: 'Saturday 26 April 2025', home: { name: 'CHE', logo: '/images/clubs/chelsea.png' }, away: match.away, score: '1 - 0' },
  ],
});

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
    <Container maxWidth={false} sx={{ maxWidth: 1440, py: 4, mx: 'auto' }}>
      {fixturesData.map((day, idx) => {
        return (
          <Box key={day.date} mb={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#5a2d82' }}>
              {day.date}
            </Typography>
            {day.matches.map((match, i) => {
              return (
                <Box key={i} display="flex" alignItems="center" py={1} px={2} sx={{ background: i % 2 === 0 ? '#faf7ff' : '#fff' }}>
                  <Grid container alignItems="center">
                    <Grid item xs={4} display="flex" alignItems="center" justifyContent="flex-end">
                      <Typography variant="body1" sx={{ mr: 1 }}>{match.home.name}</Typography>
                      <Avatar src={match.home.logo} alt={match.home.name} sx={{ width: 32, height: 32, mx: 1 }} />
                    </Grid>
                    <Grid item xs={1} textAlign="center">
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{match.time}</Typography>
                    </Grid>
                    <Grid item xs={4} display="flex" alignItems="center">
                      <Avatar src={match.away.logo} alt={match.away.name} sx={{ width: 32, height: 32, mx: 1 }} />
                      <Typography variant="body1" sx={{ ml: 1 }}>{match.away.name}</Typography>
                    </Grid>
                    <Grid item xs={2} textAlign="right">
                      <Typography variant="caption" color="text.secondary">{match.stadium}</Typography>
                    </Grid>
                    <Grid item xs={1} textAlign="right">
                      <Button variant="outlined" size="small" onClick={() => handleOpen(match)}>
                        Quick View
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
            <Divider sx={{ mt: 2 }} />
          </Box>
        );
      })}

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
                  {matchDetail.standings.map((team: any, idx: number) => {
                    return (
                      <Box key={idx} display="flex" alignItems="center" mb={1}>
                        <Typography sx={{ width: 20 }}>{team.pos}</Typography>
                        <Avatar src={team.logo} sx={{ width: 24, height: 24, mx: 1 }} />
                        <Typography sx={{ flex: 1 }}>{team.club}</Typography>
                        <Typography sx={{ width: 30 }}>{team.pl}</Typography>
                        <Typography sx={{ width: 30 }}>{team.gd}</Typography>
                        <Typography sx={{ width: 30, fontWeight: 700 }}>{team.pts}</Typography>
                      </Box>
                    );
                  })}
                </Box>
                {/* Previous Meetings */}
                <Box width="30%">
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Previous Meeting</Typography>
                  {matchDetail.previousMeetings.map((m: any, idx: number) => {
                    return (
                      <Box key={idx} display="flex" alignItems="center" mb={1}>
                        <Typography sx={{ fontSize: 12, width: 90 }}>{m.date}</Typography>
                        <Avatar src={m.home.logo} sx={{ width: 20, height: 20, mx: 1 }} />
                        <Typography sx={{ fontWeight: 700 }}>{m.home.name}</Typography>
                        <Typography sx={{ mx: 1 }}>{m.score}</Typography>
                        <Avatar src={m.away.logo} sx={{ width: 20, height: 20, mx: 1 }} />
                        <Typography sx={{ fontWeight: 700 }}>{m.away.name}</Typography>
                      </Box>
                    );
                  })}
                </Box>
                {/* Stadium */}
                <Box width="30%">
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Stadium</Typography>
                  <Typography>{selectedMatch?.stadium}</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                {/* Home Recent Results */}
                <Box width="48%">
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{selectedMatch?.home.name} - Recent Results</Typography>
                  {matchDetail.homeRecent.map((m: any, idx: number) => {
                    return (
                      <Box key={idx} display="flex" alignItems="center" mb={1}>
                        <Typography sx={{ fontSize: 12, width: 90 }}>{m.date}</Typography>
                        <Avatar src={m.home.logo} sx={{ width: 20, height: 20, mx: 1 }} />
                        <Typography sx={{ fontWeight: 700 }}>{m.home.name}</Typography>
                        <Typography sx={{ mx: 1 }}>{m.score}</Typography>
                        <Avatar src={m.away.logo} sx={{ width: 20, height: 20, mx: 1 }} />
                        <Typography sx={{ fontWeight: 700 }}>{m.away.name}</Typography>
                      </Box>
                    );
                  })}
                </Box>
                {/* Away Recent Results */}
                <Box width="48%">
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{selectedMatch?.away.name} - Recent Results</Typography>
                  {matchDetail.awayRecent.map((m: any, idx: number) => {
                    return (
                      <Box key={idx} display="flex" alignItems="center" mb={1}>
                        <Typography sx={{ fontSize: 12, width: 90 }}>{m.date}</Typography>
                        <Avatar src={m.home.logo} sx={{ width: 20, height: 20, mx: 1 }} />
                        <Typography sx={{ fontWeight: 700 }}>{m.home.name}</Typography>
                        <Typography sx={{ mx: 1 }}>{m.score}</Typography>
                        <Avatar src={m.away.logo} sx={{ width: 20, height: 20, mx: 1 }} />
                        <Typography sx={{ fontWeight: 700 }}>{m.away.name}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Fixtures; 