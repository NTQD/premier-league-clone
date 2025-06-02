import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, Card, CardContent, CardMedia, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Partners from '../components/Partners';
import { playerService, Player } from '../services/playerService';
import { clubService, Club } from '../services/clubService';
import { stadiumService, Stadium } from '../services/stadiumService';
import { fixtureService } from '../services/fixtureService';
import { resultService } from '../services/resultService';
import { standingService } from '../services/standingService';

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
  dateOfBirth: '',
  nationality: '',
  positionPlayer: '',
  club: '',
};

const initialClubForm = {
  name: '',
  founded: '',
  stadium: '',
  manager: '',
  location: '',
  logo: '',
  website: '',
  socialMedia: {
    twitter: '',
    facebook: '',
    instagram: ''
  }
};

const initialStadiumForm = {
  name: '',
  capacity: '',
  location: '',
  yearBuilt: '',
  surface: '',
  image: '',
  coordinates: {
    lat: '',
    lng: ''
  }
};

const initialFixtureForm = {
  homeTeam: '',
  awayTeam: '',
  date: '',
  time: '',
  stadium: '',
  competition: 'Premier League',
  matchweek: '',
  status: 'SCHEDULED',
  broadcasters: []
};

const initialResultForm = {
  homeTeam: '',
  awayTeam: '',
  homeScore: '',
  awayScore: '',
  date: '',
  competition: 'Premier League',
  matchweek: '',
  scorers: {
    home: [],
    away: []
  },
  stats: {
    possession: { home: '', away: '' },
    shots: { home: '', away: '' },
    shotsOnTarget: { home: '', away: '' },
    corners: { home: '', away: '' },
    fouls: { home: '', away: '' }
  }
};

const initialStandingForm = {
  team: '',
  played: '',
  won: '',
  drawn: '',
  lost: '',
  points: '',
  form: [] as string[]
};

interface Fixture {
  id?: number;
  homeTeam?: { id: number; name: string };
  awayTeam?: { id: number; name: string };
  date: string;
  time: string;
  stadium?: { id: number; name: string };
  competition?: string;
  matchweek?: number;
  status?: string;
  broadcasters?: string[];
}

interface Result {
  id?: number;
  homeTeam?: { id: number; name: string };
  awayTeam?: { id: number; name: string };
  homeScore?: number;
  awayScore?: number;
  date: string;
  competition?: string;
  matchweek?: number;
  scorers?: {
    home: string[];
    away: string[];
  };
  stats?: {
    possession: { home: string; away: string };
    shots: { home: string; away: string };
    shotsOnTarget: { home: string; away: string };
    corners: { home: string; away: string };
    fouls: { home: string; away: string };
  };
}

interface StandingData {
  id?: number;
  team?: { id: number; name: string };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  form?: string[];
}

const QuanLyThongTin = () => {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [clubForm, setClubForm] = useState(initialClubForm);
  const [stadiumForm, setStadiumForm] = useState(initialStadiumForm);
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
  const [editStadiumIndex, setEditStadiumIndex] = useState<number | null>(null);
  const [editFixtureIndex, setEditFixtureIndex] = useState<number | null>(null);
  const [editResultIndex, setEditResultIndex] = useState<number | null>(null);
  const [editStandingIndex, setEditStandingIndex] = useState<number | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...players];
      updated[editIndex] = form;
      setPlayers(updated);
      setEditIndex(null);
    } else {
      setPlayers([...players, form]);
    }
    setForm(initialForm);
  };

  const handleEdit = (idx: number) => {
    setForm(players[idx]);
    setEditIndex(idx);
  };

  const handleDelete = (idx: number) => {
    setPlayers(players.filter((_, i) => i !== idx));
    if (editIndex === idx) setEditIndex(null);
  };

  const fetchClubs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/clubs');
      if (response.ok) {
        const data = await response.json();
        setClubs(data);
      } else {
        console.error('Failed to fetch clubs');
      }
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const createClub = async (clubData: any) => {
    try {
      const response = await fetch('http://localhost:8080/api/clubs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clubData),
      });
      if (response.ok) {
        const newClub = await response.json();
        setClubs([...clubs, newClub]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating club:', error);
      return false;
    }
  };

  const updateClub = async (id: number, clubData: any) => {
    try {
      const response = await fetch(`http://localhost:8080/api/clubs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clubData),
      });
      if (response.ok) {
        const updatedClub = await response.json();
        setClubs(clubs.map(club => club.id === id ? updatedClub : club));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating club:', error);
      return false;
    }
  };

  const deleteClub = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/clubs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setClubs(clubs.filter(club => club.id !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting club:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleClubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clubData: Club = {
      name: clubForm.name,
      foundedYear: parseInt(clubForm.founded),
      manager: clubForm.manager,
      location: clubForm.location,
      website: clubForm.website,
      stadium: {
        id: parseInt(clubForm.stadium)
      }
    };

    try {
      if (editClubIndex !== null) {
        const clubId = clubs[editClubIndex].id!;
        await clubService.updateClub(clubId, clubData);
        const updatedClubs = await clubService.getAllClubs();
        setClubs(updatedClubs);
        setEditClubIndex(null);
      } else {
        await clubService.createClub(clubData);
        const updatedClubs = await clubService.getAllClubs();
        setClubs(updatedClubs);
      }
      setClubForm(initialClubForm);
    } catch (error) {
      console.error('Error saving club:', error);
    }
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

  const handleStadiumSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const stadiumData: Stadium = {
      name: stadiumForm.name,
      capacity: parseInt(stadiumForm.capacity),
      location: stadiumForm.location,
      yearBuilt: parseInt(stadiumForm.yearBuilt)
    };

    try {
      if (editStadiumIndex !== null) {
        const stadiumId = stadiums[editStadiumIndex].id!;
        await stadiumService.updateStadium(stadiumId, stadiumData);
        const updatedStadiums = await stadiumService.getAllStadiums();
        setStadiums(updatedStadiums);
        setEditStadiumIndex(null);
      } else {
        await stadiumService.createStadium(stadiumData);
        const updatedStadiums = await stadiumService.getAllStadiums();
        setStadiums(updatedStadiums);
      }
      setStadiumForm(initialStadiumForm);
    } catch (error) {
      console.error('Error saving stadium:', error);
    }
  };

  const handleDeleteStadium = async (idx: number) => {
    try {
      const stadiumId = stadiums[idx].id!;
      await stadiumService.deleteStadium(stadiumId);
      const updatedStadiums = await stadiumService.getAllStadiums();
      setStadiums(updatedStadiums);
      if (editStadiumIndex === idx) {
        setEditStadiumIndex(null);
      }
    } catch (error) {
      console.error('Error deleting stadium:', error);
    }
  };

  const handleFixtureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editFixtureIndex !== null) {
      const updated = [...fixtures];
      updated[editFixtureIndex] = fixtureForm;
      setFixtures(updated);
      setEditFixtureIndex(null);
    } else {
      setFixtures([...fixtures, fixtureForm]);
    }
    setFixtureForm(initialFixtureForm);
  };

  const handleResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editResultIndex !== null) {
      const updated = [...results];
      updated[editResultIndex] = resultForm;
      setResults(updated);
      setEditResultIndex(null);
    } else {
      setResults([...results, resultForm]);
    }
    setResultForm(initialResultForm);
  };

  const handleStandingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const standingData = {
        team: { id: parseInt(standingForm.team) },
        played: parseInt(standingForm.played),
        won: parseInt(standingForm.won),
        drawn: parseInt(standingForm.drawn),
        lost: parseInt(standingForm.lost),
        points: parseInt(standingForm.points),
        form: standingForm.form
      };

      if (editStandingIndex !== null) {
        const standingId = standings[editStandingIndex].id!;
        await standingService.updateStanding(standingId, standingData);
      } else {
        await standingService.createStanding(standingData);
      }

      const updatedStandings = await standingService.getAllStandings();
      setStandings(updatedStandings);
      setStandingForm(initialStandingForm);
      setEditStandingIndex(null);
    } catch (error) {
      console.error('Error saving standing:', error);
    }
  };

  // Fetch data when component mounts
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

  const handlePlayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const playerData: Player = {
        name: form.name,
        dateOfBirth: form.dateOfBirth,
        nationality: form.nationality,
        positionPlayer: form.positionPlayer,
        club: form.club ? { id: parseInt(form.club) } : undefined
      };

      console.log('Sending player data:', playerData);

      if (editIndex !== null) {
        const updatedPlayer = await playerService.updatePlayer(players[editIndex].id!, playerData);
        const updatedPlayers = [...players];
        updatedPlayers[editIndex] = updatedPlayer;
        setPlayers(updatedPlayers);
        setEditIndex(null);
      } else {
        const newPlayer = await playerService.createPlayer(playerData);
        setPlayers([...players, newPlayer]);
      }
      setForm(initialForm);
    } catch (error) {
      console.error('Error saving player:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
    }
  };

  const handleDeletePlayer = async (idx: number) => {
    try {
      const playerId = players[idx].id!;
      await playerService.deletePlayer(playerId);
      setPlayers(players.filter((_, i) => i !== idx));
      if (editIndex === idx) setEditIndex(null);
    } catch (error) {
      console.error('Error deleting player:', error);
    }
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
        <Tab label="Stadiums" />
        <Tab label="Fixtures" />
        <Tab label="Results" />
        <Tab label="Standings" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <Typography variant="h4" gutterBottom sx={{ color: '#37003c', fontWeight: 'bold' }}>Player Management</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Add New Player</Typography>
                <Box component="form" onSubmit={handlePlayerSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField label="Name" name="name" value={form.name} onChange={handleInputChange} required />
                  <TextField label="Date of Birth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleInputChange} InputLabelProps={{ shrink: true }} required />
                  <TextField label="Nationality" name="nationality" value={form.nationality} onChange={handleInputChange} required />
                  <TextField label="Position" name="positionPlayer" value={form.positionPlayer} onChange={handleInputChange} required />
                  <TextField label="Club" name="club" value={form.club} onChange={handleInputChange} required />
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
                    <TableCell sx={{ color: 'white' }}>Name</TableCell>
                    <TableCell sx={{ color: 'white' }}>Date of Birth</TableCell>
                    <TableCell sx={{ color: 'white' }}>Nationality</TableCell>
                    <TableCell sx={{ color: 'white' }}>Position</TableCell>
                    <TableCell sx={{ color: 'white' }}>Club</TableCell>
                    <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {players.map((p, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.dateOfBirth}</TableCell>
                      <TableCell>{p.nationality}</TableCell>
                      <TableCell>{p.positionPlayer}</TableCell>
                      <TableCell>{p.club?.name}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(idx)}><EditIcon /></IconButton>
                        <IconButton color="error" onClick={() => handleDeletePlayer(idx)}><DeleteIcon /></IconButton>
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
                  <TextField 
                    label="Club Name" 
                    name="name" 
                    value={clubForm.name} 
                    onChange={(e) => setClubForm({...clubForm, name: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Founded Year" 
                    name="founded" 
                    type="number"
                    value={clubForm.founded} 
                    onChange={(e) => setClubForm({...clubForm, founded: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Stadium ID" 
                    name="stadium" 
                    type="number"
                    value={clubForm.stadium} 
                    onChange={(e) => setClubForm({...clubForm, stadium: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Manager" 
                    name="manager" 
                    value={clubForm.manager} 
                    onChange={(e) => setClubForm({...clubForm, manager: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Location" 
                    name="location" 
                    value={clubForm.location} 
                    onChange={(e) => setClubForm({...clubForm, location: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Website" 
                    name="website" 
                    value={clubForm.website} 
                    onChange={(e) => setClubForm({...clubForm, website: e.target.value})} 
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    sx={{ bgcolor: '#37003c', '&:hover': { bgcolor: '#4a0052' } }}
                  >
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
                    <TableCell sx={{ color: 'white' }}>Founded</TableCell>
                    <TableCell sx={{ color: 'white' }}>Manager</TableCell>
                    <TableCell sx={{ color: 'white' }}>Location</TableCell>
                    <TableCell sx={{ color: 'white' }}>Website</TableCell>
                    <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clubs.map((club, idx) => (
                    <TableRow key={club.id} hover>
                      <TableCell>{club.id}</TableCell>
                      <TableCell>{club.name}</TableCell>
                      <TableCell>{club.foundedYear}</TableCell>
                      <TableCell>{club.manager}</TableCell>
                      <TableCell>{club.location}</TableCell>
                      <TableCell>{club.website || '-'}</TableCell>
                      <TableCell>
                        <IconButton 
                          color="primary" 
                          onClick={() => {
                            setClubForm({
                              name: club.name,
                              founded: club.foundedYear?.toString() || '',
                              stadium: club.stadium?.id?.toString() || '',
                              manager: club.manager,
                              location: club.location,
                              website: club.website || '',
                              logo: '',
                              socialMedia: {
                                twitter: '',
                                facebook: '',
                                instagram: ''
                              }
                            });
                            setEditClubIndex(idx);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDeleteClub(idx)}
                        >
                          <DeleteIcon />
                        </IconButton>
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
        <Typography variant="h4" gutterBottom sx={{ color: '#37003c', fontWeight: 'bold' }}>Stadium Management</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Add New Stadium</Typography>
                <Box component="form" onSubmit={handleStadiumSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField 
                    label="Stadium Name" 
                    name="name" 
                    value={stadiumForm.name} 
                    onChange={(e) => setStadiumForm({...stadiumForm, name: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Capacity" 
                    name="capacity" 
                    type="number"
                    value={stadiumForm.capacity} 
                    onChange={(e) => setStadiumForm({...stadiumForm, capacity: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Location" 
                    name="location" 
                    value={stadiumForm.location} 
                    onChange={(e) => setStadiumForm({...stadiumForm, location: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Year Built" 
                    name="yearBuilt" 
                    type="number"
                    value={stadiumForm.yearBuilt} 
                    onChange={(e) => setStadiumForm({...stadiumForm, yearBuilt: e.target.value})} 
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    sx={{ bgcolor: '#37003c', '&:hover': { bgcolor: '#4a0052' } }}
                  >
                    {editStadiumIndex !== null ? 'Update Stadium' : 'Add Stadium'}
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
                    <TableCell sx={{ color: 'white' }}>Capacity</TableCell>
                    <TableCell sx={{ color: 'white' }}>Location</TableCell>
                    <TableCell sx={{ color: 'white' }}>Year Built</TableCell>
                    <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stadiums.map((stadium, idx) => (
                    <TableRow key={stadium.id} hover>
                      <TableCell>{stadium.id}</TableCell>
                      <TableCell>{stadium.name}</TableCell>
                      <TableCell>{stadium.capacity}</TableCell>
                      <TableCell>{stadium.location}</TableCell>
                      <TableCell>{stadium.yearBuilt}</TableCell>
                      <TableCell>
                        <IconButton 
                          color="primary" 
                          onClick={() => {
                            setStadiumForm({
                              name: stadium.name,
                              capacity: stadium.capacity.toString(),
                              location: stadium.location,
                              yearBuilt: stadium.yearBuilt?.toString() || '',
                              surface: '',
                              image: '',
                              coordinates: {
                                lat: '',
                                lng: ''
                              }
                            });
                            setEditStadiumIndex(idx);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDeleteStadium(idx)}
                        >
                          <DeleteIcon />
                        </IconButton>
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
        <Typography variant="h4" gutterBottom sx={{ color: '#37003c', fontWeight: 'bold' }}>Fixture Management</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Add New Fixture</Typography>
                <Box component="form" onSubmit={handleFixtureSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField 
                    label="Home Team" 
                    name="homeTeam" 
                    value={fixtureForm.homeTeam} 
                    onChange={(e) => setFixtureForm({...fixtureForm, homeTeam: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Away Team" 
                    name="awayTeam" 
                    value={fixtureForm.awayTeam} 
                    onChange={(e) => setFixtureForm({...fixtureForm, awayTeam: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Date" 
                    name="date" 
                    type="date" 
                    value={fixtureForm.date} 
                    onChange={(e) => setFixtureForm({...fixtureForm, date: e.target.value})} 
                    InputLabelProps={{ shrink: true }} 
                    required 
                  />
                  <TextField 
                    label="Time" 
                    name="time" 
                    type="time" 
                    value={fixtureForm.time} 
                    onChange={(e) => setFixtureForm({...fixtureForm, time: e.target.value})} 
                    InputLabelProps={{ shrink: true }} 
                    required 
                  />
                  <TextField 
                    label="Stadium" 
                    name="stadium" 
                    value={fixtureForm.stadium} 
                    onChange={(e) => setFixtureForm({...fixtureForm, stadium: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Matchweek" 
                    name="matchweek" 
                    type="number"
                    value={fixtureForm.matchweek} 
                    onChange={(e) => setFixtureForm({...fixtureForm, matchweek: e.target.value})} 
                    required 
                  />
                  <FormControl>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={fixtureForm.status}
                      onChange={(e) => setFixtureForm({...fixtureForm, status: e.target.value})}
                      label="Status"
                    >
                      <MenuItem value="SCHEDULED">Scheduled</MenuItem>
                      <MenuItem value="LIVE">Live</MenuItem>
                      <MenuItem value="FINISHED">Finished</MenuItem>
                    </Select>
                  </FormControl>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    sx={{ bgcolor: '#37003c', '&:hover': { bgcolor: '#4a0052' } }}
                  >
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
                    <TableCell sx={{ color: 'white' }}>Home Team</TableCell>
                    <TableCell sx={{ color: 'white' }}>Away Team</TableCell>
                    <TableCell sx={{ color: 'white' }}>Date</TableCell>
                    <TableCell sx={{ color: 'white' }}>Time</TableCell>
                    <TableCell sx={{ color: 'white' }}>Stadium</TableCell>
                    <TableCell sx={{ color: 'white' }}>Matchweek</TableCell>
                    <TableCell sx={{ color: 'white' }}>Status</TableCell>
                    <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fixtures.map((fixture: Fixture, idx: number) => (
                    <TableRow key={idx} hover>
                      <TableCell>{fixture.homeTeam?.name || '-'}</TableCell>
                      <TableCell>{fixture.awayTeam?.name || '-'}</TableCell>
                      <TableCell>{fixture.date}</TableCell>
                      <TableCell>{fixture.time}</TableCell>
                      <TableCell>{fixture.stadium?.name || '-'}</TableCell>
                      <TableCell>{fixture.matchweek}</TableCell>
                      <TableCell>{fixture.status}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => {
                          setFixtureForm({
                            homeTeam: fixture.homeTeam?.id?.toString() || '',
                            awayTeam: fixture.awayTeam?.id?.toString() || '',
                            date: fixture.date,
                            time: fixture.time,
                            stadium: fixture.stadium?.id?.toString() || '',
                            competition: fixture.competition || 'Premier League',
                            matchweek: fixture.matchweek?.toString() || '',
                            status: fixture.status || 'SCHEDULED',
                            broadcasters: fixture.broadcasters || []
                          });
                          setEditFixtureIndex(idx);
                        }}><EditIcon /></IconButton>
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
      <TabPanel value={tab} index={4}>
        <Typography variant="h4" gutterBottom sx={{ color: '#37003c', fontWeight: 'bold' }}>Result Management</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Add New Result</Typography>
                <Box component="form" onSubmit={handleResultSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField 
                    label="Home Team" 
                    name="homeTeam" 
                    value={resultForm.homeTeam} 
                    onChange={(e) => setResultForm({...resultForm, homeTeam: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Away Team" 
                    name="awayTeam" 
                    value={resultForm.awayTeam} 
                    onChange={(e) => setResultForm({...resultForm, awayTeam: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Home Score" 
                    name="homeScore" 
                    type="number"
                    value={resultForm.homeScore} 
                    onChange={(e) => setResultForm({...resultForm, homeScore: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Away Score" 
                    name="awayScore" 
                    type="number"
                    value={resultForm.awayScore} 
                    onChange={(e) => setResultForm({...resultForm, awayScore: e.target.value})} 
                    required 
                  />
                  <TextField 
                    label="Date" 
                    name="date" 
                    type="date" 
                    value={resultForm.date} 
                    onChange={(e) => setResultForm({...resultForm, date: e.target.value})} 
                    InputLabelProps={{ shrink: true }} 
                    required 
                  />
                  <TextField 
                    label="Matchweek" 
                    name="matchweek" 
                    type="number"
                    value={resultForm.matchweek} 
                    onChange={(e) => setResultForm({...resultForm, matchweek: e.target.value})} 
                    required 
                  />
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>Match Statistics</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField 
                        label="Home Possession" 
                        name="homePossession" 
                        type="number"
                        value={resultForm.stats.possession.home} 
                        onChange={(e) => setResultForm({
                          ...resultForm, 
                          stats: {...resultForm.stats, possession: {...resultForm.stats.possession, home: e.target.value}}
                        })} 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        label="Away Possession" 
                        name="awayPossession" 
                        type="number"
                        value={resultForm.stats.possession.away} 
                        onChange={(e) => setResultForm({
                          ...resultForm, 
                          stats: {...resultForm.stats, possession: {...resultForm.stats.possession, away: e.target.value}}
                        })} 
                      />
                    </Grid>
                  </Grid>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    sx={{ bgcolor: '#37003c', '&:hover': { bgcolor: '#4a0052' } }}
                  >
                    {editResultIndex !== null ? 'Update Result' : 'Add Result'}
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
                    <TableCell sx={{ color: 'white' }}>Home Team</TableCell>
                    <TableCell sx={{ color: 'white' }}>Away Team</TableCell>
                    <TableCell sx={{ color: 'white' }}>Score</TableCell>
                    <TableCell sx={{ color: 'white' }}>Date</TableCell>
                    <TableCell sx={{ color: 'white' }}>Matchweek</TableCell>
                    <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((result: Result, idx: number) => (
                    <TableRow key={idx} hover>
                      <TableCell>{result.homeTeam?.name || '-'}</TableCell>
                      <TableCell>{result.awayTeam?.name || '-'}</TableCell>
                      <TableCell>{`${result.homeScore} - ${result.awayScore}`}</TableCell>
                      <TableCell>{result.date}</TableCell>
                      <TableCell>{result.matchweek}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => {
                          setResultForm({
                            homeTeam: result.homeTeam?.id?.toString() || '',
                            awayTeam: result.awayTeam?.id?.toString() || '',
                            homeScore: result.homeScore?.toString() || '',
                            awayScore: result.awayScore?.toString() || '',
                            date: result.date,
                            competition: result.competition || 'Premier League',
                            matchweek: result.matchweek?.toString() || '',
                            scorers: result.scorers || { home: [], away: [] },
                            stats: result.stats || {
                              possession: { home: '', away: '' },
                              shots: { home: '', away: '' },
                              shotsOnTarget: { home: '', away: '' },
                              corners: { home: '', away: '' },
                              fouls: { home: '', away: '' }
                            }
                          });
                          setEditResultIndex(idx);
                        }}><EditIcon /></IconButton>
                        <IconButton color="error" onClick={() => handleDeleteResult(idx)}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tab} index={5}>
        <Typography variant="h6" gutterBottom>Standing Management</Typography>
        <Box component="form" onSubmit={handleStandingSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <TextField label="Team" name="team" value={standingForm.team} onChange={(e) => setStandingForm({...standingForm, team: e.target.value})} required />
          <TextField label="Played" name="played" type="number" value={standingForm.played} onChange={(e) => setStandingForm({...standingForm, played: e.target.value})} required />
          <TextField label="Won" name="won" type="number" value={standingForm.won} onChange={(e) => setStandingForm({...standingForm, won: e.target.value})} required />
          <TextField label="Drawn" name="drawn" type="number" value={standingForm.drawn} onChange={(e) => setStandingForm({...standingForm, drawn: e.target.value})} required />
          <TextField label="Lost" name="lost" type="number" value={standingForm.lost} onChange={(e) => setStandingForm({...standingForm, lost: e.target.value})} required />
          <TextField label="Points" name="points" type="number" value={standingForm.points} onChange={(e) => setStandingForm({...standingForm, points: e.target.value})} required />
          <Button type="submit" variant="contained" color="primary">{editStandingIndex !== null ? 'Update' : 'Add'}</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Team</TableCell>
                <TableCell>Played</TableCell>
                <TableCell>Won</TableCell>
                <TableCell>Drawn</TableCell>
                <TableCell>Lost</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {standings.map((standing: StandingData, idx: number) => (
                <TableRow key={idx} hover>
                  <TableCell>{standing.team?.name || '-'}</TableCell>
                  <TableCell>{standing.played}</TableCell>
                  <TableCell>{standing.won}</TableCell>
                  <TableCell>{standing.drawn}</TableCell>
                  <TableCell>{standing.lost}</TableCell>
                  <TableCell>{standing.points}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => {
                      setStandingForm({
                        team: standing.team?.id?.toString() || '',
                        played: standing.played?.toString() || '',
                        won: standing.won?.toString() || '',
                        drawn: standing.drawn?.toString() || '',
                        lost: standing.lost?.toString() || '',
                        points: standing.points?.toString() || '',
                        form: standing.form || []
                      });
                      setEditStandingIndex(idx);
                    }}><EditIcon /></IconButton>
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