import { Box, Container, Typography, Tabs, Tab, Paper, Select, MenuItem, FormControl, Divider, Button, Grid, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StadiumIcon from '@mui/icons-material/Stadium';
import { useState } from 'react';
import plmainlogo from '../assets/image-removebg-preview.png';

const resultsData = [
    {
        date: 'Tuesday 6 May 2025',
        matches: [
            {
                home: { name: 'Crystal Palace', logo: 'https://resources.premierleague.com/premierleague/badges/t31.png' },
                away: { name: "Nott'm Forest", logo: 'https://resources.premierleague.com/premierleague/badges/t17.png' },
                score: '1 - 1',
                stadium: 'Selhurst Park, London',
            },
        ],
    },
    {
        date: 'Sunday 4 May 2025',
        matches: [
            {
                home: { name: 'Brentford', logo: 'https://resources.premierleague.com/premierleague/badges/t94.png' },
                away: { name: 'Man Utd', logo: 'https://resources.premierleague.com/premierleague/badges/t1.png' },
                score: '4 - 3',
                stadium: 'Gtech Community Stadium, Brentford',
            },
            {
                home: { name: 'Brighton', logo: 'https://resources.premierleague.com/premierleague/badges/t36.png' },
                away: { name: 'Newcastle', logo: 'https://resources.premierleague.com/premierleague/badges/t4.png' },
                score: '1 - 1',
                stadium: 'American Express Stadium, Falmer',
            },
            {
                home: { name: 'West Ham', logo: 'https://resources.premierleague.com/premierleague/badges/t21.png' },
                away: { name: 'Spurs', logo: 'https://resources.premierleague.com/premierleague/badges/t6.png' },
                score: '1 - 1',
                stadium: 'London Stadium, London',
            },
            {
                home: { name: 'Chelsea', logo: 'https://resources.premierleague.com/premierleague/badges/t8.png' },
                away: { name: 'Liverpool', logo: 'https://resources.premierleague.com/premierleague/badges/t14.png' },
                score: '3 - 1',
                stadium: 'Stamford Bridge, London',
            },
        ],
    },
    {
        date: 'Saturday 3 May 2025',
        matches: [
            {
                home: { name: 'Man City', logo: 'https://resources.premierleague.com/premierleague/badges/t43.png' },
                away: { name: 'Wolves', logo: 'https://resources.premierleague.com/premierleague/badges/t39.png' },
                score: '1 - 0',
                stadium: 'Etihad Stadium, Manchester',
            },
        ],
    },
];
const Results = () => {
    const [tab, setTab] = useState(0);
    return (
        <Box>
            {/* Banner */}
            <Box sx={{
                width: '100%',
                minHeight: 120,
                background: 'linear-gradient(90deg, #3bb4e5 0%, #7b3fe4 100%)',
                px: 4, py: 3,
                display: 'flex', alignItems: 'flex-end'
            }}>
                <Typography variant="h2" sx={{ color: '#fff', fontWeight: 900 }}>Results</Typography>
            </Box>

            <Container maxWidth="lg" sx={{ mt: 2 }}>
                {/* Tabs */}
                <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
                    <Tab label="First Team" />
                    <Tab label="PL2" />
                    <Tab label="U18" />
                </Tabs>

                {/* Bộ lọc */}
                <Paper sx={{ p: 2, mb: 3, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControl size="small">
                        <Select value="Premier League" sx={{ minWidth: 160, color: '#37003c' }}>
                            <MenuItem value="Premier League">Premier League</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <Select value="2024/25" sx={{ minWidth: 120, color: '#37003c' }}>
                            <MenuItem value="2024/25">2024/25</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <Select value="All Clubs" sx={{ minWidth: 120, color: '#37003c' }}>
                            <MenuItem value="All Clubs">All Clubs</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ flex: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ReplayIcon sx={{ color: '#37003c' }} />
                        <Typography sx={{ color: '#37003c', fontWeight: 500, cursor: 'pointer' }}>RESET FILTERS</Typography>
                    </Box>
                    <Button variant="outlined" startIcon={<CalendarMonthIcon />} sx={{ borderRadius: 2, fontWeight: 500 }}>
                        Add fixtures to calendar
                    </Button>
                </Paper>

                {/* Lịch thi đấu */}
                {resultsData.map((day, idx) => (
                    <Box key={idx} sx={{ mb: 3 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                mb: 1,
                                mt: 2
                            }}
                        >
                            <Typography sx={{ fontWeight: 700, color: '#37003c' }}>
                                {day.date}
                            </Typography>
                            <img
                                src={plmainlogo}
                                alt="Premier League"
                                width={170}
                                style={{
                                    marginLeft: 'auto',
                                    objectFit: 'contain',
                                    height: '100%', // nếu container có chiều cao cố định
                                    display: 'block'
                                }}
                            />
                        </Box>

                        <Paper sx={{ p: 2, background: 'transparent', boxShadow: 'none' }}>
                            {day.matches.map((match, mIdx) => (
                                <Box
                                    key={mIdx}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 1,
                                        borderRadius: 2,
                                        background: 'transparent',
                                        color: '#37003c',
                                        px: 0,
                                        py: 1,
                                        transition: 'background 0.2s, color 0.2s',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            background: 'linear-gradient(90deg, #3bb4e5 0%, #7b3fe4 100%)',
                                            color: '#fff',
                                            '& .stadium-icon': {
                                                color: '#fff',
                                            },
                                        },
                                    }}
                                >
                                    {/* Home team */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 180, maxWidth: 220, flex: '0 0 200px', justifyContent: 'flex-end', textAlign: 'right' }}>
                                        <Typography sx={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {match.home.name}
                                        </Typography>
                                        <img src={match.home.logo} alt={match.home.name} width={28} style={{ marginLeft: 8 }} />
                                    </Box>
                                    {/* Score */}
                                    <Box
                                        className="score-box"
                                        sx={{
                                            mx: 2,
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 1,
                                            background: '#37003c',
                                            color: '#e5e5fa',
                                            fontWeight: 700,
                                            minWidth: 56,
                                            maxWidth: 70,
                                            textAlign: 'center',
                                            transition: 'background 0.2s, color 0.2s',
                                            flex: '0 0 70px'
                                        }}
                                    >
                                        {match.score}
                                    </Box>
                                    {/* Away team */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 180, maxWidth: 220, flex: '0 0 200px' }}>
                                        <img src={match.away.logo} alt={match.away.name} width={28} style={{ marginRight: 8 }} />
                                        <Typography sx={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {match.away.name}
                                        </Typography>
                                    </Box>
                                    {/* Stadium */}
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flex: '1 1 300px',
                                        color: 'inherit',
                                        fontSize: 14,
                                        minWidth: 200,
                                        maxWidth: 400,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        <StadiumIcon className="stadium-icon" sx={{ fontSize: 18, color: '#37003c', mr: 0.5 }} />
                                        {match.stadium}
                                    </Box>

                                    {/* Arrow */}
                                    <IconButton sx={{ color: 'inherit', ml: 'auto' }}>
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Paper>
                    </Box>
                ))}
            </Container>
        </Box>
    );
};
export default Results;