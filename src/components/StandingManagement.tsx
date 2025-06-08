import React from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StandingManagement = ({ standings, standingForm, editStandingIndex, handleStandingInputChange, handleStandingSubmit, handleStandingEdit, handleDeleteStanding, setStandingForm, initialStandingForm, clubs }: any) => (
  <>
    <Typography variant="h4" gutterBottom sx={{ color: '#37003c', fontWeight: 'bold' }}>Standing Management</Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ bgcolor: '#37003c' }}>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>ID</TableCell>
            <TableCell sx={{ color: 'white' }}>Team ID</TableCell>
            <TableCell sx={{ color: 'white' }}>Team Name</TableCell>
            <TableCell sx={{ color: 'white' }}>Played</TableCell>
            <TableCell sx={{ color: 'white' }}>Won</TableCell>
            <TableCell sx={{ color: 'white' }}>Drawn</TableCell>
            <TableCell sx={{ color: 'white' }}>Lost</TableCell>
            <TableCell sx={{ color: 'white' }}>Points</TableCell>
            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {standings.map((standing: any, idx: number) => (
            <TableRow key={standing.id || idx} hover>
              <TableCell>{standing.id}</TableCell>
              <TableCell>{standing.team?.id}</TableCell>
              <TableCell>{standing.team?.name || '-'}</TableCell>
              <TableCell>{standing.played}</TableCell>
              <TableCell>{standing.won}</TableCell>
              <TableCell>{standing.drawn}</TableCell>
              <TableCell>{standing.lost}</TableCell>
              <TableCell>{standing.points}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleStandingEdit(idx)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteStanding(idx)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

export default StandingManagement; 