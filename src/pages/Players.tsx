import { useState } from 'react';
import { Box, Container, Typography, TextField, Select, MenuItem, FormControl, List, ListItem, ListItemText, Grid, Divider, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Partners from '../components/Partners';
const seasons = ['2024/25', '2023/24', '2022/23'];
const clubs = ['All Clubs', 'Hà Nội', 'HAGL', 'Bình Dương', 'Viettel'];

// Dữ liệu mẫu cho người chơi
const playersData = [
  {
    id: 1,
    name: 'Max Aarons',
    position: 'Defender',
    nationality: 'England',
    flag: 'https://flagcdn.com/gb.svg',
    avatar: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p223340.png',
    season: '2024/25',
    club: 'Hà Nội',
  },
  {
    id: 2,
    name: 'Zach Abbott',
    position: 'Defender',
    nationality: 'England',
    flag: 'https://flagcdn.com/gb.svg',
    avatar: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p504956.png',
    season: '2024/25',
    club: 'Hà Nội',
  },
  {
    id: 3,
    name: 'Josh Acheampong',
    position: 'Defender',
    nationality: 'England',
    flag: 'https://flagcdn.com/gb.svg',
    avatar: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p513169.png',
    season: '2023/24',
    club: 'HAGL',
  },
  {
    id: 4,
    name: 'Adam Armstrong',
    position: 'Forward',
    nationality: 'England',
    flag: 'https://flagcdn.com/gb.svg',
    avatar: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p172780.png',
    season: '2022/23',
    club: 'Bình Dương',
  },
  {
    id: 5,
    name: 'Tyler Adams',
    position: 'Midfielder',
    nationality: 'United States',
    flag: 'https://flagcdn.com/us.svg',
    avatar: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p209243.png',
    season: '2023/24',
    club: 'Viettel',
  },
  {
    id: 6,
    name: 'Tosin Adarabioyo',
    position: 'Defender',
    nationality: 'England',
    flag: 'https://flagcdn.com/gb.svg',
    avatar: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p172780.png',
    season: '2024/25',
    club: 'Hà Nội',
  },
];
type Player = {
  id: number;
  name: string;
  position: string;
  nationality: string;
  flag: string;
  avatar: string;
  season: string;
  club: string;
};
const PlayerTable = ({ players }: { players: Player[] }) => (
  <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 700, color: 'purple' }}>Player</TableCell>
          <TableCell sx={{ fontWeight: 700, color: 'purple' }}>Position</TableCell>
          <TableCell sx={{ fontWeight: 700, color: 'purple' }}>Nationality</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {players.map((player) => (
          <TableRow key={player.id}>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={player.avatar} alt={player.name} sx={{ mr: 2 }} />
                <Typography
                  component={Link}
                  sx={{
                    fontWeight: 500,
                    color: 'purple',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline', color: '#37003c' }
                  }}
                >
                  {player.name}
                </Typography>
              </Box>
            </TableCell>
            <TableCell sx={{ color: 'purple' }}>{player.position}</TableCell>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={player.flag} alt={player.nationality} width={24} style={{ marginRight: 8 }} />
                <Typography sx={{ color: 'purple' }}>{player.nationality}</Typography>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
const Players = () => {
  const [search, setSearch] = useState('');
  const [season, setSeason] = useState(seasons[0]);
  const [club, setClub] = useState(clubs[0]);

  const handleReset = () => {
    setSeason(seasons[0]);
    setClub(clubs[0]);
  };
  // Lọc danh sách người chơi theo bộ lọc và tìm kiếm
  const filteredPlayers = playersData.filter(player => {
    return (
      (season === '' || player.season === season) &&
      (club === '' || player.club === club || club === 'All Clubs') &&
      player.name.toLowerCase().includes(search.toLowerCase())
    );
  });


  return (
    <Container maxWidth={false} sx={{ maxWidth: 1440, py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom
        sx={{
          fontWeight: 'bold',
          mb: 4,
          textAlign: 'center',
          color: '#37003c'
        }}>
        Players
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #eee',
          borderRadius: 2,
          p: 2,
          mb: 3,
          background: '#fff',
        }}
      >
        <Box sx={{ minWidth: 220, mr: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            Search Player
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1, px: 1 }}>
            <SearchIcon sx={{ color: 'purple', mr: 1 }} />
            <TextField
              variant="standard"
              placeholder="Search for a Player..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              InputProps={{ disableUnderline: true }}
              sx={{ flex: 1 }}
            />
          </Box>
        </Box>
        {/* Filter by Season */}
        <Box sx={{ minWidth: 180, mr: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            Filter by Season
          </Typography>
          <FormControl fullWidth variant="standard">
            <Select
              value={season}
              onChange={e => setSeason(e.target.value)}
              disableUnderline
              sx={{ fontWeight: 500, color: 'purple' }}
            >
              {seasons.map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Filter by Club */}
        <Box sx={{ minWidth: 180, mr: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            Filter by Club
          </Typography>
          <FormControl fullWidth variant="standard">
            <Select
              value={club}
              onChange={e => setClub(e.target.value)}
              disableUnderline
              sx={{ fontWeight: 500, color: 'purple' }}
            >
              {clubs.map(c => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Divider */}
        <Divider orientation="vertical" flexItem sx={{ mx: 2, height: 40 }} />

        {/* Reset Filters */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <IconButton onClick={handleReset} sx={{ color: 'purple', mr: 1 }}>
            <ReplayIcon />
          </IconButton>
          <Typography
            variant="body2"
            sx={{ color: 'purple', fontWeight: 500, cursor: 'pointer' }}
            onClick={handleReset}
          >
            RESET FILTERS
          </Typography>
        </Box>
      </Box>
      {filteredPlayers.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>No players found.</Typography>
      ) : (
        <PlayerTable players={filteredPlayers} />
      )}
      <Partners />
    </Container>
  );
};

export default Players;