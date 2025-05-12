import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Link,
  styled
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Mock data for videos
const featuredVideos = [
  {
    id: 'featured1',
    title: 'Bruno Fernandes checks in on Juan Mata for \'Inside Matters\' campaign',
    description: '"Just a small call makes you feel better" - Man Utd midfielder encourages fans to check in on their loved ones',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/09/eb5f6541-f243-4ba4-b89d-eb8396c276c7/FotoJet-2025-05-09T163711.582.jpg?width=950',
    duration: '03:21'
  },
  {
    id: 'featured2',
    title: 'Watch: The BEST of Liverpool\'s champions celebrations',
    description: 'Relive the magical moments as Liverpool lift the Premier League trophy at Anfield',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/04/28/49982cbc-f730-40df-9fe0-7d310a994dcc/FotoJet-2025-04-28T152952.917.jpg?width=950',
    duration: '03:05'
  },
  {
    id: 'featured3',
    title: 'The Breakdown: How De Bruyne changed the midfield role FOREVER',
    description: 'An in-depth analysis of how Kevin De Bruyne revolutionized the midfield position in modern football',
    image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/04/16/fbfcf6c3-e551-4f7d-bdfb-0fa12a703366/How-De-Bruyne-Changed-The-Midfield-Role-FOREVER.jpg?width=950',
    duration: '10:58'
  }
];

const videoCategories = [
  {
    id: 'latest',
    title: 'Latest Videos',
    moreLink: 'All Videos',
    videos: [
      {
        id: 'latest1',
        title: 'Maresca: We need to win both remaining games',
        duration: '01:03',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/19e98a74-c450-4a70-8dcd-4af1de4bf276/FotoJet-2025-05-11T160027.007.jpg?width=902&height=536'
      },
      {
        id: 'latest2',
        title: '"He was icing a problem" - Howe updates on Batman',
        duration: '00:42',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/85e79921-0bd6-41c3-9007-bd7e482afa0b/FotoJet-2025-05-11T155252.029.jpg?width=902&height=536'
      },
      {
        id: 'latest3',
        title: 'Howe: A \'massive\' win but all eyes now on Arsenal',
        duration: '02:44',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/55c89dd0-6423-46c2-be38-06a916bcf75c/FotoJet-2025-05-11T155112.130.jpg?width=902&height=536'
      },
      {
        id: 'latest4',
        title: 'Liverpool v Arsenal: Watch 10 of the BEST GOALS',
        duration: '03:51',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/08/0248783e-2726-4775-82cd-80bf69b4d2c0/Salah-Van-Persie.jpg?width=902&height=536'
      },
      {
        id: 'latest5',
        title: '\'Claps aren\'t as loud as boos\' - Everything Slot said on Alexander-Arnold',
        duration: '04:53',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/6e1df378-4f3d-4f2c-b350-530fe28d87a5/FotoJet-2025-05-11T202612.563.jpg?width=902&height=536'
      }
    ]
  },
  {
    id: 'liverpool',
    title: 'Liverpool 2024/25 champions',
    moreLink: 'More Videos',
    videos: [
      {
        id: 'liverpool1',
        title: 'Watch: The BEST of Liverpool\'s champions celebrations',
        duration: '03:05',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/04/28/49982cbc-f730-40df-9fe0-7d310a994dcc/FotoJet-2025-04-28T152952.917.jpg?width=902&height=536'
      },
      {
        id: 'liverpool2',
        title: 'The Breakdown: How Arne Slot\'s tactics won Liverpool the Premier League',
        duration: '11:20',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/04/28/6717a598-6034-4de4-96a7-feb7acb5d365/How-Arne-Slot-s-Tactics-Won-Liverpool-The-Premier-League.jpg?width=902&height=536'
      },
      {
        id: 'liverpool3',
        title: 'Watch the BEST GOALS of Liverpool\'s title win',
        duration: '02:26',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/04/18/0eb24199-61ba-4d07-b111-c8556d2056c5/FotoJet-2025-04-18T165649.371.jpg?width=902&height=536'
      },
      {
        id: 'liverpool4',
        title: 'Watch: The KEY moments of Liverpool\'s title win',
        duration: '03:02',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/04/18/0961bc01-cf4c-434d-99ec-2a2368e8703f/FotoJet-2025-04-18T155645.085.jpg?width=902&height=536'
      },
      {
        id: 'liverpool5',
        title: 'Slot: Klopp left a legacy that made my job easier',
        duration: '00:43',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/04/27/155a1291-bafb-4e2c-9c5b-9efcb2f27097/FotoJet-2025-04-27T214043.186.jpg?width=902&height=536'
      }
    ]
  },
  {
    id: 'fantasy',
    title: 'Fantasy Premier League',
    moreLink: 'More Videos',
    videos: [
      {
        id: 'fantasy1',
        title: 'Fantasy Show: Best Triple Captain picks for rest of season',
        duration: '02:42',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/09/701699fe-6da4-43d1-b2b1-b4052256c916/FotoJet-2025-05-09T130819.577.jpg?width=902&height=536'
      },
      {
        id: 'fantasy2',
        title: 'Fantasy Show: Last chance to maximise Assistant Manager chip',
        duration: '02:24',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/09/eb6c5396-3854-4dbd-9f35-ab561884d8d3/FotoJet-2025-05-09T130651.841.jpg?width=902&height=536'
      },
      {
        id: 'fantasy3',
        title: 'Fantasy Show: Watch the Gameweek 36 episode in full',
        duration: '25:58',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2024/08/09/ce9453b6-56ee-49ec-b29d-4b11109db4fa/PLP_FANTASY_SHOW_16_9_CLEAN.png?width=902&height=536'
      },
      {
        id: 'fantasy4',
        title: 'FPL Pod: \'I\'m tempted to bring Haaland back in\'',
        duration: '01:18',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/08/85eca77e-b5df-460f-b668-78b23c091f96/FPL-Haaland-1-.jpg?width=902&height=536'
      },
      {
        id: 'fantasy5',
        title: 'FPL Pod: Should you still target Nottingham Forest players?',
        duration: '01:09',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/08/fc4b41ea-4643-4460-a54a-ad00e2e61c22/FPL-Elanga-Wood.jpg?width=902&height=536'
      }
    ]
  },
  {
    id: 'breakdown',
    title: 'The Breakdown',
    moreLink: 'More Videos',
    videos: [
      {
        id: 'breakdown1',
        title: 'The Breakdown: The UNIQUE talent that makes Morgan Rogers so good',
        duration: '11:39',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/06/0b542b84-1ef1-4f07-8de4-d88cfef30435/The-Unique-Talent-That-Makes-Morgan-Rogers-So-Good.jpg?width=902&height=536'
      },
      {
        id: 'breakdown2',
        title: 'The Breakdown: How Arne Slot\'s tactics won Liverpool the Premier League',
        duration: '11:20',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/04/28/6717a598-6034-4de4-96a7-feb7acb5d365/How-Arne-Slot-s-Tactics-Won-Liverpool-The-Premier-League.jpg?width=902&height=536'
      },
      {
        id: 'breakdown3',
        title: 'The Breakdown: How De Bruyne changed the midfield role FOREVER',
        duration: '10:58',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/04/16/fbfcf6c3-e551-4f7d-bdfb-0fa12a703366/How-De-Bruyne-Changed-The-Midfield-Role-FOREVER.jpg?width=902&height=536'
      }
    ]
  },
  {
    id: 'interviews',
    title: 'Interviews',
    moreLink: 'More Videos',
    videos: [
      {
        id: 'interviews1',
        title: '\'Claps aren\'t as loud as boos\' - Everything Slot said on Alexander-Arnold',
        duration: '04:53',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/6e1df378-4f3d-4f2c-b350-530fe28d87a5/FotoJet-2025-05-11T202612.563.jpg?width=902&height=536'
      },
      {
        id: 'interviews2',
        title: 'Watch: Amorim \'embarrassed\' by Man Utd\'s place in table',
        duration: '01:57',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/f69c0abb-3344-4d19-bad9-4e49d3e4133e/FotoJet-2025-05-11T181230.511.jpg?width=902&height=536'
      },
      {
        id: 'interviews3',
        title: '\'I\'m really upset\' - Arteta\'s passionate reaction to Arsenal\'s draw at Liverpool',
        duration: '02:07',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/25aa5119-0358-436b-9c0f-3ca9cff41a40/FotoJet-2025-05-11T201100.832.jpg?width=902&height=536'
      },
      {
        id: 'interviews4',
        title: 'Watch: Nuno explains full-time chat with owner Marinakis',
        duration: '03:03',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/950fc404-93a2-47f6-8f20-cdbe96981d4b/frame_10497.jpg?width=902&height=536'
      },
      {
        id: 'interviews5',
        title: 'Watch: Amorim hopeful Yoro injury is a \'small\' one',
        duration: '00:20',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/05/11/47153bab-4c12-42a4-a987-7084ef26be45/FotoJet-2025-05-11T180155.060.jpg?width=902&height=536'
      }
    ]
  },
  {
    id: 'best',
    title: 'Best of 2024/25',
    moreLink: 'More Videos',
    videos: [
      {
        id: 'best1',
        title: 'Watch the BEST SKILLS of the season so far',
        duration: '07:41',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/03/21/697f23fa-3130-41a2-8e29-e909edb5647b/FotoJet-2025-03-21T152836.777.jpg?width=902&height=536'
      },
      {
        id: 'best2',
        title: 'Watch the BEST GOALS of the season so far',
        duration: '08:57',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/03/21/0e8a14d3-1bfa-4567-86df-bd14f71b2711/FotoJet-2025-03-21T121628.112.jpg?width=902&height=536'
      },
      {
        id: 'best3',
        title: 'Aston Villa v Forest: Watch Martinez\'s wonder save in reverse fixture',
        duration: '00:27',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2024/12/14/46d34a18-5670-49cd-9b61-a74103f4fa19/2024-12-14T185157Z_1430163983_UP1EKCE1GEJYF_RTRMADP_3_SOCCER-ENGLAND-NFO-AVL-REPORT.JPG?width=902&height=536'
      },
      {
        id: 'best4',
        title: 'Watch the BEST ASSISTS of the season so far',
        duration: '09:33',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/03/23/4b15c56c-4c6f-445f-a586-e2730e25a703/FotoJet-2025-03-23T165449.058.jpg?width=902&height=536'
      },
      {
        id: 'best5',
        title: 'Watch the BEST SAVES of the season so far',
        duration: '07:05',
        image: 'https://resources.premierleague.pulselive.com/photo-resources/2025/03/21/c1127529-2769-4b32-857b-7677acb5a561/FotoJet-2025-03-21T145929.799.jpg?width=902&height=536'
      }
    ]
  }
];

// Styled components
const VideoTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 700,
  lineHeight: 1.2,
  color: '#37003c',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#37003c',
  marginBottom: '1rem',
}));

const DurationBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 8,
  left: 8,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  padding: '2px 8px',
  borderRadius: 4,
  fontSize: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

const PlayButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#00ff85',
  color: '#37003c',
  textTransform: 'none',
  fontWeight: 700,
  padding: '12px 24px',
  fontSize: '1rem',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#00e67a',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  }
}));

const MoreLink = styled(Link)(({ theme }) => ({
  color: '#37003c',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.875rem',
  fontWeight: 600,
  '&:hover': {
    textDecoration: 'underline',
  },
}));

// Video card component
const VideoCard = ({ video }: { video: { image: string; title: string; duration: string } }) => {
  return (
    <Card sx={{ boxShadow: 'none', borderRadius: 0 }}>
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={video.image}
          alt={video.title}
          sx={{
            height: 140,
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.06)',
            },
            cursor: 'pointer',
          }}
        />
        <DurationBadge>
          <PlayArrowIcon fontSize="small" />
          {video.duration}
        </DurationBadge>
      </Box>
      <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
        <Typography variant="caption" component="div" sx={{ color: '#6c6c6c', mb: 0.5 }}>
          Video
        </Typography>
        <VideoTitle>
          {video.title}
        </VideoTitle>
      </CardContent>
    </Card>
  );
};

// Video category section component
const VideoCategory = ({ category }: { 
  category: { 
    id: string;
    title: string; 
    moreLink: string; 
    videos: { 
      id: string; 
      image: string; 
      title: string; 
      duration: string; 
    }[] 
  } 
}) => {
  return (
    <Box sx={{ mb: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <CategoryTitle variant="h2">
          {category.title}
        </CategoryTitle>
        <MoreLink href="#">
          {category.moreLink}
          <ArrowForwardIcon sx={{ fontSize: 16, ml: 0.5 }} />
        </MoreLink>
      </Box>
      <Grid container spacing={2}>
        {category.videos.map((video) => (
          <Grid item xs={12} sm={6} md={2.4} key={video.id}>
            <VideoCard video={video} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Dot indicator cho featured video
const DotIndicator = ({ count, activeIndex }: { count: number; activeIndex: number }) => (
  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
    {Array.from({ length: count }).map((_, idx) => (
      <Box
        key={idx}
        sx={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: '2px solid white',
          backgroundColor: idx === activeIndex ? 'white' : 'transparent',
          transition: 'background 0.2s',
        }}
      />
    ))}
  </Box>
);

const Video = () => {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  const handlePrev = () => {
    setCurrentFeaturedIndex(prev => (prev > 0 ? prev - 1 : featuredVideos.length - 1));
  };

  const handleNext = () => {
    setCurrentFeaturedIndex(prev => (prev < featuredVideos.length - 1 ? prev + 1 : 0));
  };

  const currentFeaturedVideo = featuredVideos[currentFeaturedIndex];

  return (
    <Box sx={{ backgroundColor: '#f8f8f8', minHeight: '100vh', pb: 6 }}>
      {/* Featured Video Hero Section */}
      <Box sx={{
        backgroundColor: '#37003c',
        color: 'white',
        py: 3,
        mb: 4
      }}>
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                  {currentFeaturedVideo.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255,255,255,0.9)' }}>
                  {currentFeaturedVideo.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PlayButton
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                  >
                    Watch Video
                  </PlayButton>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      onClick={handlePrev}
                      sx={{
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                      }}
                      size="small"
                    >
                      <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={handleNext}
                      sx={{
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                      }}
                      size="small"
                    >
                      <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box sx={{ position: 'relative', height: '100%', minHeight: 300, overflow: 'hidden' }}>
                <Box
                  component="img"
                  src={currentFeaturedVideo.image}
                  alt={currentFeaturedVideo.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.06)',
                    },
                    cursor: 'pointer',
                  }}
                />
                {/* Duration ở góc trái dưới cùng */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                  }}
                >
                  <PlayArrowIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Box component="span" sx={{ fontSize: '0.85rem' }}>
                    {currentFeaturedVideo.duration}
                  </Box>
                </Box>
                {/* Dot indicator ở góc phải dưới cùng */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                  }}
                >
                  <DotIndicator count={featuredVideos.length} activeIndex={currentFeaturedIndex} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Video Categories */}
      <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
        {videoCategories.map((category) => (
          <VideoCategory key={category.id} category={category} />
        ))}
      </Container>
    </Box>
  );
};

export default Video;
