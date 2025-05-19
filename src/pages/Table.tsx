import React from 'react';
import {
  Box, Container, Typography, Table as MuiTable, TableBody, TableCell, TableHead, TableRow, Button, Stack, MenuItem, Select, FormControl, Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Partners from '../components/Partners';

// Sample data structure (replace with database data)
const tableData = [
  { 
    position: 1, 
    club: 'Liverpool', 
    played: 36, 
    won: 25, 
    drawn: 8, 
    lost: 3, 
    gf: 83, 
    ga: 37, 
    gd: 46, 
    points: 83, 
    form: ['W', 'W', 'W', 'L', 'D'], 
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t14@x2.png', 
    nextMatch: 'https://resources.premierleague.com/premierleague/badges/20/t36@x2.png' 
  },
  { 
    position: 2, 
    club: 'Arsenal', 
    played: 36, 
    won: 18, 
    drawn: 14, 
    lost: 4, 
    gf: 66, 
    ga: 33, 
    gd: 33, 
    points: 68, 
    form: ['D', 'W', 'D', 'L', 'D'], 
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t3@x2.png', 
    nextMatch: 'https://resources.premierleague.com/premierleague/badges/20/t20@x2.png' 
  },
  { 
    position: 3, 
    club: 'Newcastle United', 
    played: 36, 
    won: 20, 
    drawn: 6, 
    lost: 10, 
    gf: 68, 
    ga: 45, 
    gd: 23, 
    points: 66, 
    form: ['W', 'L', 'W', 'D', 'W'], 
    logo: '/images/clubs/newcastle.png', 
    nextMatch: '/images/clubs/brighton.png' 
  },
  { 
    position: 4, 
    club: 'Chelsea', 
    played: 37, 
    won: 19, 
    drawn: 9, 
    lost: 9, 
    gf: 63, 
    ga: 43, 
    gd: 20, 
    points: 66, 
    form: ['W', 'W', 'W', 'L', 'W'], 
    logo: '/images/clubs/chelsea.png', 
    nextMatch: '/images/clubs/bournemouth.png' 
  },
  { 
    position: 5, 
    club: 'Aston Villa', 
    played: 37, 
    won: 19, 
    drawn: 9, 
    lost: 9, 
    gf: 58, 
    ga: 49, 
    gd: 9, 
    points: 66, 
    form: ['W', 'L', 'W', 'W', 'W'], 
    logo: '/images/clubs/aston-villa.png', 
    nextMatch: '/images/clubs/crystal-palace.png' 
  },
  { 
    position: 6, 
    club: 'Manchester City', 
    played: 36, 
    won: 19, 
    drawn: 8, 
    lost: 9, 
    gf: 67, 
    ga: 43, 
    gd: 24, 
    points: 65, 
    form: ['W', 'W', 'W', 'W', 'D'], 
    logo: '/images/clubs/manchester-city.png', 
    nextMatch: '/images/clubs/liverpool.png' 
  },
  { 
    position: 7, 
    club: 'Nottingham Forest', 
    played: 36, 
    won: 18, 
    drawn: 8, 
    lost: 10, 
    gf: 56, 
    ga: 44, 
    gd: 12, 
    points: 62, 
    form: ['L', 'W', 'L', 'D', 'D'], 
    logo: '/images/clubs/nottingham-forest.png', 
    nextMatch: '/images/clubs/chelsea.png' 
  },
  { 
    position: 8, 
    club: 'Brentford', 
    played: 36, 
    won: 16, 
    drawn: 7, 
    lost: 13, 
    gf: 63, 
    ga: 53, 
    gd: 10, 
    points: 55, 
    form: ['D', 'W', 'W', 'W', 'W'], 
    logo: '/images/clubs/brentford.png', 
    nextMatch: '/images/clubs/fulham.png' 
  },
  { 
    position: 9, 
    club: 'Brighton And Hove Albion', 
    played: 36, 
    won: 14, 
    drawn: 13, 
    lost: 9, 
    gf: 59, 
    ga: 56, 
    gd: 3, 
    points: 55, 
    form: ['D', 'L', 'W', 'D', 'W'], 
    logo: '/images/clubs/brighton.png', 
    nextMatch: '/images/clubs/newcastle.png' 
  },
  { 
    position: 10, 
    club: 'Bournemouth', 
    played: 36, 
    won: 14, 
    drawn: 11, 
    lost: 11, 
    gf: 55, 
    ga: 43, 
    gd: 12, 
    points: 53, 
    form: ['W', 'D', 'D', 'W', 'L'], 
    logo: '/images/clubs/bournemouth.png', 
    nextMatch: '/images/clubs/chelsea.png' 
  },
  { 
    position: 11, 
    club: 'Fulham', 
    played: 36, 
    won: 14, 
    drawn: 9, 
    lost: 13, 
    gf: 51, 
    ga: 50, 
    gd: 1, 
    points: 51, 
    form: ['L', 'L', 'W', 'L', 'L'], 
    logo: '/images/clubs/fulham.png', 
    nextMatch: '/images/clubs/brentford.png' 
  },
  { 
    position: 12, 
    club: 'Crystal Palace', 
    played: 36, 
    won: 12, 
    drawn: 13, 
    lost: 11, 
    gf: 46, 
    ga: 48, 
    gd: -2, 
    points: 49, 
    form: ['L', 'D', 'D', 'D', 'W'], 
    logo: '/images/clubs/crystal-palace.png', 
    nextMatch: '/images/clubs/aston-villa.png' 
  },
  { 
    position: 13, 
    club: 'Everton', 
    played: 36, 
    won: 9, 
    drawn: 15, 
    lost: 12, 
    gf: 39, 
    ga: 44, 
    gd: -5, 
    points: 42, 
    form: ['W', 'L', 'L', 'D', 'W'], 
    logo: '/images/clubs/everton.png', 
    nextMatch: '/images/clubs/arsenal.png' 
  },
  { 
    position: 14, 
    club: 'Wolverhampton Wanderers', 
    played: 36, 
    won: 12, 
    drawn: 5, 
    lost: 19, 
    gf: 51, 
    ga: 64, 
    gd: -13, 
    points: 41, 
    form: ['W', 'W', 'L', 'L', 'L'], 
    logo: '/images/clubs/wolves.png', 
    nextMatch: '/images/clubs/manchester-united.png' 
  },
  { 
    position: 15, 
    club: 'West Ham United', 
    played: 36, 
    won: 10, 
    drawn: 10, 
    lost: 16, 
    gf: 42, 
    ga: 59, 
    gd: -17, 
    points: 40, 
    form: ['L', 'D', 'L', 'D', 'W'], 
    logo: '/images/clubs/west-ham.png', 
    nextMatch: '/images/clubs/wolves.png' 
  },
  { 
    position: 16, 
    club: 'Manchester United', 
    played: 37, 
    won: 10, 
    drawn: 9, 
    lost: 18, 
    gf: 42, 
    ga: 54, 
    gd: -12, 
    points: 39, 
    form: ['L', 'D', 'L', 'L', 'L'], 
    logo: '/images/clubs/manchester-united.png', 
    nextMatch: '/images/clubs/brighton.png' 
  },
  { 
    position: 17, 
    club: 'Tottenham Hotspur', 
    played: 37, 
    won: 11, 
    drawn: 5, 
    lost: 21, 
    gf: 63, 
    ga: 61, 
    gd: 2, 
    points: 38, 
    form: ['L', 'L', 'D', 'L', 'L'], 
    logo: '/images/clubs/tottenham.png', 
    nextMatch: '/images/clubs/sheffield-united.png' 
  },
  { 
    position: 18, 
    club: 'Ipswich Town', 
    played: 36, 
    won: 4, 
    drawn: 10, 
    lost: 22, 
    gf: 35, 
    ga: 77, 
    gd: -42, 
    points: 22, 
    form: ['D', 'L', 'L', 'D', 'L'], 
    logo: '/images/clubs/ipswich.png', 
    nextMatch: '/images/clubs/west-ham.png' 
  },
  { 
    position: 19, 
    club: 'Leicester City', 
    played: 36, 
    won: 5, 
    drawn: 7, 
    lost: 24, 
    gf: 31, 
    ga: 78, 
    gd: -47, 
    points: 22, 
    form: ['D', 'L', 'W', 'D', 'D'], 
    logo: '/images/clubs/leicester.png', 
    nextMatch: '/images/clubs/burnley.png' 
  },
  { 
    position: 20, 
    club: 'Southampton', 
    played: 36, 
    won: 2, 
    drawn: 6, 
    lost: 28, 
    gf: 25, 
    ga: 82, 
    gd: -57, 
    points: 12, 
    form: ['L', 'D', 'L', 'L', 'D'], 
    logo: '/images/clubs/southampton.png', 
    nextMatch: '/images/clubs/nottingham-forest.png' 
  },
];

const GradientHeader = styled(Box)({
  width: '100%',
  minHeight: 120,
  background: 'linear-gradient(90deg,rgb(61, 172, 255) 0%, #5E80FE 100%)', // Thay đổi màu gradient
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '40px 0 24px 0',
  position: 'relative',
});

const BigTitle = styled(Typography)({
  fontWeight: 900,
  fontSize: '4rem', // Tăng kích thước chữ
  letterSpacing: 1,
  marginLeft: 48,
  textShadow: '0 2px 16px rgba(0,0,0,0.12)',
});

const Banner = styled('a')({
  display: 'block',
  width: '100%',
  background: '#37003c',
  color: '#fff',
  textAlign: 'center',
  padding: '0.75rem 1rem',
  fontSize: '1.1rem',
  fontWeight: 600,
  textDecoration: 'none',
  transition: 'all 0.2s',
  margin: '0 auto',
  borderRadius: 8,
  maxWidth: 900,
  marginTop: 24,
  marginBottom: 24,
  '&:hover': {
    background: '#fff',
    color: '#37003c',
    textDecoration: 'none',
    boxShadow: '0 2px 12px 0 rgba(55,0,60,0.08)',
  },
});

const FilterBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 32,
  background: '#f7f7fa',
  borderRadius: 8,
  padding: '8px 32px',
  margin: '0 0 32px 0',
  width: '100%',
  minHeight: 40,
  fontSize: '1.1rem',
});

// Update TableContainer styles
const TableContainer = styled(Box)( {
  overflowX: 'auto',
  background: '#f7f7fa',
  borderRadius: 12,
  boxShadow: '0 2px 16px 0 rgba(55,0,60,0.06)',
  padding: '24px 0',
  width: '100%',
});

// Update TableCell styles for better visibility
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '0.9rem',
  color: '#333',
  padding: theme.spacing(1, 0.5),
  borderBottom: '1px solid #e0e0e0',
  background: '#f9f9f9',
  fontWeight: 500,
  verticalAlign: 'middle',
  '&:first-of-type': {
    fontWeight: 700,
    color: '#87668A',
    fontSize: '0.9rem',
  },
}));
const FilterLabel = styled('div')({
  fontSize: '0.85rem',
  color: '#6b4f7a',
  fontWeight: 400,
  marginBottom: 4,
});

const ClubCell = styled(StyledTableCell)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontWeight: 700,
  color: '#2e1a47',
  fontSize: '0.85rem',
  borderBottom: '1px solid #e0e0e0',
  background: '#fff',
  textDecoration: 'none',
  boxShadow: 'none',
});

interface FormChipProps {
  result: string;
}
const FormChip = styled('span', {
  shouldForwardProp: (prop) => prop !== 'result',
})<FormChipProps>(({ theme, result }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '0.8rem',
  backgroundColor: result === 'W' ? '#00DB73' : result === 'D' ? '#C3B4C5' : '#E0025E', // Thay đổi màu sắc
  color: 'white',
  margin: theme.spacing(0.3),
}));

const QualificationKey = styled('section')({
  marginTop: '2rem',
  fontSize: '0.9rem',
  color: '#6b4f7a',
  maxWidth: 1100,
  marginLeft: 'auto',
  marginRight: 'auto',
});

// Main TablePage component
const TablePage = () => {
  // Filter state (mock)
  const [competition, setCompetition] = React.useState('Premier League');
  const [season, setSeason] = React.useState('2024/25');
  const [matchweek, setMatchweek] = React.useState('All Matchweeks');
  const [homeAway, setHomeAway] = React.useState('All Matches');

  return (
    <Box sx={{ bgcolor: '#f7f7fa', minHeight: '100vh', pb: 6 }}>
      <GradientHeader>
        <BigTitle>Tables</BigTitle>
      </GradientHeader>
      <Banner
        href="https://www.premierleague.com/news/4236670"
        target="_blank"
        rel="noopener noreferrer"
      >
        Premier League claims fifth UEFA Champions League spot <span style={{ marginLeft: 8, fontWeight: 1000 }}>&rarr;</span>
      </Banner>
      <FilterBar>
        <Box>
          <FilterLabel>Filter by Competition</FilterLabel>
          <FormControl size="small" variant="outlined">
            <Select value={competition} onChange={e => setCompetition(e.target.value)} sx={{ minWidth: 160, fontWeight: 600, fontSize: '1.1rem', background: '#f7f7fa' }}>
              <MenuItem value="Premier League">Premier League</MenuItem>
              <MenuItem value="PL2">PL2</MenuItem>
              <MenuItem value="U18">U18</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FilterLabel>Filter by Season</FilterLabel>
          <FormControl size="small" variant="outlined">
            <Select value={season} onChange={e => setSeason(e.target.value)} sx={{ minWidth: 120, fontWeight: 600, fontSize: '1.1rem', background: '#f7f7fa' }}>
              <MenuItem value="2024/25">2024/25</MenuItem>
              <MenuItem value="2023/24">2023/24</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FilterLabel>Filter by Matchweek</FilterLabel>
          <FormControl size="small" variant="outlined">
            <Select value={matchweek} onChange={e => setMatchweek(e.target.value)} sx={{ minWidth: 140, fontWeight: 600, fontSize: '1.1rem', background: '#f7f7fa' }}>
              <MenuItem value="All Matchweeks">All Matchweeks</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FilterLabel>Filter by Home or Away</FilterLabel>
          <FormControl size="small" variant="outlined">
            <Select value={homeAway} onChange={e => setHomeAway(e.target.value)} sx={{ minWidth: 120, fontWeight: 600, fontSize: '1.1rem', background: '#f7f7fa' }}>
              <MenuItem value="All Matches">All Matches</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          variant="text"
          sx={{ 
            marginLeft: 'auto',
            marginRight: 0,
            color: '#6b4f7a', 
            fontWeight: 400, 
            fontSize: '1.1rem', 
            '&:hover': { color: '#37003c', bgcolor: '#f0f0f0' },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            padding: '8px 0 8px 16px'
          }}
        >
          Reset Filters
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 4V10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 20V14H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.51 9.00001C3.82497 7.55445 4.48653 6.17872 5.44281 5.00001C6.39909 3.8213 7.62698 2.87869 9.03139 2.25249C10.4358 1.6263 11.9777 1.33482 13.5308 1.40319C15.0838 1.47156 16.6074 1.89799 17.9999 2.65001L23 10M1 14L5.99992 21.35C7.39242 22.102 8.91606 22.5285 10.4691 22.5968C12.0221 22.6652 13.564 22.3737 14.9684 21.7475C16.3728 21.1213 17.6007 20.1787 18.557 19C19.5133 17.8213 20.1748 16.4456 20.4898 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </FilterBar>
      <img
        src="https://resources.premierleague.com/premierleague/competitions/competition_1.png"
        alt="Premier League Logo"
        style={{ width: 156, height: 30, marginLeft: 20, marginBottom: 16, display: 'block' }}
      />
      <TableContainer>
        <MuiTable sx={{ borderSpacing: '0 0.25rem', width: '100%', borderCollapse: 'separate', minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: '40px', textAlign: 'center', fontWeight: 700, color: '#87668A' }}>Position</StyledTableCell>
              <StyledTableCell sx={{ width: '190px', fontWeight: 700, color: '#87668A' }}>Club</StyledTableCell>
              <StyledTableCell sx={{ width: '60px', textAlign: 'center', fontWeight: 700, color: '#87668A' }}>Played</StyledTableCell>
              <StyledTableCell sx={{ width: '60px', textAlign: 'center', fontWeight: 700, color: '#87668A' }}>Won</StyledTableCell>
              <StyledTableCell sx={{ width: '60px', textAlign: 'center', fontWeight: 700, color: '#87668A' }}>Drawn</StyledTableCell>
              <StyledTableCell sx={{ width: '60px', textAlign: 'center', fontWeight: 700, color: '#87668A' }}>Lost</StyledTableCell>
              <StyledTableCell sx={{ width: '60px', textAlign: 'center', fontWeight: 700, color: '#87668A' }}>GF</StyledTableCell>
              <StyledTableCell sx={{ width: '60px', textAlign: 'center', fontWeight: 700, color: '#87668A' }}>GA</StyledTableCell>
              <StyledTableCell sx={{ width: '60px', textAlign: 'center', fontWeight: 700, color: '#87668A' }}>GD</StyledTableCell>
              <StyledTableCell sx={{ width: '70px', textAlign: 'center', fontWeight: 700, color: '#87668A' }}>Points</StyledTableCell>
              <StyledTableCell sx={{ width: '180px', textAlign: 'center', fontWeight: 700, color: '#87668A' }}>Form</StyledTableCell>
              <StyledTableCell sx={{ width: '60px', textAlign: 'center', fontWeight: 700, color: '#87668A' }}>Next</StyledTableCell>
              <StyledTableCell sx={{ width: '60px', textAlign: 'center', fontWeight: 700, color: '#87668A' }}>More</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.position}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '0.375rem',
                  boxShadow: '0 0 0 1px rgba(46, 26, 71, 0.06)',
                  '&:nth-of-type(n+18)': { borderTop: '1px solid #f472b6' },
                }}
              >
                <StyledTableCell sx={{ color: '#37003C', textAlign: 'center', fontWeight: 400, fontSize: '0.9rem' }}>
                  {row.position}
                </StyledTableCell>
                <ClubCell>
                  <img src={row.logo} alt={`${row.club} club logo`} width={32} height={32} style={{ marginRight: 12, display: 'inline-block', verticalAlign: 'middle' }} />
                  <span style={{ color: '#2e1a47', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>{row.club}</span>
                </ClubCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>{row.played}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>{row.won}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>{row.drawn}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>{row.lost}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>{row.gf}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>{row.ga}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>{row.gd}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center', fontWeight: 800, color: '#2e1a47' }}>
                  {row.points}
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>
                  <Stack direction="row" justifyContent="center">
                    {row.form.map((result, idx) => (
                      <FormChip key={idx} result={result}>{result}</FormChip>
                    ))}
                  </Stack>
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>
                  <img src={row.nextMatch} alt={`Next match against ${row.nextMatch.split('/').pop()?.replace('.png', '')}`} width={32} height={32} />
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                      padding: 0,
                      margin: '0 auto'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 32 32">
                      <polyline
                        points="8,13 16,21 24,13"
                        fill="none"
                        stroke="#37003C"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <QualificationKey>
        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, fontSize: '1.1rem', textAlign: 'left', ml: 0 }}>
          European Qualification Key
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={2} sx={{ fontSize: '1rem', fontWeight: 500 }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Box sx={{ width: 6, height: 24, borderLeft: '4px solid #00f' }} />
            <span>Champions League qualification</span>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <Box sx={{ width: 6, height: 24, borderLeft: '4px solid #f90' }} />
            <span>Europa League Qualification</span>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <Box sx={{ width: 6, height: 24, borderLeft: '4px solid #0c0' }} />
            <span>Conference League qualification</span>
          </Stack>
        </Stack>
      </QualificationKey>
      <Divider sx={{ my: 5, maxWidth: 1100, margin: '40px auto' }} />
      <Partners />
    </Box>
  );
};

export default TablePage;
