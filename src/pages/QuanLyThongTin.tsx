import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
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

const QuanLyThongTin = () => {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [players, setPlayers] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

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

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Tabs value={tab} onChange={handleChange} centered>
        <Tab label="Players" />
        <Tab label="Clubs" />
        <Tab label="Stadiums" />
        <Tab label="Fixtures" />
        <Tab label="Results" />
        <Tab label="Standings" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <Typography variant="h6" gutterBottom>Player Management</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleInputChange} required />
          <TextField label="Date of Birth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleInputChange} InputLabelProps={{ shrink: true }} required />
          <TextField label="Nationality" name="nationality" value={form.nationality} onChange={handleInputChange} required />
          <TextField label="Position" name="positionPlayer" value={form.positionPlayer} onChange={handleInputChange} required />
          <TextField label="Club" name="club" value={form.club} onChange={handleInputChange} required />
          <Button type="submit" variant="contained" color="primary">{editIndex !== null ? 'Update' : 'Add'}</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Nationality</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Club</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((p, idx) => (
                <TableRow key={idx}>
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
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Typography>Quản lý đội (đang phát triển)</Typography>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Typography>Quản lý sân vận động (đang phát triển)</Typography>
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <Typography>Quản lý lịch thi đấu (đang phát triển)</Typography>
      </TabPanel>
      <TabPanel value={tab} index={4}>
        <Typography>Quản lý kết quả (đang phát triển)</Typography>
      </TabPanel>
      <TabPanel value={tab} index={5}>
        <Typography>Quản lý bảng xếp hạng (đang phát triển)</Typography>
      </TabPanel>
      <Partners />
    </Box>
  );
};

export default QuanLyThongTin; 