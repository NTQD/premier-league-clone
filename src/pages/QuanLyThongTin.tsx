import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, Card, CardContent, CardMedia, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Partners from '../components/Partners';
import { playerService, Player as ServicePlayer } from '../services/playerService';
import { clubService, Club as ServiceClub } from '../services/clubService';
import { stadiumService, Stadium as ServiceStadium } from '../services/stadiumService';
import { fixtureService, Fixture } from '../services/fixtureService';
import { resultService, Result, Scorer, MatchStats } from '../services/resultService';
import { standingService, Standing } from '../services/standingService';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const initialForm = {
  name: '',
  date_of_birth: '',
  nationality: '',
  position: '',
  club_id: '',
  player_image: null as File | null,
  flag_image: null as File | null,
};

const initialClubForm = {
  name: '',
  founded_year: '',
  location: '',
  manager: '',
  website: '',
  logo: null as File | null,
  stadium_id: '',
  stadium_name: '',
  capacity: '',
  stadium_year_built: '',
};

interface FixtureFormData {
  date: string;
  time: string;
  home_team_id: string;
  home_team_name: string;
  away_team_id: string;
  away_team_name: string;
  stadium_id: string;
  stadium_name: string;
  home_score: string;
  away_score: string;
  competition: string;
  matchweek: string;
  status: Fixture['status'];
  broadcasters: string[];
}

interface StandingFormData {
  team_id: string;
  team_name: string;
  played: string;
  won: string;
  drawn: string;
  lost: string;
  GF: string;
  GA: string;
  GD: string;
  points: string;
  position: string;
}

interface ResultFormData {
  date: string;
  time: string;
  home_team_id: string;
  home_team_name: string;
  away_team_id: string;
  away_team_name: string;
  stadium_id: string;
  stadium_name: string;
  competition: string;
  matchweek: string;
  homeScore: string;
  awayScore: string;
  scorers: { home: Scorer[]; away: Scorer[] };
  stats: {
    possession: { home: string; away: string };
    shots: { home: string; away: string };
    shotsOnTarget: { home: string; away: string };
    corners: { home: string; away: string };
    fouls: { home: string; away: string };
  };
}

const initialFixtureForm: FixtureFormData = {
  date: '',
  time: '',
  home_team_id: '',
  home_team_name: '',
  away_team_id: '',
  away_team_name: '',
  stadium_id: '',
  stadium_name: '',
  home_score: '',
  away_score: '',
  competition: 'Premier League',
  matchweek: '',
  status: 'Scheduled',
  broadcasters: [],
};

const initialStandingForm: StandingFormData = {
  team_id: '',
  team_name: '',
  played: '',
  won: '',
  drawn: '',
  lost: '',
  GF: '',
  GA: '',
  GD: '',
  points: '',
  position: '',
};

const initialResultForm: ResultFormData = {
  date: '',
  time: '',
  home_team_id: '',
  home_team_name: '',
  away_team_id: '',
  away_team_name: '',
  stadium_id: '',
  stadium_name: '',
  competition: 'Premier League',
  matchweek: '',
  homeScore: '',
  awayScore: '',
  scorers: { home: [], away: [] },
  stats: {
    possession: { home: '', away: '' },
    shots: { home: '', away: '' },
    shotsOnTarget: { home: '', away: '' },
    corners: { home: '', away: '' },
    fouls: { home: '', away: '' },
  },
};

const QuanLyThongTin = () => {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [clubForm, setClubForm] = useState(initialClubForm);
  const [fixtureForm, setFixtureForm] = useState(initialFixtureForm);
  const [resultForm, setResultForm] = useState(initialResultForm);
  const [standingForm, setStandingForm] = useState(initialStandingForm);
  
  const [players, setPlayers] = useState<any[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [stadiums, setStadiums] = useState<any[]>([]);
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [standings, setStandings] = useState<any[]>([]);
  
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editClubIndex, setEditClubIndex] = useState<number | null>(null);
  const [editFixtureIndex, setEditFixtureIndex] = useState<number | null>(null);
  const [editResultIndex, setEditResultIndex] = useState<number | null>(null);
  const [editStandingIndex, setEditStandingIndex] = useState<number | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm({ ...form, [name]: files ? files[0] : null });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleClubInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setClubForm({ ...clubForm, [name]: files ? files[0] : null });
    } else {
      setClubForm({ ...clubForm, [name]: value });
    }
  };

  const handleFixtureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFixtureForm({ ...fixtureForm, [name]: value });
  };

  const handleResultInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResultForm({ ...resultForm, [name]: value });
  };

  const handleStandingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStandingForm({ ...standingForm, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const playerData: ServicePlayer = {
      name: form.name,
      dateOfBirth: form.date_of_birth,
      nationality: form.nationality,
      positionPlayer: form.position,
      club: form.club_id ? { id: parseInt(form.club_id) } : undefined,
    };

    try {
      if (editIndex !== null) {
        const playerId = players[editIndex].id!;
        await playerService.updatePlayer(playerId, playerData);
      } else {
        await playerService.createPlayer(playerData);
      }
      const updatedPlayers = await playerService.getAllPlayers();
      setPlayers(updatedPlayers);
      setEditIndex(null);
      setForm(initialForm);
    } catch (error) {
      console.error('Error saving player:', error);
    }
  };

  const handleEdit = (idx: number) => {
    const playerToEdit = players[idx];
    setForm({
      name: playerToEdit.name,
      date_of_birth: playerToEdit.dateOfBirth || '',
      nationality: playerToEdit.nationality || '',
      position: playerToEdit.positionPlayer || '',
      club_id: playerToEdit.club?.id?.toString() || '',
      player_image: null,
      flag_image: null,
    });
    setEditIndex(idx);
  };

  const handleDelete = (idx: number) => {
    const playerId = players[idx].id!;
    handleDeletePlayer(playerId);
    if (editIndex === idx) setEditIndex(null);
  };

  const handleDeletePlayer = async (playerId: number) => {
    try {
      await playerService.deletePlayer(playerId);
      const updatedPlayers = await playerService.getAllPlayers();
      setPlayers(updatedPlayers);
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [playersData, clubsData, stadiumsData, fixturesData, resultsData, standingsData] = await Promise.all([
          playerService.getAllPlayers(),
          clubService.getAllClubs(),
          stadiumService.getAllStadiums(),
          fixtureService.getAllFixtures(),
          resultService.getAllResults(),
          standingService.getAllStandings()
        ]);
        
        setPlayers(playersData);
        setClubs(clubsData);
        setStadiums(stadiumsData);
        setFixtures(fixturesData);
        setResults(resultsData);
        setStandings(standingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllData();
  }, []);

  const handleClubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clubData: ServiceClub = {
      name: clubForm.name,
      foundedYear: parseInt(clubForm.founded_year),
      manager: clubForm.manager,
      location: clubForm.location,
      website: clubForm.website || undefined,
      stadium: clubForm.stadium_id ? { id: parseInt(clubForm.stadium_id) } : undefined,
    };

    try {
      if (editClubIndex !== null) {
        const clubId = clubs[editClubIndex].id!;
        await clubService.updateClub(clubId, clubData);
      } else {
        await clubService.createClub(clubData);
      }
      const updatedClubs = await clubService.getAllClubs();
      setClubs(updatedClubs);
      setEditClubIndex(null);
      setClubForm(initialClubForm);
    } catch (error) {
      console.error('Error saving club:', error);
    }
  };

  const handleEditClub = (idx: number) => {
    const clubToEdit = clubs[idx];
    setClubForm({
      name: clubToEdit.name,
      founded_year: clubToEdit.foundedYear?.toString() || '',
      stadium_id: clubToEdit.stadium?.id?.toString() || '',
      manager: clubToEdit.manager || '',
      location: clubToEdit.location || '',
      website: clubToEdit.website || '',
      logo: null,
      stadium_name: clubToEdit.stadium?.name || '',
      capacity: clubToEdit.capacity?.toString() || '',
      stadium_year_built: clubToEdit.stadiumYearBuilt?.toString() || '',
    });
    setEditClubIndex(idx);
  };

  const handleDeleteClub = async (idx: number) => {
    try {
      const clubId = clubs[idx].id!;
      await clubService.deleteClub(clubId);
      const updatedClubs = await clubService.getAllClubs();
      setClubs(updatedClubs);
      if (editClubIndex === idx) {
        setEditClubIndex(null);
      }
    } catch (error) {
      console.error('Error deleting club:', error);
    }
  };

  const handleFixtureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fixtureData: Fixture = {
      homeTeam: { id: parseInt(fixtureForm.home_team_id), name: fixtureForm.home_team_name },
      awayTeam: { id: parseInt(fixtureForm.away_team_id), name: fixtureForm.away_team_name },
      date: fixtureForm.date,
      time: fixtureForm.time,
      stadium: { id: parseInt(fixtureForm.stadium_id), name: fixtureForm.stadium_name },
      competition: fixtureForm.competition,
      matchweek: parseInt(fixtureForm.matchweek),
      status: fixtureForm.status,
      broadcasters: fixtureForm.broadcasters,
    };

    try {
      if (editFixtureIndex !== null) {
        const fixtureId = fixtures[editFixtureIndex].id!;
        await fixtureService.updateFixture(fixtureId, fixtureData);
      } else {
        await fixtureService.createFixture(fixtureData);
      }
      const updatedFixtures = await fixtureService.getAllFixtures();
      setFixtures(updatedFixtures);
      setEditFixtureIndex(null);
      setFixtureForm(initialFixtureForm);
    } catch (error) {
      console.error('Error saving fixture:', error);
    }
  };

  const handleFixtureEdit = (idx: number) => {
    const fixtureToEdit = fixtures[idx];
    setFixtureForm({
      date: fixtureToEdit.date,
      time: fixtureToEdit.time,
      home_team_id: fixtureToEdit.homeTeam.id.toString(),
      home_team_name: fixtureToEdit.homeTeam.name,
      away_team_id: fixtureToEdit.awayTeam.id.toString(),
      away_team_name: fixtureToEdit.awayTeam.name,
      stadium_id: fixtureToEdit.stadium.id.toString(),
      stadium_name: fixtureToEdit.stadium.name,
      home_score: '',
      away_score: '',
      competition: fixtureToEdit.competition,
      matchweek: fixtureToEdit.matchweek.toString(),
      status: fixtureToEdit.status || 'Scheduled',
      broadcasters: fixtureToEdit.broadcasters || [],
    });
    setEditFixtureIndex(idx);
  };

  const handleDeleteFixture = async (idx: number) => {
    try {
      const fixtureId = fixtures[idx].id!;
      await fixtureService.deleteFixture(fixtureId);
      const updatedFixtures = await fixtureService.getAllFixtures();
      setFixtures(updatedFixtures);
      if (editFixtureIndex === idx) {
        setEditFixtureIndex(null);
      }
    } catch (error) {
      console.error('Error deleting fixture:', error);
    }
  };

  const handleResultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Construct data based on Service Result interface, mapping from form data
    const resultDataForService: Result = {
      homeTeam: { id: parseInt(resultForm.home_team_id), name: resultForm.home_team_name },
      awayTeam: { id: parseInt(resultForm.away_team_id), name: resultForm.away_team_name },
      date: resultForm.date,
      // time is in form but not in Service Result interface
      // stadium is in form data but not in Service Result interface
      competition: resultForm.competition,
      matchweek: parseInt(resultForm.matchweek),
      homeScore: parseInt(resultForm.homeScore),
      awayScore: parseInt(resultForm.awayScore),
      scorers: resultForm.scorers,
      stats: {
        possession: {
          home: parseInt(resultForm.stats.possession.home),
          away: parseInt(resultForm.stats.possession.away),
        },
        shots: {
          home: parseInt(resultForm.stats.shots.home),
          away: parseInt(resultForm.stats.shots.away),
        },
        shotsOnTarget: {
          home: parseInt(resultForm.stats.shotsOnTarget.home),
          away: parseInt(resultForm.stats.shotsOnTarget.away),
        },
        corners: {
          home: parseInt(resultForm.stats.corners.home),
          away: parseInt(resultForm.stats.corners.away),
        },
        fouls: {
          home: parseInt(resultForm.stats.fouls.home),
          away: parseInt(resultForm.stats.fouls.away),
        },
      },
    };

    try {
      if (editResultIndex !== null) {
        const resultId = results[editResultIndex].id!;
        await resultService.updateResult(resultId, resultDataForService);
      } else {
        await resultService.createResult(resultDataForService);
      }
      const updatedResults = await resultService.getAllResults();
      setResults(updatedResults);
      setEditResultIndex(null);
      setResultForm(initialResultForm);
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };

  const handleResultEdit = (idx: number) => {
    const resultToEdit = results[idx];
    setResultForm({
      date: resultToEdit.date || '',
      time: resultToEdit.time || '',
      home_team_id: resultToEdit.homeTeam?.id?.toString() || '',
      home_team_name: resultToEdit.homeTeam?.name || '',
      away_team_id: resultToEdit.awayTeam?.id?.toString() || '',
      away_team_name: resultToEdit.awayTeam?.name || '',
      stadium_id: resultToEdit.stadium?.id?.toString() || '',
      stadium_name: resultToEdit.stadium?.name || '',
      competition: resultToEdit.competition || 'Premier League',
      matchweek: resultToEdit.matchweek?.toString() || '',
      homeScore: resultToEdit.homeScore?.toString() || '',
      awayScore: resultToEdit.awayScore?.toString() || '',
      scorers: resultToEdit.scorers || { home: [], away: [] },
      stats: resultToEdit.stats || {
        possession: { home: resultToEdit.stats?.possession.home?.toString() || '', away: resultToEdit.stats?.possession.away?.toString() || '' },
        shots: { home: resultToEdit.stats?.shots.home?.toString() || '', away: resultToEdit.stats?.shots.away?.toString() || '' },
        shotsOnTarget: { home: resultToEdit.stats?.shotsOnTarget.home?.toString() || '', away: resultToEdit.stats?.shotsOnTarget.away?.toString() || '' },
        corners: { home: resultToEdit.stats?.corners.home?.toString() || '', away: resultToEdit.stats?.corners.away?.toString() || '' },
        fouls: { home: resultToEdit.stats?.fouls.home?.toString() || '', away: resultToEdit.stats?.fouls.away?.toString() || '' },
      },
    });
    setEditResultIndex(idx);
  };

  const handleDeleteResult = async (idx: number) => {
    try {
      const resultId = results[idx].id!;
      await resultService.deleteResult(resultId);
      const updatedResults = await resultService.getAllResults();
      setResults(updatedResults);
      if (editResultIndex === idx) {
        setEditResultIndex(null);
      }
    } catch (error) {
      console.error('Error deleting result:', error);
    }
  };

  const handleStandingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const standingData: Standing = {
      team: { id: parseInt(standingForm.team_id), name: standingForm.team_name },
      played: parseInt(standingForm.played),
      won: parseInt(standingForm.won),
      drawn: parseInt(standingForm.drawn),
      lost: parseInt(standingForm.lost),
      points: parseInt(standingForm.points),
    };

    try {
      if (editStandingIndex !== null) {
        const standingId = standings[editStandingIndex].id!;
        await standingService.updateStanding(standingId, standingData);
      } else {
        await standingService.createStanding(standingData);
      }
      const updatedStandings = await standingService.getAllStandings();
      setStandings(updatedStandings);
      setEditStandingIndex(null);
      setStandingForm(initialStandingForm);
    } catch (error) {
      console.error('Error saving standing:', error);
    }
  };

  const handleStandingEdit = (idx: number) => {
    const standingToEdit = standings[idx];
    setStandingForm({
      team_id: standingToEdit.team.id.toString(),
      team_name: standingToEdit.team.name,
      played: standingToEdit.played?.toString() || '',
      won: standingToEdit.won?.toString() || '',
      drawn: standingToEdit.drawn?.toString() || '',
      lost: standingToEdit.lost?.toString() || '',
      points: standingToEdit.points?.toString() || '',
      GF: '',
      GA: '',
      GD: '',
      position: '',
    });
    setEditStandingIndex(idx);
  };

  const handleDeleteStanding = async (idx: number) => {
    try {
      const standingId = standings[idx].id!;
      await standingService.deleteStanding(standingId);
      const updatedStandings = await standingService.getAllStandings();
      setStandings(updatedStandings);
      if (editStandingIndex === idx) {
        setEditStandingIndex(null);
      }
    } catch (error) {
      console.error('Error deleting standing:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Tabs value={tab} onChange={handleChange} centered sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Players" />
        <Tab label="Clubs" />
        <Tab label="Fixtures & Results" />
        <Tab label="Standings" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <Typography variant="h4" gutterBottom sx={{ color: '#37003c', fontWeight: 'bold' }}>Player Management</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Add New Player</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField label="Name" name="name" value={form.name} onChange={handleInputChange} required />
                  <TextField label="Date of Birth" name="date_of_birth" type="date" value={form.date_of_birth} onChange={handleInputChange} InputLabelProps={{ shrink: true }} required />
                  <TextField label="Nationality" name="nationality" value={form.nationality} onChange={handleInputChange} required />
                  <TextField label="Position" name="position" value={form.position} onChange={handleInputChange} required />
                  <TextField label="Club ID" name="club_id" value={form.club_id} onChange={handleInputChange} required />
                  <input
                    accept="image/*"
                    type="file"
                    name="player_image"
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                    id="player-image-input"
                  />
                  <label htmlFor="player-image-input">
                    <Button variant="outlined" component="span">
                      Upload Player Image
                    </Button>
                  </label>
                  <input
                    accept="image/*"
                    type="file"
                    name="flag_image"
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                    id="flag-image-input"
                  />
                  <label htmlFor="flag-image-input">
                    <Button variant="outlined" component="span">
                      Upload Flag Image
                    </Button>
                  </label>
                  <Button type="submit" variant="contained" color="primary" sx={{ bgcolor: '#37003c', '&:hover': { bgcolor: '#4a0052' } }}>
                    {editIndex !== null ? 'Update Player' : 'Add Player'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead sx={{ bgcolor: '#37003c' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'white' }}>ID</TableCell>
                    <TableCell sx={{ color: 'white' }}>Name</TableCell>
                    <TableCell sx={{ color: 'white' }}>Date of Birth</TableCell>
                    <TableCell sx={{ color: 'white' }}>Nationality</TableCell>
                    <TableCell sx={{ color: 'white' }}>Position</TableCell>
                    <TableCell sx={{ color: 'white' }}>Club ID</TableCell>
                    <TableCell sx={{ color: 'white' }}>Player Image</TableCell>
                    <TableCell sx={{ color: 'white' }}>Flag Image</TableCell>
                    <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {players.map((p, idx) => (
                    <TableRow key={p.id || idx} hover>
                      <TableCell>{p.id}</TableCell>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.dateOfBirth}</TableCell>
                      <TableCell>{p.nationality}</TableCell>
                      <TableCell>{p.positionPlayer}</TableCell>
                      <TableCell>{p.club?.id}</TableCell>
                      <TableCell>
                        {p.playerImage ? (
                          <img src={p.playerImage} alt="Player" style={{ width: 50, height: 50, objectFit: 'cover' }} />
                        ) : '-'}
                      </TableCell>
                      <TableCell>
                        {p.flagImage ? (
                          <img src={p.flagImage} alt="Flag" style={{ width: 50, height: 50, objectFit: 'cover' }} />
                        ) : '-'}
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(idx)}><EditIcon /></IconButton>
                        <IconButton color="error" onClick={() => handleDelete(idx)}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Typography variant="h4" gutterBottom sx={{ color: '#37003c', fontWeight: 'bold' }}>Club Management</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Add New Club</Typography>
                <Box component="form" onSubmit={handleClubSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField label="Club Name" name="name" value={clubForm.name} onChange={handleClubInputChange} required />
                  <TextField label="Founded Year" name="founded_year" type="number" value={clubForm.founded_year} onChange={handleClubInputChange} required />
                  <TextField label="Location" name="location" value={clubForm.location} onChange={handleClubInputChange} required />
                  <TextField label="Manager" name="manager" value={clubForm.manager} onChange={handleClubInputChange} required />
                  <TextField label="Website" name="website" value={clubForm.website} onChange={handleClubInputChange} />
                  <input
                    accept="image/*"
                    type="file"
                    name="logo"
                    onChange={handleClubInputChange}
                    style={{ display: 'none' }}
                    id="logo-input"
                  />
                  <label htmlFor="logo-input">
                    <Button variant="outlined" component="span">
                      Upload Logo
                    </Button>
                  </label>
                  <FormControl fullWidth required>
                    <InputLabel>Stadium</InputLabel>
                    <Select
                      name="stadium_id"
                      value={clubForm.stadium_id}
                      label="Stadium"
                      onChange={(e) => handleClubInputChange({ target: { name: 'stadium_id', value: e.target.value, type: 'text' } } as any)}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {stadiums.map((stadium) => (
                        <MenuItem key={stadium.id} value={stadium.id?.toString()}>
                          {stadium.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField label="Capacity" name="capacity" type="number" value={clubForm.capacity} onChange={handleClubInputChange} required />
                  <TextField label="Stadium Year Built" name="stadium_year_built" type="number" value={clubForm.stadium_year_built} onChange={handleClubInputChange} />
                  <Button type="submit" variant="contained" color="primary" sx={{ bgcolor: '#37003c', '&:hover': { bgcolor: '#4a0052' } }}>
                    {editClubIndex !== null ? 'Update Club' : 'Add Club'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead sx={{ bgcolor: '#37003c' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'white' }}>ID</TableCell>
                    <TableCell sx={{ color: 'white' }}>Club Name</TableCell>
                    <TableCell sx={{ color: 'white' }}>Founded Year</TableCell>
                    <TableCell sx={{ color: 'white' }}>Location</TableCell>
                    <TableCell sx={{ color: 'white' }}>Manager</TableCell>
                    <TableCell sx={{ color: 'white' }}>Website</TableCell>
                    <TableCell sx={{ color: 'white' }}>Logo</TableCell>
                    <TableCell sx={{ color: 'white' }}>Stadium ID</TableCell>
                    <TableCell sx={{ color: 'white' }}>Stadium Name</TableCell>
                    <TableCell sx={{ color: 'white' }}>Capacity</TableCell>
                    <TableCell sx={{ color: 'white' }}>Stadium Year Built</TableCell>
                    <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clubs.map((club, idx) => (
                    <TableRow key={club.id || idx} hover>
                      <TableCell>{club.id}</TableCell>
                      <TableCell>{club.name}</TableCell>
                      <TableCell>{club.foundedYear}</TableCell>
                      <TableCell>{club.location}</TableCell>
                      <TableCell>{club.manager}</TableCell>
                      <TableCell>{club.website || '-'}</TableCell>
                      <TableCell>
                        {club.logo ? (
                          <img src={club.logo} alt="Logo" style={{ width: 50, height: 50, objectFit: 'cover' }} />
                        ) : '-'}
                      </TableCell>
                      <TableCell>{club.stadium?.id}</TableCell>
                      <TableCell>{club.stadium?.name || '-'}</TableCell>
                      <TableCell>{club.capacity}</TableCell>
                      <TableCell>{club.stadiumYearBuilt}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEditClub(idx)}><EditIcon /></IconButton>
                        <IconButton color="error" onClick={() => handleDeleteClub(idx)}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Typography variant="h4" gutterBottom sx={{ color: '#37003c', fontWeight: 'bold' }}>Fixture and Result Management</Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Add New Fixture</Typography>
                <Box component="form" onSubmit={handleFixtureSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField label="Date" name="date" type="date" value={fixtureForm.date} onChange={handleFixtureInputChange} InputLabelProps={{ shrink: true }} required />
                  <TextField label="Time" name="time" type="time" value={fixtureForm.time} onChange={handleFixtureInputChange} InputLabelProps={{ shrink: true }} required />
                  <TextField label="Home Team ID" name="home_team_id" value={fixtureForm.home_team_id} onChange={handleFixtureInputChange} required />
                  <TextField label="Home Team Name" name="home_team_name" value={fixtureForm.home_team_name} onChange={handleFixtureInputChange} required />
                  <TextField label="Away Team ID" name="away_team_id" value={fixtureForm.away_team_id} onChange={handleFixtureInputChange} required />
                  <TextField label="Away Team Name" name="away_team_name" value={fixtureForm.away_team_name} onChange={handleFixtureInputChange} required />
                  <TextField label="Stadium ID" name="stadium_id" value={fixtureForm.stadium_id} onChange={handleFixtureInputChange} required />
                  <TextField label="Stadium Name" name="stadium_name" value={fixtureForm.stadium_name} onChange={handleFixtureInputChange} />
                  <TextField label="Home Score" name="home_score" type="number" value={fixtureForm.home_score} onChange={handleFixtureInputChange} />
                  <TextField label="Away Score" name="away_score" type="number" value={fixtureForm.away_score} onChange={handleFixtureInputChange} />
                  <TextField label="Competition" name="competition" value={fixtureForm.competition} onChange={handleFixtureInputChange} required />
                  <TextField label="Matchweek" name="matchweek" type="number" value={fixtureForm.matchweek} onChange={handleFixtureInputChange} required />
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={fixtureForm.status}
                      label="Status"
                      onChange={(e) => setFixtureForm({...fixtureForm, status: e.target.value as Fixture['status']})}
                    >
                      <MenuItem value="Scheduled">Scheduled</MenuItem>
                      <MenuItem value="Live">Live</MenuItem>
                      <MenuItem value="Finished">Finished</MenuItem>
                    </Select>
                  </FormControl>
                  <Button type="submit" variant="contained" color="primary" sx={{ bgcolor: '#37003c', '&:hover': { bgcolor: '#4a0052' } }}>
                    {editFixtureIndex !== null ? 'Update Fixture' : 'Add Fixture'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead sx={{ bgcolor: '#37003c' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'white' }}>ID</TableCell>
                    <TableCell sx={{ color: 'white' }}>Date</TableCell>
                    <TableCell sx={{ color: 'white' }}>Time</TableCell>
                    <TableCell sx={{ color: 'white' }}>Home Team ID</TableCell>
                    <TableCell sx={{ color: 'white' }}>Home Team Name</TableCell>
                    <TableCell sx={{ color: 'white' }}>Away Team ID</TableCell>
                    <TableCell sx={{ color: 'white' }}>Away Team Name</TableCell>
                    <TableCell sx={{ color: 'white' }}>Stadium ID</TableCell>
                    <TableCell sx={{ color: 'white' }}>Stadium Name</TableCell>
                    <TableCell sx={{ color: 'white' }}>Home Score</TableCell>
                    <TableCell sx={{ color: 'white' }}>Away Score</TableCell>
                    <TableCell sx={{ color: 'white' }}>Competition</TableCell>
                    <TableCell sx={{ color: 'white' }}>Matchweek</TableCell>
                    <TableCell sx={{ color: 'white' }}>Status</TableCell>
                    <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fixtures.map((fixture: Fixture, idx: number) => (
                    <TableRow key={fixture.id || idx} hover>
                      <TableCell>{fixture.id}</TableCell>
                      <TableCell>{fixture.date}</TableCell>
                      <TableCell>{fixture.time}</TableCell>
                      <TableCell>{fixture.homeTeam?.id}</TableCell>
                      <TableCell>{fixture.homeTeam?.name || '-'}</TableCell>
                      <TableCell>{fixture.awayTeam?.id}</TableCell>
                      <TableCell>{fixture.awayTeam?.name || '-'}</TableCell>
                      <TableCell>{fixture.stadium?.id}</TableCell>
                      <TableCell>{fixture.stadium?.name || '-'}</TableCell>
                      <TableCell>{(fixture as any).home_score || '-'}</TableCell>
                      <TableCell>{(fixture as any).away_score || '-'}</TableCell>
                      <TableCell>{fixture.competition}</TableCell>
                      <TableCell>{fixture.matchweek}</TableCell>
                      <TableCell>{fixture.status}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleFixtureEdit(idx)}><EditIcon /></IconButton>
                        <IconButton color="error" onClick={() => handleDeleteFixture(idx)}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <Typography variant="h4" gutterBottom sx={{ color: '#37003c', fontWeight: 'bold' }}>Standing Management</Typography>
        <Box component="form" onSubmit={handleStandingSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <TextField label="Team ID" name="team_id" value={standingForm.team_id} onChange={handleStandingInputChange} required />
          <TextField label="Team Name" name="team_name" value={standingForm.team_name} onChange={handleStandingInputChange} />
          <TextField label="Played" name="played" type="number" value={standingForm.played} onChange={handleStandingInputChange} required />
          <TextField label="Won" name="won" type="number" value={standingForm.won} onChange={handleStandingInputChange} required />
          <TextField label="Drawn" name="drawn" type="number" value={standingForm.drawn} onChange={handleStandingInputChange} required />
          <TextField label="Lost" name="lost" type="number" value={standingForm.lost} onChange={handleStandingInputChange} required />
          <TextField label="GF" name="GF" type="number" value={standingForm.GF} onChange={handleStandingInputChange} required />
          <TextField label="GA" name="GA" type="number" value={standingForm.GA} onChange={handleStandingInputChange} required />
          <TextField label="GD" name="GD" type="number" value={standingForm.GD} onChange={handleStandingInputChange} required />
          <TextField label="Points" name="points" type="number" value={standingForm.points} onChange={handleStandingInputChange} required />
          <TextField label="Position" name="position" type="number" value={standingForm.position} onChange={handleStandingInputChange} />
          <Button type="submit" variant="contained" color="primary">{editStandingIndex !== null ? 'Update' : 'Add'}</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Team ID</TableCell>
                <TableCell>Team Name</TableCell>
                <TableCell>Played</TableCell>
                <TableCell>Won</TableCell>
                <TableCell>Drawn</TableCell>
                <TableCell>Lost</TableCell>
                <TableCell>GF</TableCell>
                <TableCell>GA</TableCell>
                <TableCell>GD</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {standings.map((standing: Standing, idx: number) => (
                <TableRow key={standing.id || idx} hover>
                  <TableCell>{standing.id}</TableCell>
                  <TableCell>{standing.team?.id}</TableCell>
                  <TableCell>{standing.team?.name || '-'}</TableCell>
                  <TableCell>{standing.played}</TableCell>
                  <TableCell>{standing.won}</TableCell>
                  <TableCell>{standing.drawn}</TableCell>
                  <TableCell>{standing.lost}</TableCell>
                  <TableCell>{(standing as any).GF || '-'}</TableCell>
                  <TableCell>{(standing as any).GA || '-'}</TableCell>
                  <TableCell>{(standing as any).GD || '-'}</TableCell>
                  <TableCell>{standing.points}</TableCell>
                  <TableCell>{(standing as any).position || '-'}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleStandingEdit(idx)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDeleteStanding(idx)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <Partners />
    </Box>
  );
};

export default QuanLyThongTin; 