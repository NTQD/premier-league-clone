import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  Divider
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

import plLogo from '../../assets/pl-logo.svg';

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
  }
];

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', mt: 4 }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, py: 6 }}>
        <Grid container spacing={4}>
          {/* Logo and social links */}
          <Grid item xs={12} md={3}>
            <Box className="flex flex-col space-y-4">
              <img 
                src={plLogo} 
                alt="Premier League" 
                className="h-16 w-auto" 
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
            <Grid item xs={6} sm={3} md={2} key={section.title}>
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
                      className="text-white hover:text-pl-turquoise text-sm"
                    >
                      {link.text}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
        
        {/* Sponsors */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
            Official Partners
          </Typography>
          <Grid container spacing={3}>
            {/* Sponsor logos would go here */}
            {Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={4} sm={2} key={index}>
                <Box 
                  sx={{ 
                    height: 60, 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    Sponsor {index + 1}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />
        
        {/* Copyright */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            © PREMIER LEAGUE {new Date().getFullYear()}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm">
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 