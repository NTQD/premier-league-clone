import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button, MenuItem, Select, Card, CardContent, CardMedia, Chip } from '@mui/material';
import Partners from '../components/Partners';

const mockAwards = [
  {
    month: 'April 2025',
    awards: [
      {
        type: 'Player of the Month',
        name: 'Mac Allister',
        club: 'Liverpool',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p243016.png',
        color: '#d91a2a',
        date: '26/04/2025',
        stats: {
          goals: 2,
          assists: 1,
          wins: 4,
          position: 'Midfielder',
          firstName: 'Alexis',
        },
      },
      {
        type: 'Manager of the Month',
        name: 'Vítor Manuel de Oliveira Lopes Pereira',
        club: 'West Ham',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/man40855.png',
        color: '#00a19b',
        date: '26/04/2025',
        stats: {
          played: 5,
          wins: 5,
          goals: 11,
          position: 'Manager',
          firstName: 'Vítor',
        },
      },
      {
        type: 'Goal of the Month',
        name: 'Carlos Baleba',
        club: 'Brighton',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p535301.png',
        color: '#1e90ff',
        date: '26/04/2025',
        stats: {
          versus: 'West Ham',
          date: '26/04/2025',
          position: 'Midfielder',
          firstName: 'Carlos',
        },
      },
      {
        type: 'Save of the Month',
        name: 'David Raya',
        club: 'Man Utd',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p154561.png',
        color: '#f7c325',
        date: '26/04/2025',
        stats: {
          saves: 8,
          cleanSheets: 2,
          position: 'Goalkeeper',
          firstName: 'David',
        },
      },
    ],
  },
  {
    month: 'March 2025',
    awards: [
      {
        type: 'Player of the Month',
        name: 'Bruno Fernandes',
        club: 'Man Utd',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png',
        color: '#d91a2a',
        date: '15/03/2025',
        stats: {
          goals: 3,
          assists: 2,
          wins: 3,
          position: 'Midfielder',
          firstName: 'Bruno',
        },
      },
      {
        type: 'Manager of the Month',
        name: 'Nuno Herlander Simões Espírito Santo',
        club: 'Wolves',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/man41809.png',
        color: '#222',
        date: '15/03/2025',
        stats: {
          played: 4,
          wins: 4,
          goals: 9,
          position: 'Manager',
          firstName: 'Nuno',
        },
      },
      {
        type: 'Goal of the Month',
        name: 'Jens Cajuste',
        club: 'Nottingham Forest',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p454667.png',
        color: '#1e90ff',
        date: '15/03/2025',
        stats: {
          versus: 'Chelsea',
          date: '15/03/2025',
          position: 'Midfielder',
          firstName: 'Jens',
        },
      },
      {
        type: 'Save of the Month',
        name: 'David Raya',
        club: 'Man Utd',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p154561.png',
        color: '#f7c325',
        date: '01/03/2025',
        stats: {
          saves: 7,
          cleanSheets: 1,
          position: 'Goalkeeper',
          firstName: 'David',
        },
      },
    ],
  },
  {
    month: 'February 2025',
    awards: [
      {
        type: 'Player of the Month',
        name: 'Mohamed Salah',
        club: 'Liverpool',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p118748.png',
        color: '#d91a2a',
        date: '28/02/2025',
        stats: {
          goals: 4,
          assists: 1,
          wins: 4,
          position: 'Forward',
          firstName: 'Mohamed',
        },
      },
      {
        type: 'Manager of the Month',
        name: 'David Moyes',
        club: 'West Ham',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/man85.png',
        color: '#00a19b',
        date: '28/02/2025',
        stats: {
          played: 4,
          wins: 3,
          goals: 8,
          position: 'Manager',
          firstName: 'David',
        },
      },
      {
        type: 'Goal of the Month',
        name: 'Kaoru Mitoma',
        club: 'Brighton',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p451340.png',
        color: '#1e90ff',
        date: '28/02/2025',
        stats: {
          versus: 'Arsenal',
          date: '28/02/2025',
          position: 'Midfielder',
          firstName: 'Kaoru',
        },
      },
      {
        type: 'Save of the Month',
        name: 'Kepa',
        club: 'Wolves',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p109745.png',
        color: '#f7c325',
        date: '28/02/2025',
        stats: {
          saves: 6,
          cleanSheets: 2,
          position: 'Goalkeeper',
          firstName: 'Kepa',
        },
      },
    ],
  },
  {
    month: 'January 2025',
    awards: [
      {
        type: 'Player of the Month',
        name: 'Memphis Depay',
        club: 'Bournemouth',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p222683.png',
        color: '#d91a2a',
        date: '31/01/2025',
        stats: {
          goals: 3,
          assists: 2,
          wins: 3,
          position: 'Forward',
          firstName: 'Justin',
        },
      },
      {
        type: 'Manager of the Month',
        name: 'Andoni Iraola',
        club: 'Bournemouth',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/man50428.png',
        color: '#00a19b',
        date: '31/01/2025',
        stats: {
          played: 4,
          wins: 3,
          goals: 7,
          position: 'Manager',
          firstName: 'Andoni',
        },
      },
      {
        type: 'Goal of the Month',
        name: 'Jake Brooks',
        club: 'Bournemouth',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p111317.png',
        color: '#1e90ff',
        date: '31/01/2025',
        stats: {
          versus: 'Liverpool',
          date: '31/01/2025',
          position: 'Midfielder',
          firstName: 'David',
        },
      },
      {
        type: 'Save of the Month',
        name: 'Martin Dubravka',
        club: 'Wolves',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p67089.png',
        color: '#f7c325',
        date: '31/01/2025',
        stats: {
          saves: 5,
          cleanSheets: 1,
          position: 'Goalkeeper',
          firstName: 'Martin',
        },
      },
    ],
  },
  {
    month: 'December 2024',
    awards: [
      {
        type: 'Player of the Month',
        name: 'Alexander Isak',
        club: 'Newcastle United ',
        img: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p219168.png',
        color: '#d91a2a',
        date: '31/12/2024',
        stats: {
          goals: 2,
          assists: 1,
          wins: 2,
          position: 'Forward',
          firstName: 'Alexander',
        },
      },
      {
        type: 'Manager of the Month',
        name: 'Nuno Herlander Simões Espírito Santo',
        club: 'Wolves',
        img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/man41809.png',
        color: '#222',
        date: '31/12/2024',
        stats: {
          played: 5,
          wins: 4,
          goals: 10,
          position: 'Manager',
          firstName: 'Nuno',
        },
      },
      {
        type: 'Goal of the Month',
        name: 'Alexander Isak',
        club: 'Newcastle',
        img: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p219168.png',
        color: '#1e90ff',
        date: '31/12/2024',
        stats: {
          versus: 'Man City',
          date: '31/12/2024',
          position: 'Forward',
          firstName: 'Alexander',
        },
      },
      {
        type: 'Save of the Month',
        name: 'Emiliano Martínez',
        club: 'Aston Villa',
        img: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p98980.png',
        color: '#f7c325',
        date: '31/12/2024',
        stats: {
          saves: 6,
          cleanSheets: 2,
          position: 'Goalkeeper',
          firstName: 'Emiliano',
        },
      },
    ],
  },
  // ...các tháng khác tương tự, có thể thêm Young Player, Save of the Month...
];

const monthOptions = ['All Months', ...mockAwards.map(a => a.month)];

const Awards = () => {
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);
  
  let awardsToShow: any[] = [];
  let groupedByMonth: { month: string, awards: any[] }[] = [];
  if (selectedMonth === 'All Months') {
    groupedByMonth = mockAwards
      .map(a => ({ month: a.month, awards: a.awards }));
  } else {
    const currentAwards = mockAwards.find(a => a.month === selectedMonth);
    awardsToShow = currentAwards ? currentAwards.awards.map(award => ({...award, month: currentAwards.month})) : [];
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'white', minHeight: '100vh' }}>
      {/* Header gradient */}
      <Box
        sx={{
          width: '100%',
          minHeight: 160,
          background: 'linear-gradient(120deg, #4fc3f7 0%, #7b5cff 100%)',
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, md: 8 },
          mb: 4,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: 'white',
            fontWeight: 900,
            fontSize: { xs: '2.5rem', md: '4rem' },
            lineHeight: 1.1,
            mr: 4,
          }}
        >
          Awards
        </Typography>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            sx={{
              bgcolor: 'white',
              borderRadius: 2,
              minWidth: 180,
              fontWeight: 700,
              fontSize: 18,
              boxShadow: 1,
            }}
          >
            {monthOptions.map(month => (
              <MenuItem value={month} key={month}>{month}</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      {/* Awards cards */}
      <Container maxWidth={false} sx={{ maxWidth: 1440, py: 2 }}>
        {selectedMonth === 'All Months' ? (
          groupedByMonth.map((group, i) => (
            <Box key={group.month} sx={{ mb: 6 }}>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, color: '#333' }}>{group.month}</Typography>
              <Grid container spacing={3}>
                {group.awards.map((award, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Card sx={{
                      bgcolor: award.color,
                      color: '#fff',
                      borderRadius: 3,
                      boxShadow: 3,
                      overflow: 'hidden',
                      minHeight: 320,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      height: 340,
                      maxHeight: 340,
                    }}>
                      <CardMedia
                        component="img"
                        image={award.img}
                        alt={award.name}
                        sx={{
                          height: '100%',
                          width: '50%',
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          objectFit: 'contain',
                          objectPosition: 'center',
                          padding: '20px',
                        }}
                      />
                      <CardContent sx={{ 
                        flex: 1,
                        width: '50%',
                        position: 'relative',
                        zIndex: 1,
                      }}>
                        <Chip label={award.type} sx={{ bgcolor: '#fff', color: award.color, fontWeight: 700, mb: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>{award.name}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{award.club}</Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>{award.date}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        ) : (
          awardsToShow.map((award, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{
                bgcolor: award.color,
                color: '#fff',
                borderRadius: 3,
                boxShadow: 3,
                overflow: 'hidden',
                minHeight: 320,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                height: 340,
                maxHeight: 340,
              }}>
                <CardMedia
                  component="img"
                  image={award.img}
                  alt={award.name}
                  sx={{
                    height: '100%',
                    width: '50%',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    objectFit: 'contain',
                    objectPosition: 'center',
                    padding: '20px',
                  }}
                />
                <CardContent sx={{ 
                  flex: 1,
                  width: '50%',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  <Chip label={award.type} sx={{ bgcolor: '#fff', color: award.color, fontWeight: 700, mb: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>{award.name}</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{award.club}</Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>{award.date}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Container>
      <Partners />
    </Box>
  );
};

export default Awards; 