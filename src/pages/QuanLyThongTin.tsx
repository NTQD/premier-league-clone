import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, Card, CardContent, CardMedia } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Partners from '../components/Partners';

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
  status: 'Scheduled', // Scheduled, Live, Finished
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
  goalsFor: '',
  goalsAgainst: '',
  goalDifference: '',
  form: [], // Last 5 matches results
  position: ''
};

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

  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editClubIndex !== null) {
      const updated = [...clubs];
      updated[editClubIndex] = clubForm;
      setClubs(updated);
      setEditClubIndex(null);
    } else {
      setClubs([...clubs, clubForm]);
    }
    setClubForm(initialClubForm);
  };

  const handleStadiumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editStadiumIndex !== null) {
      const updated = [...stadiums];
      updated[editStadiumIndex] = stadiumForm;
      setStadiums(updated);
      setEditStadiumIndex(null);
    } else {
      setStadiums([...stadiums, stadiumForm]);
    }
    setStadiumForm(initialStadiumForm);
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

  const handleStandingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editStandingIndex !== null) {
      const updated = [...standings];
      updated[editStandingIndex] = standingForm;
      setStandings(updated);
      setEditStandingIndex(null);
    } else {
      setStandings([...standings, standingForm]);
    }
    setStandingForm(initialStandingForm);
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
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                      <TableCell>{p.club}</TableCell>
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
                  <TextField label="Club Name" name="name" value={clubForm.name} onChange={(e) => setClubForm({...clubForm, name: e.target.value})} required />
                  <TextField label="Founded Year" name="founded" value={clubForm.founded} onChange={(e) => setClubForm({...clubForm, founded: e.target.value})} required />
                  <TextField label="Stadium" name="stadium" value={clubForm.stadium} onChange={(e) => setClubForm({...clubForm, stadium: e.target.value})} required />
                  <TextField label="Manager" name="manager" value={clubForm.manager} onChange={(e) => setClubForm({...clubForm, manager: e.target.value})} required />
                  <TextField label="Location" name="location" value={clubForm.location} onChange={(e) => setClubForm({...clubForm, location: e.target.value})} required />
                  <TextField label="Website" name="website" value={clubForm.website} onChange={(e) => setClubForm({...clubForm, website: e.target.value})} />
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
                    <TableCell sx={{ color: 'white' }}>Club Name</TableCell>
                    <TableCell sx={{ color: 'white' }}>Founded</TableCell>
                    <TableCell sx={{ color: 'white' }}>Stadium</TableCell>
                    <TableCell sx={{ color: 'white' }}>Manager</TableCell>
                    <TableCell sx={{ color: 'white' }}>Location</TableCell>
                    <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clubs.map((club, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{club.name}</TableCell>
                      <TableCell>{club.founded}</TableCell>
                      <TableCell>{club.stadium}</TableCell>
                      <TableCell>{club.manager}</TableCell>
                      <TableCell>{club.location}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => {
                          setClubForm(club);
                          setEditClubIndex(idx);
                        }}><EditIcon /></IconButton>
                        <IconButton color="error" onClick={() => {
                          setClubs(clubs.filter((_, i) => i !== idx));
                          if (editClubIndex === idx) setEditClubIndex(null);
                        }}><DeleteIcon /></IconButton>
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
        <Typography variant="h6" gutterBottom>Stadium Management</Typography>
        <Box component="form" onSubmit={handleStadiumSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <TextField label="Stadium Name" name="name" value={stadiumForm.name} onChange={(e) => setStadiumForm({...stadiumForm, name: e.target.value})} required />
          <TextField label="Capacity" name="capacity" value={stadiumForm.capacity} onChange={(e) => setStadiumForm({...stadiumForm, capacity: e.target.value})} required />
          <TextField label="Location" name="location" value={stadiumForm.location} onChange={(e) => setStadiumForm({...stadiumForm, location: e.target.value})} required />
          <TextField label="Year Built" name="yearBuilt" value={stadiumForm.yearBuilt} onChange={(e) => setStadiumForm({...stadiumForm, yearBuilt: e.target.value})} required />
          <Button type="submit" variant="contained" color="primary">{editStadiumIndex !== null ? 'Update' : 'Add'}</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Stadium Name</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Year Built</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stadiums.map((stadium, idx) => (
                <TableRow key={idx}>
                  <TableCell>{stadium.name}</TableCell>
                  <TableCell>{stadium.capacity}</TableCell>
                  <TableCell>{stadium.location}</TableCell>
                  <TableCell>{stadium.yearBuilt}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => {
                      setStadiumForm(stadium);
                      setEditStadiumIndex(idx);
                    }}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => {
                      setStadiums(stadiums.filter((_, i) => i !== idx));
                      if (editStadiumIndex === idx) setEditStadiumIndex(null);
                    }}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <Typography variant="h6" gutterBottom>Fixture Management</Typography>
        <Box component="form" onSubmit={handleFixtureSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <TextField label="Home Team" name="homeTeam" value={fixtureForm.homeTeam} onChange={(e) => setFixtureForm({...fixtureForm, homeTeam: e.target.value})} required />
          <TextField label="Away Team" name="awayTeam" value={fixtureForm.awayTeam} onChange={(e) => setFixtureForm({...fixtureForm, awayTeam: e.target.value})} required />
          <TextField label="Date" name="date" type="date" value={fixtureForm.date} onChange={(e) => setFixtureForm({...fixtureForm, date: e.target.value})} InputLabelProps={{ shrink: true }} required />
          <TextField label="Time" name="time" type="time" value={fixtureForm.time} onChange={(e) => setFixtureForm({...fixtureForm, time: e.target.value})} InputLabelProps={{ shrink: true }} required />
          <TextField label="Stadium" name="stadium" value={fixtureForm.stadium} onChange={(e) => setFixtureForm({...fixtureForm, stadium: e.target.value})} required />
          <Button type="submit" variant="contained" color="primary">{editFixtureIndex !== null ? 'Update' : 'Add'}</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Home Team</TableCell>
                <TableCell>Away Team</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Stadium</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fixtures.map((fixture, idx) => (
                <TableRow key={idx}>
                  <TableCell>{fixture.homeTeam}</TableCell>
                  <TableCell>{fixture.awayTeam}</TableCell>
                  <TableCell>{fixture.date}</TableCell>
                  <TableCell>{fixture.time}</TableCell>
                  <TableCell>{fixture.stadium}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => {
                      setFixtureForm(fixture);
                      setEditFixtureIndex(idx);
                    }}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => {
                      setFixtures(fixtures.filter((_, i) => i !== idx));
                      if (editFixtureIndex === idx) setEditFixtureIndex(null);
                    }}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={tab} index={4}>
        <Typography variant="h6" gutterBottom>Result Management</Typography>
        <Box component="form" onSubmit={handleResultSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <TextField label="Home Team" name="homeTeam" value={resultForm.homeTeam} onChange={(e) => setResultForm({...resultForm, homeTeam: e.target.value})} required />
          <TextField label="Away Team" name="awayTeam" value={resultForm.awayTeam} onChange={(e) => setResultForm({...resultForm, awayTeam: e.target.value})} required />
          <TextField label="Home Score" name="homeScore" type="number" value={resultForm.homeScore} onChange={(e) => setResultForm({...resultForm, homeScore: e.target.value})} required />
          <TextField label="Away Score" name="awayScore" type="number" value={resultForm.awayScore} onChange={(e) => setResultForm({...resultForm, awayScore: e.target.value})} required />
          <TextField label="Date" name="date" type="date" value={resultForm.date} onChange={(e) => setResultForm({...resultForm, date: e.target.value})} InputLabelProps={{ shrink: true }} required />
          <Button type="submit" variant="contained" color="primary">{editResultIndex !== null ? 'Update' : 'Add'}</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Home Team</TableCell>
                <TableCell>Away Team</TableCell>
                <TableCell>Home Score</TableCell>
                <TableCell>Away Score</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result, idx) => (
                <TableRow key={idx}>
                  <TableCell>{result.homeTeam}</TableCell>
                  <TableCell>{result.awayTeam}</TableCell>
                  <TableCell>{result.homeScore}</TableCell>
                  <TableCell>{result.awayScore}</TableCell>
                  <TableCell>{result.date}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => {
                      setResultForm(result);
                      setEditResultIndex(idx);
                    }}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => {
                      setResults(results.filter((_, i) => i !== idx));
                      if (editResultIndex === idx) setEditResultIndex(null);
                    }}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
              {standings.map((standing, idx) => (
                <TableRow key={idx}>
                  <TableCell>{standing.team}</TableCell>
                  <TableCell>{standing.played}</TableCell>
                  <TableCell>{standing.won}</TableCell>
                  <TableCell>{standing.drawn}</TableCell>
                  <TableCell>{standing.lost}</TableCell>
                  <TableCell>{standing.points}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => {
                      setStandingForm(standing);
                      setEditStandingIndex(idx);
                    }}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => {
                      setStandings(standings.filter((_, i) => i !== idx));
                      if (editStandingIndex === idx) setEditStandingIndex(null);
                    }}><DeleteIcon /></IconButton>
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