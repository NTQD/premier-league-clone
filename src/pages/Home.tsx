import { Avatar, Chip, Box, Container, Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import HomeHero from '../components/home/HomeHero';
import Partners from '../components/Partners';
import { Link } from 'react-router-dom';


const newsData = [
  {
    title: "Amorim hints at Man Utd exit if he cannot solve problems",
    tag: "News",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/a026d685-4e52-4bc4-9913-36577d37bd0e/2214514866.jpg?width=451&height=268",
    link: "/news/4308694"
  },
  {
    title: "Arsenal fight back from two goals down to draw against Liverpool",
    tag: "Report",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/959305ca-fb50-4c48-95cf-4b39ce69a560/2213986330.jpg?width=451&height=268",
    link: "/news/4304651"
  },
  {
    title: "Nuno: Today is a tough day for everybody",
    tag: "News",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/bd1794a3-432e-409c-a86d-fe255de05f3d/Nuno.jpg?width=451&height=268",
    link: "/news/4308267"
  },
  {
    title: "West Ham leapfrog Man Utd with win at Old Trafford",
    tag: "Report",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/a3edc713-9373-4cc0-951f-79190819edda/Jarrod-Bowen.jpg?width=451&height=268",
    link: "/news/4304638"
  },
  {
    title: "Crystal Palace equal record points tally with win at Spurs",
    tag: "Report",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/54f4a553-a348-4083-9743-b93b4b562df0/Eze.jpg?width=451&height=268",
    link: "/news/4304647"
  },
  {
    title: "Forest lose ground in top-five race with draw against Leicester",
    tag: "Report",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/8025509f-e4dc-4721-a82f-ad9eea7bf82e/NFOLEI.jpg?width=451&height=268",
    link: "/news/4304641"
  }
];

const clubNewsData = [
  {
    title: "Chelsea Diary: One more time at the Bridge",
    tag: "Club News",
    img: "https://resources.premierleague.com/premierleague/badges/100/t8.png",
    link: "https://www.chelseafc.com/en/news/article/chelsea-diary-one-more-time-at-the-bridge"
  },
  {
    title: "Palace Women to compete in newly-named WSL2 from 2025/26",
    tag: "Club News",
    img: "https://resources.premierleague.com/premierleague/badges/100/t31.png",
    link: "https://www.cpfc.co.uk/news/announcement/palace-women-to-compete-in-newly-named-wsl2-from-2025-26/"
  },
  {
    title: "Nusken: 'It's incredible to have her in our team'",
    tag: "Club News",
    img: "https://resources.premierleague.com/premierleague/badges/100/t8.png",
    link: "https://www.chelseafc.com/en/news/article/nusken-its-incredible-to-have-her-in-our-team"
  },
  {
    title: "Loan round-up: Olakigbe features in League Two play-off semi-final",
    tag: "Club News",
    img: "https://resources.premierleague.com/premierleague/badges/100/t94.png",
    link: "https://www.brentfordfc.com/en/news/article/loan-round-up-michael-olakigbe-chesterfield-0-walsall-2-league-two-play-off-semi-final"
  },
  {
    title: "Quick-Fire Goodison Memories: McNeil",
    tag: "Club News",
    img: "https://resources.premierleague.com/premierleague/badges/100/t11.png",
    link: "https://www.evertonfc.com/news/2025/may/12/quick-fire-goodison-memories--mcneil/"
  },
  {
    title: "Loan Report: Goodman lands POTM in play-off semi-final",
    tag: "Club News",
    img: "https://resources.premierleague.com/premierleague/badges/100/t31.png",
    link: "https://www.cpfc.co.uk/news/club/loan-report-owen-goodman-player-of-the-match-v-notts-county/"
  },
];
const moreThanAGameData = [
  {
    title: "Premier League raising awareness of mental health through 'Inside Matters’",
    tag: "Inside Matters",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/08/f5acb848-5235-4ba9-a319-08db8774a7c5/PL_INSIDE_MATTERS_16x9.png?width=451&height=268",
    link: "/news/4304217"
  },
  {
    title: "Hus's story: Premier League Kicks is a big part of my life",
    tag: "More than a game",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2023/10/03/0884a0d8-236d-4472-a333-8e0cd99ed668/PL-KICKS-Tournament-U16-MIXED-26JUL23-0144.jpg?width=451&height=268",
    link: "/news/3720103"
  },
  {
    title: "'Premier League Changemakers shows how football is a vehicle for empowerment'",
    tag: "More than a game",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/04/16/fa9ad2e1-383d-4c41-8f6f-75c4f804dedd/Premier-League-Changemakers-2025-composite.png?width=451&height=268",
    link: "/news/4277803"
  },
];
const fplNewsData = [
  {
    title: "Off The Bench: Who to transfer in if you're chasing?",
    tag: "Fantasy Premier League",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/12/6a4e373d-5cf7-45ee-b986-b073ca4ac88f/1-OFF-THE-BENCH-GW36-REVIEW.jpg?width=451&height=268",
    link: "/news/1820580"
  },
  {
    title: "FPL GW36 stats: Salah, Isak, Mateta and Saka justify sales",
    tag: "Fantasy Premier League",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/6d74cfa1-1fe7-4739-84fe-e00bb9e6601c/1-Salah-Isak-Saka-Mateta.jpg?width=451&height=268",
    link: "/news/4305130"
  },
  {
    title: "The Scout’s guide to when to use your remaining FPL chips",
    tag: "Fantasy Premier League",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/12/375e0382-0a17-4edb-a83b-69c94310439d/Saka.jpeg?width=451&height=268",
    link: "/news/4230897"
  },
];
const quizzesData = [
  {
    title: "QUIZ: Can you name every club's record Premier League goalscorer?",
    tag: "Quiz",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/10/d1134a8a-a0a4-4db0-9eb4-0652370da517/Watkins.jpg?width=451&height=268",
    link: "/news/4199302"
  },
  {
    title: "Which Premier League player or manager am I?",
    tag: "Quiz",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/09/823e6a7f-0356-4d7e-bfd1-1eae2e630f2f/Who-Am-I.jpeg?width=451&height=268",
    link: "/news/4304166"
  },
  {
    title: "Can you name the champions of EVERY Premier League season?",
    tag: "Quiz",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/04/19/80b18515-f531-4a9d-9f7f-b8298162279a/Liverpool-quiz-graphic-v2.jpeg?width=451&height=268",
    link: "/news/4287587"
  },
];
const videosData = [
  {
    title: "Pundits: Who do Arsenal need to sign this summer?",
    desc: "Ian Wright và Michael Owen bàn về những vị trí Arsenal cần bổ sung mùa tới.",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/12/158efcf6-b293-486f-9160-73faa1ed1863/Arteta-Wright-Owen.jpg?width=800&height=450",
    link: "/video/single/4308611?FOOTBALL_CLUBS=1",
    duration: "07:51"
  },
  {
    title: "'Claps aren't as loud as boos' - Everything Slot said on Alexander-Arnold",
    desc: "",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/6e1df378-4f3d-4f2c-b350-530fe28d87a5/FotoJet-2025-05-11T202612.563.jpg?width=800&height=450",
    link: "/video/single/4308716?FOOTBALL_CLUBS=10",
    duration: "04:53"
  },
  {
    title: "Watch: Amorim 'embarrassed' by Man Utd's place in table",
    desc: "",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/f69c0abb-3344-4d19-bad9-4e49d3e4133e/FotoJet-2025-05-11T181230.511.jpg?width=800&height=450",
    link: "/video/single/4308427?FOOTBALL_CLUBS=12",
    duration: "01:57"
  },
  {
    title: "'I'm really upset' - Arteta's passionate reaction to Arsenal's draw at Liverpool",
    desc: "",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/25aa5119-0358-436b-9c0f-3ca9cff41a40/FotoJet-2025-05-11T201100.832.jpg?width=800&height=450",
    link: "/video/single/4308664?FOOTBALL_CLUBS=1",
    duration: "02:07"
  },
  {
    title: "Owen: Less than one per cent of Liverpool fans would boo Trent",
    desc: "",
    img: "https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/e62ce514-1b27-4ba2-9f53-ad4260372527/FotoJet-2025-05-11T193711.439.jpg?width=800&height=450",
    link: "/video/single/4308645?FOOTBALL_CLUBS=10",
    duration: "01:32"
  }
];
const standings = [
  { pos: 1, club: 'Liverpool', logo: 'https://resources.premierleague.com/premierleague/badges/20/t14.png', played: 36, gd: '+46', pts: 83, link: '//www.premierleague.com/clubs/10/Liverpool/overview' },
  { pos: 2, club: 'Arsenal', logo: 'https://resources.premierleague.com/premierleague/badges/20/t3.png', played: 36, gd: '+33', pts: 68, link: '//www.premierleague.com/clubs/1/Arsenal/overview' },
  { pos: 3, club: 'Newcastle', logo: 'https://resources.premierleague.com/premierleague/badges/20/t4.png', played: 36, gd: '+23', pts: 66, link: '//www.premierleague.com/clubs/23/Newcastle-United/overview' },
  { pos: 4, club: 'Man City', logo: 'https://resources.premierleague.com/premierleague/badges/20/t43.png', played: 36, gd: '+24', pts: 65, link: '//www.premierleague.com/clubs/11/Manchester-City/overview' },
  { pos: 5, club: 'Chelsea', logo: 'https://resources.premierleague.com/premierleague/badges/20/t8.png', played: 36, gd: '+19', pts: 63, link: '//www.premierleague.com/clubs/4/Chelsea/overview' },
  { pos: 6, club: 'Aston Villa', logo: 'https://resources.premierleague.com/premierleague/badges/20/t7.png', played: 36, gd: '+7', pts: 63, link: '//www.premierleague.com/clubs/2/Aston-Villa/overview' },
  { pos: 7, club: "Nott'm Forest", logo: 'https://resources.premierleague.com/premierleague/badges/20/t17.png', played: 36, gd: '+12', pts: 62, link: '//www.premierleague.com/clubs/15/Nottingham-Forest/overview' },
  { pos: 8, club: 'Brentford', logo: 'https://resources.premierleague.com/premierleague/badges/20/t94.png', played: 36, gd: '+10', pts: 55, link: '//www.premierleague.com/clubs/130/Brentford/overview' },
  { pos: 9, club: 'Brighton', logo: 'https://resources.premierleague.com/premierleague/badges/20/t36.png', played: 36, gd: '+3', pts: 55, link: '//www.premierleague.com/clubs/131/Brighton-and-Hove-Albion/overview' },
  { pos: 10, club: 'Bournemouth', logo: 'https://resources.premierleague.com/premierleague/badges/20/t91.png', played: 36, gd: '+12', pts: 53, link: '//www.premierleague.com/clubs/127/Bournemouth/overview' },
  { pos: 11, club: 'Fulham', logo: 'https://resources.premierleague.com/premierleague/badges/20/t54.png', played: 36, gd: '+1', pts: 51, link: '//www.premierleague.com/clubs/34/Fulham/overview' },
  { pos: 12, club: 'Crystal Palace', logo: 'https://resources.premierleague.com/premierleague/badges/20/t31.png', played: 36, gd: '-2', pts: 49, link: '//www.premierleague.com/clubs/6/Crystal-Palace/overview' },
  { pos: 13, club: 'Everton', logo: 'https://resources.premierleague.com/premierleague/badges/20/t11.png', played: 36, gd: '-5', pts: 42, link: '//www.premierleague.com/clubs/7/Everton/overview' },
  { pos: 14, club: 'Wolves', logo: 'https://resources.premierleague.com/premierleague/badges/20/t39.png', played: 36, gd: '-13', pts: 41, link: '//www.premierleague.com/clubs/38/Wolverhampton-Wanderers/overview' },
  { pos: 15, club: 'West Ham', logo: 'https://resources.premierleague.com/premierleague/badges/20/t21.png', played: 36, gd: '-17', pts: 40, link: '//www.premierleague.com/clubs/25/West-Ham-United/overview' },
  { pos: 16, club: 'Man Utd', logo: 'https://resources.premierleague.com/premierleague/badges/20/t1.png', played: 36, gd: '-11', pts: 39, link: '//www.premierleague.com/clubs/12/Manchester-United/overview' },
  { pos: 17, club: 'Spurs', logo: 'https://resources.premierleague.com/premierleague/badges/20/t6.png', played: 36, gd: '+4', pts: 38, link: '//www.premierleague.com/clubs/21/Tottenham-Hotspur/overview' },
  { pos: 18, club: 'Ipswich', logo: 'https://resources.premierleague.com/premierleague/badges/20/t40.png', played: 36, gd: '-42', pts: 22, link: '//www.premierleague.com/clubs/8/Ipswich-Town/overview' },
  { pos: 19, club: 'Leicester', logo: 'https://resources.premierleague.com/premierleague/badges/20/t13.png', played: 36, gd: '-47', pts: 22, link: '//www.premierleague.com/clubs/26/Leicester-City/overview' },
  { pos: 20, club: 'Southampton', logo: 'https://resources.premierleague.com/premierleague/badges/20/t20.png', played: 36, gd: '-57', pts: 12, link: '//www.premierleague.com/clubs/20/Southampton/overview' },
];
const results = [
  {
    date: 'Saturday 10 May',
    time: '15:00',
    home: {
      name: 'Fulham',
      abbr: 'FUL',
      logo: 'https://resources.premierleague.com/premierleague/badges/50/t54.png',
    },
    away: {
      name: 'Everton',
      abbr: 'EVE',
      logo: 'https://resources.premierleague.com/premierleague/badges/50/t11.png',
    },
    score: '1-3',
    link: '//www.premierleague.com/match/116178',
  },
  {
    date: 'Saturday 10 May',
    time: '15:00',
    home: {
      name: 'Ipswich',
      abbr: 'IPS',
      logo: 'https://resources.premierleague.com/premierleague/badges/50/t40.png',
    },
    away: {
      name: 'Brentford',
      abbr: 'BRE',
      logo: 'https://resources.premierleague.com/premierleague/badges/50/t94.png',
    },
    score: '0-1',
    link: '//www.premierleague.com/match/116179',
  },
  {
    date: 'Saturday 10 May',
    time: '15:00',
    home: {
      name: 'Southampton',
      abbr: 'SOU',
      logo: 'https://resources.premierleague.com/premierleague/badges/50/t20.png',
    },
    away: {
      name: 'Man City',
      abbr: 'MCI',
      logo: 'https://resources.premierleague.com/premierleague/badges/50/t43.png',
    },
    score: '0-0',
    link: '//www.premierleague.com/match/116184',
  },
  {
    date: 'Saturday 10 May',
    time: '15:00',
    home: {
      name: 'Wolves',
      abbr: 'WOL',
      logo: 'https://resources.premierleague.com/premierleague/badges/50/t39.png',
    },
    away: {
      name: 'Brighton',
      abbr: 'BHA',
      logo: 'https://resources.premierleague.com/premierleague/badges/50/t36.png',
    },
    score: '0-2',
    link: '//www.premierleague.com/match/116186',
  },
  // Thêm nhiều trận nữa nếu muốn
];
const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <HomeHero />

      {/* Fixtures Section */}
      <Container maxWidth={false} sx={{ maxWidth: 1440, py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 1, pt: 3 }}>
              Results
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/results"
            >
              View All Results
            </Button>
          </Box>
        </Box>
        <Grid container spacing={3}>
          {results.map((result, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderRadius: 2,
                  textDecoration: 'none',
                  transition: 'transform 0.2s cubic-bezier(.4,2,.6,1), box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.03)',
                    boxShadow: 4,
                  },
                }}
                component="a"
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      {result.date}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      {result.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                    {/* Home team */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={result.home.logo} alt={result.home.name} sx={{ width: 32, height: 32, bgcolor: 'white' }} />
                      <Typography variant="body1" fontWeight={600}>
                        {result.home.abbr || result.home.name.slice(0, 3).toUpperCase()}
                      </Typography>
                    </Box>
                    {/* Score */}
                    <Typography variant="body1" fontWeight={700} sx={{
                      bgcolor: '#37003c',
                      color: '#fff',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      minWidth: 36,
                      textAlign: 'center',
                      display: 'inline-block',
                    }}>
                      {result.score}
                    </Typography>
                    {/* Away team */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'row-reverse' }}>
                      <Avatar src={result.away.logo} alt={result.away.name} sx={{ width: 32, height: 32, bgcolor: 'white' }} />
                      <Typography variant="body1" fontWeight={600}>
                        {result.away.abbr || result.away.name.slice(0, 3).toUpperCase()}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Feature Section */}
      <Container maxWidth={false} sx={{ maxWidth: 1440, py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                Latest Videos
              </Typography>
              <Button variant="outlined" color="primary" href="/video/all">
                All Videos
              </Button>
            </Box>

            {/* Video nổi bật */}
            <Card sx={{ borderRadius: 2, overflow: 'hidden', mb: 3, position: 'relative' }}>
              <a href={videosData[0].link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={videosData[0].img}
                  alt={videosData[0].title}
                />
                <Box sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  bgcolor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 600,
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}>
                  <svg width="18" height="18" fill="white" style={{ marginRight: 4 }} viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  {videosData[0].duration}
                </Box>
                <CardContent>
                  <Chip label="Video" size="small" color="primary" sx={{ mb: 1 }} />
                  <Typography gutterBottom variant="h5" fontWeight={600}>
                    {videosData[0].title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {videosData[0].desc || "Video nổi bật của Premier League."}
                  </Typography>
                </CardContent>
              </a>
            </Card>

            {/* Danh sách video nhỏ */}
            <Grid container spacing={2}>
              {videosData.slice(1).map((video, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'transform 0.2s cubic-bezier(.34,1.56,.64,1)',
                      '&:hover': {
                        transform: 'translateY(-6px) scale(1.03)',
                        boxShadow: 6,
                      }
                    }}
                  >
                    <a href={video.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: '100%', textDecoration: 'none', color: 'inherit' }}>
                      <CardMedia
                        component="img"
                        image={video.img}
                        alt={video.title}
                        sx={{ width: 120, height: 80, objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flex: 1, py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Chip label="Video" size="small" color="primary" />
                          <Typography variant="caption" color="text.secondary">{video.duration}</Typography>
                        </Box>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ lineHeight: 1.3 }}>
                          {video.title}
                        </Typography>
                      </CardContent>
                    </a>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                League Table
              </Typography>
              <Typography variant="body1" color="text.secondary">
              </Typography>
            </Box>

            <Card sx={{ p: 2 }}>
              {/* Table Header */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr 40px 40px 40px',
                mb: 1,
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                pb: 1,
                color: 'text.secondary',
                fontSize: '0.75rem'
              }}>
                <Box>Pos</Box>
                <Box>Club</Box>
                <Box sx={{ textAlign: 'center' }}>Pl</Box>
                <Box sx={{ textAlign: 'center' }}>GD</Box>
                <Box sx={{ textAlign: 'center' }}>Pts</Box>
              </Box>

              {/* Table Rows */}
              {standings.map((team) => (
                <Box key={team.pos} sx={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 40px 40px 40px',
                  py: 1,
                  borderBottom: '1px solid rgba(0,0,0,0.07)',
                  alignItems: 'center',
                  fontSize: '0.875rem'
                }}>
                  <Box fontWeight={600}>{team.pos}</Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar src={team.logo} alt={team.club} sx={{ width: 24, height: 24, mr: 1, bgcolor: 'white' }} />
                    <a
                      href={team.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}
                    >
                      {team.club}
                    </a>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>{team.played}</Box>
                  <Box sx={{ textAlign: 'center' }}>{team.gd}</Box>
                  <Box sx={{ textAlign: 'center', fontWeight: 600 }}>{team.pts}</Box>
                </Box>
              ))}

              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button variant="text" color="primary" size="small" href="/tables">
                  Full Table
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Latest News Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                Latest News
              </Typography>
              <Button variant="outlined" color="primary" href="/news">
                More News
              </Button>
            </Box>
          </Box>

          {/* News Cards */}
          <Grid container spacing={3}>
            {newsData.map((news, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s cubic-bezier(.34,1.56,.64,1)',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: 6,
                  }
                }}>
                  <a href={news.link} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">
                    <CardMedia
                      component="img"
                      height="200"
                      image={news.img}
                      alt={news.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Chip label={news.tag} size="small" color="primary" sx={{ mb: 1 }} />
                      <Typography gutterBottom variant="subtitle1" fontWeight={600}>
                        {news.title}
                      </Typography>
                    </CardContent>
                  </a>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                More than a game
              </Typography>
              <Button variant="outlined" color="primary" href="/morethanagame">
                More News
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {moreThanAGameData.map((news, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s cubic-bezier(.34,1.56,.64,1)',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: 6,
                  }
                }}>
                  <a href={news.link} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">
                    <CardMedia
                      component="img"
                      height="200"
                      image={news.img}
                      alt={news.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Chip label={news.tag} size="small" color="primary" sx={{ mb: 1 }} />
                      <Typography gutterBottom variant="subtitle1" fontWeight={600}>
                        {news.title}
                      </Typography>
                    </CardContent>
                  </a>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                Latest FPL News
              </Typography>
              <Button variant="outlined" color="primary" href="/news?type=Fantasy">
                More News
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {fplNewsData.map((news, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s cubic-bezier(.34,1.56,.64,1)',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: 6,
                  }
                }}>
                  <a href={news.link} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">
                    <CardMedia
                      component="img"
                      height="200"
                      image={news.img}
                      alt={news.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Chip
                        label={news.tag}
                        size="small"
                        sx={{
                          mb: 1,
                          background: 'linear-gradient(90deg, #ff0080, #7928ca)',
                          color: 'white',
                          fontWeight: 600,
                          borderRadius: '8px'
                        }}
                      />
                      <Typography gutterBottom variant="subtitle1" fontWeight={600}>
                        {news.title}
                      </Typography>
                    </CardContent>
                  </a>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                Quizzes
              </Typography>
              <Button variant="outlined" color="primary" href="/quizzes">
                More Quizzes
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {quizzesData.map((quiz, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s cubic-bezier(.34,1.56,.64,1)',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: 6,
                  }
                }}>
                  <a href={quiz.link} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">
                    <CardMedia
                      component="img"
                      height="200"
                      image={quiz.img}
                      alt={quiz.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Chip label={quiz.tag} size="small" color="primary" sx={{ mb: 1 }} />
                      <Typography gutterBottom variant="subtitle1" fontWeight={600}>
                        {quiz.title}
                      </Typography>
                    </CardContent>
                  </a>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                Club News
              </Typography>
              <Button variant="outlined" color="primary" href="/clubs">
                More Clubs
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {clubNewsData.map((news, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s cubic-bezier(.34,1.56,.64,1)',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: 6,
                  }
                }}>
                  <a href={news.link} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }} target="_blank" rel="noopener noreferrer">
                    <CardMedia
                      component="img"
                      height="100"
                      image={news.img}
                      alt={news.title}
                      sx={{ objectFit: 'contain', width: '100px', margin: '16px auto 0 auto' }}
                    />
                    <CardContent sx={{ flexGrow: 1, textAlign: 'left' }}>
                      <Chip label={news.tag} size="small" color="primary" sx={{ mb: 1 }} />
                      <Typography gutterBottom variant="subtitle1" fontWeight={600}>
                        {news.title}
                      </Typography>
                    </CardContent>
                  </a>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Partners */}
      <Partners />
      {/* Footer */}
    </Box>
  );
};

export default Home; 