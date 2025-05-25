import {Container, Box, Typography, Avatar, Paper, Grid, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Divider, FormControl, Select, MenuItem } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useState } from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import Partners from '../components/Partners';


type PlayerProfileData = {
  id: number;
  name: string;
  avatar: string;
  club: string;
  clubLogo: string;
  position: string;
  nationality: string;
  flag: string;
  dob: string; // yyyy-mm-dd
  age: number;
  height: string;
  social?: { x?: string; instagram?: string };
  stats: {
    appearances: number;
    goals: number;
    assists: number;
    cleanSheets: number;
  };
  career: {
    season: string;
    club: string;
    clubLogo: string;
    apps: string; // "3 (2)"
    goals: number;
  }[];
};
// Dữ liệu mẫu (bạn có thể fetch từ API hoặc truyền props)
const player: PlayerProfileData = {
  id: 1,
  name: 'Max Aarons',
  avatar: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p223340.png',
  club: 'Bournemouth',
  clubLogo: 'https://resources.premierleague.com/premierleague/badges/t91.png',
  position: 'Defender',
  nationality: 'England',
  flag: 'https://flagcdn.com/gb.svg',
  dob: '2000-01-04',
  age: 25,
  height: '178cm',
  social: {
    x: 'https://x.com/maxaarons',
    instagram: 'https://instagram.com/maxaarons'
  },
  stats: {
    appearances: 93,
    goals: 0,
    assists: 4,
    cleanSheets: 10
  },
  career: [
    { season: '2024/2025', club: 'Bournemouth', clubLogo: 'https://resources.premierleague.com/premierleague/badges/t91.png', apps: '3 (2)', goals: 0 },
    { season: '2023/2024', club: 'Bournemouth', clubLogo: 'https://resources.premierleague.com/premierleague/badges/t91.png', apps: '20 (7)', goals: 0 },
    { season: '2021/2022', club: 'Norwich City', clubLogo: 'https://resources.premierleague.com/premierleague/badges/t45.png', apps: '34 (2)', goals: 0 },
    { season: '2019/2020', club: 'Norwich City', clubLogo: 'https://resources.premierleague.com/premierleague/badges/t45.png', apps: '36 (0)', goals: 0 },
  ]
};

const playerStats = {
  appearances: 93,
  goals: 0,
  wins: 12,
  losses: 63,
  defence: {
    cleanSheets: 10,
    goalsConceded: 174,
    tackles: 143,
    tackleSuccess: '66%',
    successful5050: 96,
    aerialWon: 41,
    aerialLost: 111,
    ownGoals: 1,
    errorsLeadingToGoal: 0,
  },
  teamPlay: {
    assists: 4,
    passes: 2938,
    passesPerMatch: 31.59,
    bigChancesCreated: 10,
  },
  discipline: {
    yellowCards: 16,
    redCards: 0,
    fouls: 68,
    offsides: 6,
  },
  attack: {
    goals: 0,
    headedGoals: 0,
    rightFoot: 0,
    leftFoot: 0,
    hitWoodwork: 0,
  },
};
const StatRow = ({ label, value }: { label: string, value: string | number }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
    <Typography>{label}</Typography>
    <Typography fontWeight={700}>{value}</Typography>
  </Box>
);

const PlayerProfile = () => {
  const [tab, setTab] = useState(0);
  // const { id } = useParams(); // Nếu lấy id từ URL
  // TODO: Lấy dữ liệu theo id

  return (
    <Box>
      {/* Banner */}
      <Box sx={{
        width: '100%',
        minHeight: 180,
        background: 'linear-gradient(90deg, #3bb4e5 0%, #7b3fe4 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        pb: 4,
        pl: 4
      }}>
        <Avatar
          src={player.avatar}
          alt={player.name}
          sx={{
            width: 140,
            height: 140,
            border: '4px solid #fff',
            position: 'absolute',
            top: 30,
            left: 60,
            boxShadow: 3,
            background: '#fff'
          }}
        />
        <Box sx={{ ml: 24, color: '#fff', zIndex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>{player.name.split(' ')[0]}</Typography>
          <Typography variant="h3" sx={{ fontWeight: 900 }}>{player.name.split(' ')[1]}</Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography color="text.secondary" fontWeight={500}>Position</Typography>
              <Typography fontWeight={700} mb={2}>{player.position}</Typography>
              <Typography color="text.secondary" fontWeight={500}>Follow {player.name}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {player.social?.x && (
                  <Button
                    href={player.social.x}
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ minWidth: 0, p: 1 }}
                  >
                    <TwitterIcon />
                  </Button>
                )}
                {player.social?.instagram && (
                  <Button
                    href={player.social.instagram}
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ minWidth: 0, p: 1 }}
                  >
                    <InstagramIcon />
                  </Button>
                )}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography fontWeight={700} mb={1}>Premier League Record</Typography>
              <Box>
                <Typography>Appearances: <b>{player.stats.appearances}</b></Typography>
                <Typography>Goals: <b>{player.stats.goals}</b></Typography>
                <Typography>Assists: <b>{player.stats.assists}</b></Typography>
                <Typography>Clean sheets: <b>{player.stats.cleanSheets}</b></Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Main content */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              {/* Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                  <Tab label="Overview" />
                  <Tab label="Stats" />
                </Tabs>
              </Box>

              {tab === 0 && (
                /* Personal Details */
                <Box>
                  <Typography fontWeight={700} mb={2}>Personal Details</Typography>
                  <Grid container spacing={2} mb={3}>
                    <Grid item xs={12} sm={4}>
                      <Typography color="text.secondary">Nationality</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src={player.flag} alt={player.nationality} width={24} />
                        <Typography>{player.nationality}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography color="text.secondary">Date of Birth</Typography>
                      <Typography>
                        {new Date(player.dob).toLocaleDateString('en-GB')} ({player.age})
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography color="text.secondary">Height</Typography>
                      <Typography>{player.height}</Typography>
                    </Grid>
                  </Grid>
                  {/* Career Table */}
                  <Typography fontWeight={700} mb={2}>Premier League Playing Career</Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Season</TableCell>
                          <TableCell>Club</TableCell>
                          <TableCell>Apps (Subs)</TableCell>
                          <TableCell>Goals</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {player.career.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{row.season}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar src={row.clubLogo} sx={{ width: 24, height: 24 }} />
                                {row.club}
                              </Box>
                            </TableCell>
                            <TableCell>{row.apps}</TableCell>
                            <TableCell>{row.goals}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
              {tab === 1 && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ flex: 1, display: 'flex', gap: 2 }}>
                      <FormControl size="small">
                        <Select value="Premier League" sx={{ minWidth: 180 }}>
                          <MenuItem value="Premier League">Premier League</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl size="small">
                        <Select value="All Seasons" sx={{ minWidth: 140 }}>
                          <MenuItem value="All Seasons">All Seasons</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ReplayIcon sx={{ color: '#37003c' }} />
                      <Typography sx={{ color: '#37003c', fontWeight: 500, cursor: 'pointer' }}>RESET FILTERS</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ mb: 3 }} />

                  {/* 4 box lớn: Appearances, Goals, Wins, Losses */}
                  <Grid container spacing={2} mb={3}>
                    {[
                      { label: 'Appearances', value: playerStats.appearances },
                      { label: 'Goals', value: playerStats.goals },
                      { label: 'Wins', value: playerStats.wins },
                      { label: 'Losses', value: playerStats.losses },
                    ].map((item, idx) => (
                      <Grid item xs={6} md={3} key={idx}>
                        <Paper sx={{ p: 2, borderRadius: 2, textAlign: 'center', boxShadow: 'none', border: '1.5px solid #eee' }}>
                          <Typography color="text.secondary">{item.label}</Typography>
                          <Typography sx={{ fontWeight: 900, fontSize: 40, color: '#37003c' }}>{item.value}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>

                  {/* 4 box nhỏ: Defence, Team Play, Discipline, Attack */}
                  <Grid container spacing={2}>
                    {/* Defence */}
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, borderRadius: 2, borderTop: '3px solid #baff39', boxShadow: 'none' }}>
                        <Typography fontWeight={700} color="#37003c" mb={1}>Defence</Typography>
                        <StatRow label="Clean sheets" value={playerStats.defence.cleanSheets} />
                        <StatRow label="Goals Conceded" value={playerStats.defence.goalsConceded} />
                        <StatRow label="Tackles" value={playerStats.defence.tackles} />
                        <StatRow label="Tackle success %" value={playerStats.defence.tackleSuccess} />
                        <StatRow label="Successful 50/50s" value={playerStats.defence.successful5050} />
                        <StatRow label="Aerial battles won" value={playerStats.defence.aerialWon} />
                        <StatRow label="Aerial battles lost" value={playerStats.defence.aerialLost} />
                        <StatRow label="Own goals" value={playerStats.defence.ownGoals} />
                        <StatRow label="Errors leading to goal" value={playerStats.defence.errorsLeadingToGoal} />
                      </Paper>
                    </Grid>
                    {/* Team Play */}
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, borderRadius: 2, borderTop: '3px solid #baff39', boxShadow: 'none' }}>
                        <Typography fontWeight={700} color="#37003c" mb={1}>Team Play</Typography>
                        <StatRow label="Assists" value={playerStats.teamPlay.assists} />
                        <StatRow label="Passes" value={playerStats.teamPlay.passes} />
                        <StatRow label="Passes per match" value={playerStats.teamPlay.passesPerMatch} />
                        <StatRow label="Big Chances Created" value={playerStats.teamPlay.bigChancesCreated} />
                      </Paper>
                    </Grid>
                    {/* Discipline */}
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, borderRadius: 2, borderTop: '3px solid #baff39', boxShadow: 'none', mt: 2 }}>
                        <Typography fontWeight={700} color="#37003c" mb={1}>Discipline</Typography>
                        <StatRow label="Yellow cards" value={playerStats.discipline.yellowCards} />
                        <StatRow label="Red cards" value={playerStats.discipline.redCards} />
                        <StatRow label="Fouls" value={playerStats.discipline.fouls} />
                        <StatRow label="Offsides" value={playerStats.discipline.offsides} />
                      </Paper>
                    </Grid>
                    {/* Attack */}
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, borderRadius: 2, borderTop: '3px solid #baff39', boxShadow: 'none', mt: 2 }}>
                        <Typography fontWeight={700} color="#37003c" mb={1}>Attack</Typography>
                        <StatRow label="Goals" value={playerStats.attack.goals} />
                        <StatRow label="Headed goals" value={playerStats.attack.headedGoals} />
                        <StatRow label="Goals with right foot" value={playerStats.attack.rightFoot} />
                        <StatRow label="Goals with left foot" value={playerStats.attack.leftFoot} />
                        <StatRow label="Hit woodwork" value={playerStats.attack.hitWoodwork} />
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Partners />
    </Box>
  );
};

export default PlayerProfile;