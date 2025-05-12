import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  InputAdornment,
  Button,
  Link,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Partners from '../components/Partners';

// Mock news data
const mockNews = [
  {
    id: 1,
    title: 'How do UEFA competitions affect clubs\' Premier League fixtures?',
    type: 'Fixtures',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2024/06/18/076ebcf3-22c4-4a94-82ec-c22664159c8b/All-3-Uefa-Competition-trophies.jpg?width=451&height=268',
    description: 'See how European matches fit into the Premier League schedules of Man City, Arsenal, Liverpool, Villa, Spurs, Man Utd and Chelsea',
    url: 'https://www.premierleague.com/news/4040696',
  },
  {
    id: 2,
    title: 'Premier League broadcast deals for 2025-2028',
    type: 'Broadcast',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2023/09/28/f45c2275-527e-425d-8959-7a2a1aee0423/TV-Camera-in-place-at-Goodison-Park.jpg?width=451&height=268',
    description: 'Find out the rights holders for the competition\'s audiovisual rights in different territories around the world',
    url: 'https://www.premierleague.com/news/3703577',
  },
  {
    id: 3,
    title: 'Fixture amendments for Premier League matches in February',
    type: 'Fixtures',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2024/12/09/bfaa2f70-21da-4819-92a3-ef8fe1aa4faf/GettyImages-2187728894.jpg?width=1400&height=800',
    description: 'See revised schedule as matches move for live UK broadcast and due to clubs playing in Europe',
    url: 'https://www.premierleague.com/news/4192676',
  },
  {
    id: 4,
    title: 'Premier League raising awareness of mental health through \'Inside Matters\'',
    type: 'Media Release',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/08/f5acb848-5235-4ba9-a319-08db8774a7c5/PL_INSIDE_MATTERS_16x9.png?width=1400&height=800',
    description: 'Clubs, players and managers are taking part in campaign that encourages fans to check in with loved ones',
    url: 'https://www.premierleague.com/news/4304217',
  },
  {
    id: 5,
    title: 'Shortlist revealed for PL2 Player of the Season',
    type: 'Youth',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/08/c5b7208a-c1ad-499e-bdd7-5d94587b2341/PL2-AWARDS-NOMINEES-POTS-16x9-v2.png?width=1400&height=800',
    description: 'Find out more about the eight academy stars who have been shortlisted for their displays in 2024/25',
    url: 'https://www.premierleague.com/news/4298679',
  },
  {
    id: 6,
    title: 'Analysis: Is Odegaard getting back to his best?',
    type: 'Talking Tactics',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/10/c4cc7fdf-654c-406b-8765-443121007bb8/PL2425-TALKING-TACTICS_ARS-DEGAARD.png?width=1400&height=800',
    description: 'Adrian Clarke assesses the Arsenal captain\'s form across 2024/25, after three assists in his last three Premier League matches',
    url: 'https://www.premierleague.com/news/4304884',
  },
  {
    id: 7,
    title: 'Pereira named Barclays Manager of the Month',
    type: 'Awards',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/09/1a5e7a41-0182-460d-b53f-133eb8f68dc2/PL-MONTHLY-AWARD-WINNERS-MOTM16x9-1-.png?width=451&height=268',
    description: 'Wolves head coach wins award for first time after masterminding five wins and confirming club\'s Premier League safety in April',
    url: 'https://www.premierleague.com/news/4303609',
  },
  {
    id: 8,
    title: 'FPL GW36 stats: Mixed fortunes for most-bought players',
    type: 'Fantasy',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/10/e048a0a1-4080-41f3-a22c-123f2bdee294/FotoJet-49-.jpg?width=451&height=268',
    description: 'Schade and Gvardiol reward new owners, but there was less delight for De Bruyne and Wissa, who both blank',
    url: 'https://www.premierleague.com/news/4305130',
  },
  {
    id: 9,
    title: 'Brighton agree deal to sign teenage winger Watson',
    type: 'Transfers',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/04/01/692e4b0c-f55e-4c88-becf-d55b849cc307/Tommy-Watson.jpg?width=1400&height=800',
    description: 'Eighteen-year-old to join Seagulls from Sunderland when the summer transfer window opens on a deal until June 2029',
    url: 'https://www.premierleague.com/news/4273811',
  },
  {
    id: 10,
    title: 'Fixture amendments for Premier League matches in March',
    type: 'Broadcast',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/01/24/a74be84c-db7c-498e-8a13-163e9ebe6099/Haaland-v-Forest-1MB.jpg?width=451&height=268',
    description: 'See which Premier League fixtures have been selected for live TV coverage in the UK and when they will be played',
    url: 'https://www.premierleague.com/news/4231431',
  },
  {
    id: 11,
    title: 'Leeds U21s beat Sutton to win inaugural National League Cup',
    type: 'Youth',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/04/30/b95a3e5c-0271-436e-8ae0-a613f048adc1/TD1_9580_0Wplzv20_20250429092932.jpeg?width=1400&height=800',
    description: 'A closely fought game ends in Leeds\' favour in front of packed crowd at Sutton United\'s VBS Stadium',
    url: 'https://www.premierleague.com/news/4298715',
  },
  {
    id: 12,
    title: 'Vicario wins Premier League Save of the Month award',
    type: 'Awards',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/09/ea53bf13-0c07-4ff7-b05a-884f5dea0a2b/PL-MONTHLY-AWARD-WINNERS-SOTM16x9-1-.png?width=451&height=268',
    description: 'Italian becomes the first Spurs goalkeeper to earn the prize after his stunning save against Chelsea in April',
    url: 'https://www.premierleague.com/news/4303611',
  },
  {
    id: 13,
    title: 'Baleba\'s stunner wins Guinness Goal of the Month award',
    type: 'Awards',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/09/79c5e152-bc81-41c0-b3f6-04ce5a234907/PL-MONTHLY-AWARD-WINNERS-GOTM16x9-1-.png?width=451&height=268',
    description: 'Brighton midfielder claims April\'s prize for his incredible long-range winner against West Ham',
    url: 'https://www.premierleague.com/news/4303610',
  },
  {
    id: 14,
    title: 'Premier League stars check in on loved ones to support \'Inside Matters\'',
    type: 'Communities',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/09/adc49cb6-07c1-41ab-ab2a-d24e1c53628c/FotoJet-2025-05-09T095110.711.jpg?width=451&height=268',
    description: 'Players and managers help raise awareness of mental health and encourage fans to check in on the wellbeing of others',
    url: 'https://www.premierleague.com/news/4304427',
  },
  {
    id: 15,
    title: 'Hus\'s story: Premier League Kicks is a big part of my life',
    type: 'Communities',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2023/10/03/0884a0d8-236d-4472-a333-8e0cd99ed668/PL-KICKS-Tournament-U16-MIXED-26JUL23-0144.jpg?width=451&height=268',
    description: 'How Fulham coach Hus Mohammed is inspiring the new generation of young people at the same venue where he was a participant',
    url: 'https://www.premierleague.com/news/3720103',
  },
  {
    id: 16,
    title: 'FPL GW36 bonus points: See who\'s earned extras in Saturday\'s matches',
    type: 'Fantasy',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/10/a0ba778d-ffb2-4dd9-9d9c-57f457369c47/Bonus-Points-comp-2.jpg?width=1400&height=800',
    description: 'See which players have been given extra points in Fantasy Premier League',
    url: 'https://www.premierleague.com/news/4304593',
  }
];

const newsTypes = ['All', 'Awards', 'Broadcast', 'Communities', 'Fantasy', 'Fixtures', 'Media Release', 'Talking Tactics', 'Transfers', 'Youth'];

const News = () => {
  const [type, setType] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [filteredNews, setFilteredNews] = useState(mockNews);

  useEffect(() => {
    let result = mockNews;
    if (type !== 'All') {
      result = result.filter(news => news.type === type);
    }
    if (searchText) {
      result = result.filter(news =>
        news.title.toLowerCase().includes(searchText.toLowerCase()) ||
        news.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredNews(result);
  }, [type, searchText]);

  const resetFilters = () => {
    setType('All');
    setSearchText('');
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Main content with gradient background */}
      <Box sx={{
        background: 'linear-gradient(135deg, #00add5 0%, #7573f7 50%, #32043a 100%)',
        py: 2
      }}>
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            mb: 4
          }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '48px', md: '72px' },
                fontWeight: 700,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: { xs: 2, sm: 0 }
              }}
            >
              News
            </Typography>

            <Box sx={{
              width: { xs: '100%', sm: '250px' },
              position: 'relative'
            }}>
              <TextField
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                size="small"
                sx={{
                  width: '100%',
                  backgroundColor: 'white',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent',
                    },
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>

          {/* Filter section */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'white', fontSize: '0.9rem', mr: 1 }}>
                Filter by Type
              </Typography>

              <FormControl sx={{ width: 120 }}>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  size="small"
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 1,
                    fontSize: '0.9rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent'
                    }
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: 'white',
                        '& .MuiMenuItem-root': {
                          fontSize: '0.9rem'
                        }
                      }
                    }
                  }}
                >
                  {newsTypes.map((newsType) => (
                    <MenuItem key={newsType} value={newsType}>{newsType}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Button
              startIcon={<RefreshIcon />}
              onClick={resetFilters}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '0.85rem'
              }}
            >
              Reset Filters
            </Button>
          </Box>
        </Container>
      </Box>

      {/* News items list */}
      <Container maxWidth={false} sx={{ maxWidth: 1440, my: 4 }}>
        <Stack spacing={4}>
          {filteredNews.map((news) => (
            <Box
              key={news.id}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 3,
                pb: 4,
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                '&:last-child': {
                  borderBottom: 'none'
                },
                transition: 'box-shadow 0.25s, transform 0.25s, background 0.25s',
                '&:hover': {
                  boxShadow: '0 8px 32px 0 rgba(55,0,60,0.12)',
                  background: 'rgba(0,173,213,0.07)',
                  transform: 'translateY(-4px) scale(1.012)',
                }
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  width: { xs: '100%', sm: '206px' },
                  height: { xs: 'auto', sm: '138px' },
                  flexShrink: 0,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 1
                }}
              >
                <Link href={news.url} target="_blank" rel="noopener noreferrer" sx={{ display: 'block', width: '100%', height: '100%' }}>
                  <img
                    src={news.image}
                    alt={news.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </Link>
                {news.type === 'Live Blog' && (
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    py: 0.5,
                    px: 1.5,
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}>
                    INJURY UPDATE
                  </Box>
                )}
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: news.type === 'Feature' ? '#520359' :
                           news.type === 'Report' ? '#37003d' :
                           news.type === 'Live Blog' ? '#ff2882' :
                           news.type === 'Talking Tactics' ? '#e90052' :
                           news.type === 'Fantasy Premier League' ? '#04f5fc' :
                           '#37003d',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    mb: 0.5
                  }}
                >
                  {news.type}
                </Typography>

                <Link href={news.url} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ color: '#37003d', fontWeight: 700, fontSize: { xs: '1.1rem', md: '1.3rem' }, mb: 1, display: 'inline-block' }}>
                  {news.title}
                </Link>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#6c6c6c',
                    fontSize: '0.9rem',
                    lineHeight: 1.5
                  }}
                >
                  {news.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
      <Partners />
    </Box>
  );
};

export default News;
