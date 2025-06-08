import React from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PlayerManagement = ({ players, clubs, form, editIndex, handleInputChange, handleSubmit, handleEdit, handleDelete, setForm, initialForm }: any) => (
  <>
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
              <TextField label="Position" name="position" value={form.position} onChange={handleInputChange} required />
              <FormControl fullWidth required>
                <InputLabel>Chọn CLB</InputLabel>
                <Select
                  name="clubId"
                  value={form.clubId}
                  label="Chọn CLB"
                  onChange={handleInputChange}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  {clubs.map((club: any) => (
                    <MenuItem key={club.id} value={club.id}>{club.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField label="Link ảnh cầu thủ" name="avatar" value={form.avatar || ''} onChange={handleInputChange} />
              <TextField label="Link ảnh quốc kỳ" name="flag" value={form.flag || ''} onChange={handleInputChange} />
              <Button type="submit" variant="contained" color="primary" sx={{ bgcolor: '#37003c', '&:hover': { bgcolor: '#4a0052' } }}>
                {editIndex !== null ? 'Update Player' : 'Add Player'}
              </Button>
              {editIndex !== null && (
                <Button variant="text" color="secondary" onClick={() => { setForm(initialForm); }}>
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
              {players.map((p: any, idx: number) => (
                <TableRow key={p.id || idx} hover>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.dateOfBirth}</TableCell>
                  <TableCell>{p.nationality}</TableCell>
                  <TableCell>{p.position}</TableCell>
                  <TableCell>{p.club?.id}</TableCell>
                  <TableCell>{p.avatar ? (<img src={p.avatar} alt="Player" style={{ width: 50, height: 50, objectFit: 'cover' }} />) : '-'}</TableCell>
                  <TableCell>{p.flag ? (<img src={p.flag} alt="Flag" style={{ width: 50, height: 50, objectFit: 'cover' }} />) : '-'}</TableCell>
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
  </>
);

export default PlayerManagement; 