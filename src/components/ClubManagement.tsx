import React from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ClubManagement = ({ clubs, stadiums, clubForm, editClubIndex, handleClubInputChange, handleClubSubmit, handleEditClub, handleDeleteClub, setClubForm, initialClubForm }: any) => (
  <>
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
              <TextField label="Link logo CLB" name="logo" value={clubForm.logo || ''} onChange={handleClubInputChange} />
              <TextField label="Capacity" name="capacity" type="number" value={clubForm.capacity} onChange={handleClubInputChange} required />
              <Button type="submit" variant="contained" color="primary" sx={{ bgcolor: '#37003c', '&:hover': { bgcolor: '#4a0052' } }}>
                {editClubIndex !== null ? 'Update Club' : 'Add Club'}
              </Button>
              {editClubIndex !== null && (
                <Button variant="text" color="secondary" onClick={() => { setClubForm(initialClubForm); }}>
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
                <TableCell sx={{ color: 'white' }}>Club Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Founded Year</TableCell>
                <TableCell sx={{ color: 'white' }}>Location</TableCell>
                <TableCell sx={{ color: 'white' }}>Manager</TableCell>
                <TableCell sx={{ color: 'white' }}>Website</TableCell>
                <TableCell sx={{ color: 'white' }}>Logo</TableCell>
                <TableCell sx={{ color: 'white' }}>Capacity</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clubs.map((club: any, idx: number) => (
                <TableRow key={club.id || idx} hover>
                  <TableCell>{club.id}</TableCell>
                  <TableCell>{club.name}</TableCell>
                  <TableCell>{club.foundedYear}</TableCell>
                  <TableCell>{club.location}</TableCell>
                  <TableCell>{club.manager}</TableCell>
                  <TableCell>{club.website || '-'}</TableCell>
                  <TableCell>{club.logo ? (<img src={club.logo} alt="Logo" style={{ width: 50, height: 50, objectFit: 'cover' }} />) : '-'}</TableCell>
                  <TableCell>{club.capacity}</TableCell>
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
  </>
);

export default ClubManagement; 