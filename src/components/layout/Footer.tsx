import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  Divider
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

import plmainlogo from '../../assets/premier-league-logo-header-full.png';


const footerLinks = [
  {
    title: 'Premier League',
    links: [
      { text: 'Home', path: '/' },
      { text: 'Fixtures', path: '/fixtures' },
      { text: 'Results', path: '/results' },
      { text: 'Tables', path: '/tables' },
      { text: 'News', path: '/news' },
      { text: 'Video', path: '/video' },
      { text: 'Clubs', path: '/clubs' },
      { text: 'Players', path: '/players' },
    ]
  },
  {
    title: 'Fantasy',
    links: [
      { text: 'FPL Home', path: '/fantasy' },
      { text: 'My Team', path: '/fantasy/my-team' },
      { text: 'Transfers', path: '/fantasy/transfers' },
      { text: 'Leagues', path: '/fantasy/leagues' },
      { text: 'Statistics', path: '/fantasy/statistics' },
    ]
  },
  {
    title: 'About',
    links: [
      { text: 'Overview', path: '/about' },
      { text: 'What we do', path: '/about/what-we-do' },
      { text: 'Inclusion', path: '/about/inclusion' },
      { text: 'Communities', path: '/communities' },
      { text: 'Safeguarding', path: '/about/safeguarding' },
      { text: 'History', path: '/history' },
    ]
  },
  {
    title: 'More',
    links: [
      { text: 'Stats', path: '/stats' },
      { text: 'Partners', path: '/partners' },
      { text: 'Contact Us', path: '/contact' },
      { text: 'Careers', path: '/careers' },
      { text: 'FAQs', path: '/faqs' },
    ]
  },
  {
    title: 'Social',
    links: [
      { text: 'PL on YouTube', path: 'https://www.youtube.com/premierleague' },
      { text: 'PL on Tik Tok', path: 'https://www.tiktok.com/@premierleague' },
      { text: 'PL on Facebook', path: 'https://www.facebook.com/premierleague' },
      { text: 'FPL on Facebook', path: 'https://www.facebook.com/OfficialFPL/' },
      { text: 'PL on X', path: 'https://twitter.com/premierleague' },
      { text: 'FPL on X', path: 'https://twitter.com/OfficialFPL' },
      { text: 'PL Communities on X', path: 'https://twitter.com/PLCommunities' },
      { text: 'PL Youth on X', path: 'https://twitter.com/PLYouth' },
      { text: 'PL on Instagram', path: 'https://www.instagram.com/premierleague' },
      { text: 'PL on Whatsapp', path: 'https://preml.ge/plwhatsapp' },
      { text: 'PL USA on X', path: 'https://twitter.com/PLinUSA' },
      { text: 'PL USA on Instagram', path: 'https://www.instagram.com/plinusa/' },
      { text: 'La Premier on Instagram', path: 'https://www.instagram.com/lapremierleague/' },
      { text: 'PL India on X', path: 'https://twitter.com/PLforIndia' },
      { text: 'PL India on Instagram', path: 'https://www.instagram.com/plforindia/' },
      { text: 'PL Arabic on X', path: 'https://twitter.com/PLinArabic' },
      { text: 'PL Arabic on Instagram', path: 'https://www.instagram.com/plinarabic/' },
      { text: 'La Premier on TikTok', path: 'https://www.tiktok.com/@lapremierleague' },
      { text: 'PL Music on Spotify', path: 'https://open.spotify.com/user/plplaylists' },
    ]
  },
];

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', mt: 4 }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, py: 6 }}>
        <Grid container spacing={4} columns={18}>
          {/* Logo and social links */}
          <Grid item xs={18} md={3}>
            <Box className="flex flex-col space-y-4">
              <img
                src={plmainlogo}
                alt="Premier League"
                className="h-16 w-auto max-w-full object-contain"
              />
              <Box className="flex space-x-4 mt-4">
                <FacebookIcon className="text-white hover:text-pl-turquoise cursor-pointer" />
                <TwitterIcon className="text-white hover:text-pl-turquoise cursor-pointer" />
                <InstagramIcon className="text-white hover:text-pl-turquoise cursor-pointer" />
                <YouTubeIcon className="text-white hover:text-pl-turquoise cursor-pointer" />
              </Box>
            </Box>
          </Grid>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <Grid item xs={18} sm={6} md={3} key={section.title}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: '1rem'
                }}
              >
                {section.title}
              </Typography>
              <List disablePadding>
                {section.links.map((link) => (
                  <ListItem key={link.text} disablePadding sx={{ mb: 1 }}>
                    <Link
                      to={link.path}
                      className=" hover:text-pl-turquoise text-sm"
                      style={{ textDecoration: 'none', color: '#ccc' }}
                    >
                      {link.text}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />

        {/* Copyright */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            © PREMIER LEAGUE {new Date().getFullYear()}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm"
              style={{ textDecoration: 'none' }}>
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm"
              style={{ textDecoration: 'none' }}>
              • Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm"
              style={{ textDecoration: 'none' }}>
              • Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 