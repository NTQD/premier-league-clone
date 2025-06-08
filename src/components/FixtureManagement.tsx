import React from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

// Định nghĩa interface cho Fixture để type checking
interface Fixture {
  id?: number;
  homeTeam: { id: number };
  awayTeam: { id: number };
  date: string;
  time: string;
  stadiumName: string | null;
  homeScore: number | null;
  awayScore: number | null;
  competition: string;
  matchweek: number;
  status: string;
}

const FixtureManagement = ({ fixtures, fixtureForm, editFixtureIndex, handleFixtureInputChange, handleFixtureSubmit, handleFixtureEdit, handleDeleteFixture, setFixtureForm, initialFixtureForm, clubs }: any) => (
  <>
    <Typography variant="h4" gutterBottom sx={{ color: '#37003c', fontWeight: 'bold' }}>Fixture and Result Management</Typography>
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Add New Fixture</Typography>
            <Box component="form" onSubmit={handleFixtureSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Date" name="date" type="date" value={fixtureForm.date} onChange={handleFixtureInputChange} InputLabelProps={{ shrink: true }} required />
              <TextField label="Time" name="time" type="time" value={fixtureForm.time} onChange={handleFixtureInputChange} InputLabelProps={{ shrink: true }} required />
              <FormControl fullWidth required>
                <InputLabel>Home Team</InputLabel>
                <Select
                  name="homeTeamId"
                  value={fixtureForm.homeTeamId}
                  label="Home Team"
                  onChange={handleFixtureInputChange}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  {Array.isArray(clubs) && clubs.map((club: any) => (
                    <MenuItem key={club.id} value={club.id}>{club.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>Away Team</InputLabel>
                <Select
                  name="awayTeamId"
                  value={fixtureForm.awayTeamId}
                  label="Away Team"
                  onChange={handleFixtureInputChange}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  {clubs.map((club: any) => (
                    <MenuItem key={club.id} value={club.id}>{club.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField label="Stadium Name" name="stadiumName" value={fixtureForm.stadiumName} onChange={handleFixtureInputChange} />
              <TextField label="Home Score" name="homeScore" type="number" value={fixtureForm.homeScore} onChange={handleFixtureInputChange} inputProps={{ min: 0, step: 1 }} />
              <TextField label="Away Score" name="awayScore" type="number" value={fixtureForm.awayScore} onChange={handleFixtureInputChange} inputProps={{ min: 0, step: 1 }} />
              <TextField label="Competition" name="competition" value={fixtureForm.competition} onChange={handleFixtureInputChange} required />
              <TextField label="Matchweek" name="matchweek" type="number" value={fixtureForm.matchweek} onChange={handleFixtureInputChange} required />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={fixtureForm.status}
                  label="Status"
                  onChange={(e) => setFixtureForm({...fixtureForm, status: e.target.value})}
                >
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                  <MenuItem value="Live">Live</MenuItem>
                  <MenuItem value="Finished">Finished</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" color="primary" sx={{ bgcolor: '#37003c', '&:hover': { bgcolor: '#4a0052' } }}>
                {editFixtureIndex !== null ? 'Update Fixture' : 'Add Fixture'}
              </Button>
              {editFixtureIndex !== null && (
                <Button variant="text" color="secondary" onClick={() => { setFixtureForm(initialFixtureForm); }}>
                  Hủy chỉnh sửa
                </Button>
              )}
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
                <TableCell sx={{ color: 'white' }}>Home Team</TableCell>
                <TableCell sx={{ color: 'white' }}>Home Score</TableCell>
                <TableCell sx={{ color: 'white' }}>Away Score</TableCell>
                <TableCell sx={{ color: 'white' }}>Away Team</TableCell>
                <TableCell sx={{ color: 'white' }}>Stadium</TableCell>
                <TableCell sx={{ color: 'white' }}>Competition</TableCell>
                <TableCell sx={{ color: 'white' }}>Matchweek</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fixtures.map((fixture: any, idx: number) => (
                <TableRow key={fixture.id || idx} hover>
                  <TableCell>{fixture.id}</TableCell>
                  <TableCell>{fixture.date}</TableCell>
                  <TableCell>{fixture.time}</TableCell>
                  <TableCell>{fixture.homeTeam?.name || '-'}</TableCell>
                  <TableCell>{fixture.homeScore !== null ? fixture.homeScore : '-'}</TableCell>
                  <TableCell>{fixture.awayScore !== null ? fixture.awayScore : '-'}</TableCell>
                  <TableCell>{fixture.awayTeam?.name || '-'}</TableCell>
                  <TableCell>{fixture.stadiumName || '-'}</TableCell>
                  <TableCell>{fixture.competition}</TableCell>
                  <TableCell>{fixture.matchweek}</TableCell>
                  <TableCell>{fixture.status}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleFixtureEdit(idx)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteFixture(idx)}>
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
  </>
);

// Sửa lại initialFixtureForm
const initialFixtureForm = {
  date: '',
  time: '',
  homeTeamId: '',
  awayTeamId: '',
  stadiumName: '',
  homeScore: '',
  awayScore: '',
  competition: 'Premier League',
  matchweek: '',
  status: 'Scheduled'
};

// Sửa lại hàm handleFixtureSubmit
const handleFixtureSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  console.log('Form data before submit:', fixtureForm);
  
  if (!fixtureForm.homeTeamId || !fixtureForm.awayTeamId) {
    alert("Bạn phải chọn cả Home Team và Away Team!");
    return;
  }

  // Tạo object dữ liệu khớp với entity Fixture
  const fixtureData: Fixture = {
    homeTeam: { 
      id: parseInt(fixtureForm.homeTeamId)
    },
    awayTeam: { 
      id: parseInt(fixtureForm.awayTeamId)
    },
    date: fixtureForm.date, // Backend sẽ parse thành LocalDate
    time: fixtureForm.time, // Backend sẽ parse thành LocalTime
    stadiumName: fixtureForm.stadiumName || null, // Cho phép null
    homeScore: fixtureForm.homeScore ? parseInt(fixtureForm.homeScore) : null, // Cho phép null
    awayScore: fixtureForm.awayScore ? parseInt(fixtureForm.awayScore) : null, // Cho phép null
    competition: fixtureForm.competition,
    matchweek: parseInt(fixtureForm.matchweek),
    status: fixtureForm.status
  };

  console.log('Data being sent to server:', fixtureData);

  try {
    if (editFixtureIndex !== null) {
      const fixtureId = fixtures[editFixtureIndex].id;
      const response = await axios.put(`/api/fixtures/${fixtureId}`, fixtureData);
      console.log('Update response:', response.data);
    } else {
      const response = await axios.post('/api/fixtures', fixtureData);
      console.log('Create response:', response.data);
    }
    const updatedFixtures = await fixtureService.getAllFixtures();
    setFixtures(updatedFixtures);
    setEditFixtureIndex(null);
    setFixtureForm(initialFixtureForm);
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    alert('Có lỗi xảy ra khi lưu fixture. Vui lòng kiểm tra console để biết thêm chi tiết.');
  }
};

const handleFixtureInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
  const { name, value } = e.target;
  
  console.log('Input change:', { 
    field: name, 
    value: value, 
    type: typeof value,
    currentForm: fixtureForm 
  });
  
  setFixtureForm(prev => {
    const newForm = {
      ...prev,
      [name as string]: value
    };
    console.log('Updated form:', newForm);
    return newForm;
  });
};

// Sửa lại hàm handleFixtureEdit
const handleFixtureEdit = (idx: number) => {
  const fixtureToEdit = fixtures[idx];
  console.log('Editing fixture:', fixtureToEdit);
  
  setFixtureForm({
    date: fixtureToEdit.date,
    time: fixtureToEdit.time,
    homeTeamId: fixtureToEdit.homeTeam.id.toString(),
    awayTeamId: fixtureToEdit.awayTeam.id.toString(),
    stadiumName: fixtureToEdit.stadiumName || '',
    homeScore: fixtureToEdit.homeScore?.toString() || '',
    awayScore: fixtureToEdit.awayScore?.toString() || '',
    competition: fixtureToEdit.competition,
    matchweek: fixtureToEdit.matchweek?.toString() || '',
    status: fixtureToEdit.status
  });
  setEditFixtureIndex(idx);
};

export default FixtureManagement; 