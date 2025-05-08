import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  useMediaQuery,
  useTheme,
  styled
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ClearIcon from '@mui/icons-material/Clear';

import plmainlogo from '../../assets/pl-main-logo.png';
import './style.css';

// Danh sách câu lạc bộ
const clubs = [
  { name: 'Arsenal', id: 3, url: 'http://www.arsenal.com' },
  { name: 'Aston Villa', id: 7, url: 'https://www.avfc.co.uk' },
  { name: 'AFC Bournemouth', id: 91, url: 'https://www.afcb.co.uk' },
  { name: 'Brentford', id: 94, url: 'https://www.brentfordfc.com' },
  { name: 'Brighton & Hove Albion', id: 36, url: 'https://www.brightonandhovealbion.com' },
  { name: 'Chelsea', id: 8, url: 'https://www.chelseafc.com' },
  { name: 'Crystal Palace', id: 31, url: 'http://www.cpfc.co.uk' },
  { name: 'Everton', id: 11, url: 'http://www.evertonfc.com' },
  { name: 'Fulham', id: 54, url: 'https://www.fulhamfc.com' },
  { name: 'Ipswich Town', id: 40, url: 'https://www.itfc.co.uk' },
  { name: 'Leicester', id: 13, url: 'https://www.lcfc.com' },
  { name: 'Liverpool', id: 14, url: 'http://www.liverpoolfc.com' },
  { name: 'Manchester City', id: 43, url: 'https://www.mancity.com' },
  { name: 'Manchester United', id: 1, url: 'http://www.manutd.com' },
  { name: 'Newcastle United', id: 4, url: 'https://www.newcastleunited.com' },
  { name: 'Nottingham Forest', id: 17, url: 'https://www.nottinghamforest.co.uk' },
  { name: 'Southampton', id: 20, url: 'https://www.southamptonfc.com' },
  { name: 'Tottenham Hotspur', id: 6, url: 'http://www.tottenhamhotspur.com' },
  { name: 'West Ham United', id: 21, url: 'http://www.whufc.com' },
  { name: 'Wolverhampton Wanderers', id: 39, url: 'https://www.wolves.co.uk' },
];

// Menu chính
const mainNavItems = [
  {
    text: 'Premier League',
    path: '/',
    active: true,
    submenu: [
      { text: 'Home', path: '/' },
      { text: 'Fixtures', path: '/fixtures' },
      { text: 'Results', path: '/results' },
      { text: 'Tables', path: '/tables' },
      { text: 'Transfers', path: '/transfers' },
      { text: 'Injury news', path: '/latest-player-injuries' },
      { text: 'Stats', path: '/stats' },
      { text: 'News', path: '/news' },
      { text: 'Video', path: '/video' },
      { text: 'Watch Live', path: '/broadcast-schedules' },
      { text: 'Tickets', path: '/tickets' },
      { text: 'Clubs', path: '/clubs' },
      { text: 'Players', path: '/players' },
      { text: 'Awards', path: '/awards' },
    ]
  },
  {
    text: 'Fantasy',
    path: '/fantasy',
    submenu: [
      { text: 'Fantasy', path: '/fantasy' },
      { text: 'Fantasy Challenge', path: '/fpl-challenge' },
      { text: 'Fantasy Draft', path: '/draft' },
    ]
  },
  {
    text: 'Football & Community',
    path: '/footballandcommunity',
    submenu: [
      { text: 'Wider Football', path: '/footballandcommunity/wider-football' },
      { text: 'PL Charitable Fund', path: '/footballandcommunity/premier-league-charitable-fund' },
      { text: 'Community', path: '/footballandcommunity/community' },
      { text: 'Youth Development', path: '/footballandcommunity/youth-development' },
      { text: 'No Room for Racism', path: '/footballandcommunity/NoRoomForRacism' },
      { text: 'Inside Matters', path: '/insidematters' },
      { text: 'Rainbow Laces', path: '/footballandcommunity/RainbowLaces' },
      { text: 'Poppy', path: '/footballandcommunity/poppy' },
      { text: 'More than a game', path: '/morethanagame' },
    ]
  },
  {
    text: 'About',
    path: '/about',
    submenu: [
      { text: 'Overview', path: '/about' },
      { text: 'What we do', path: '/about/what-we-do' },
      { text: 'Governance', path: '/about/governance' },
      { text: 'Statement of Principles', path: '/about/statement-of-principles' },
      { text: 'Inclusion', path: '/about/inclusion' },
      { text: 'Publications', path: '/about/publications' },
      { text: 'Partners', path: '/about/partners' },
      { text: 'Legal', path: '/about/legal' },
      { text: 'Safeguarding', path: '/about/safeguarding' },
      { text: 'Careers', path: '/about/careers' },
      { text: 'Media', path: '/about/media' },
      { text: 'Gender Pay Gap Reports', path: '/gender-pay-gap-report' },
      { text: 'Sustainability', path: '/sustainability' },
    ]
  },
  {
    text: 'More',
    submenu: [
      { text: 'History', path: '/history' },
      { text: 'Hall of Fame', path: '/hall-of-fame' },
      { text: 'Referees', path: '/referees/overview' },
      { text: 'Managers', path: '/managers' },
      { text: 'Man of the Match', path: '/man-of-the-match' },
      { text: 'ePremier League', path: '/epl' },
      { text: 'Nike Ball Hub', path: '/nike-ball-hub' },
      { text: 'FAQs', path: '/contact/faqs' },
      { text: 'Contact Us', path: '/contact' },
      { text: 'Tickets', path: '/tickets' },
      { text: 'Summer Series', path: '/summerseries' },
      { text: 'Mornings Live', path: '/morningslive' },
      { text: 'PL Player', path: '/pl-player' },
    ]
  },
  {
    text: 'Summer Series',
    path: '/summerseries',
    featured: true,
  },
];

// Submenu
const subNavItems = [
  { text: 'Home', path: '/' },
  { text: 'Fixtures', path: '/fixtures' },
  { text: 'Results', path: '/results' },
  { text: 'Tables', path: '/tables' },
  { text: 'Transfers', path: '/transfers' },
  { text: 'Injury news', path: '/latest-player-injuries' },
  { text: 'Stats', path: '/stats' },
  { text: 'News', path: '/news' },
  { text: 'Video', path: '/video' },
  { text: 'Watch Live', path: '/broadcast-schedules' },
  { text: 'Tickets', path: '/tickets' },
  { text: 'Clubs', path: '/clubs' },
  { text: 'Players', path: '/players' },
  { text: 'Awards', path: '/awards' },
];

// Styled components
const SearchInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '44px',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));

const VisuallyHidden = styled('span')({
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: '1px',
});

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clubsMenuOpen, setClubsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const clubsMenuRef = useRef<HTMLElement | null>(null);
  const [searchValue, setSearchValue] = useState('');

  // Xử lý mở menu mobile
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Xử lý mở menu clubs
  const handleClubsMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    clubsMenuRef.current = event.currentTarget;
    setClubsMenuOpen(!clubsMenuOpen);
  };

  // Xử lý đóng menu clubs
  const handleClubsMenuClose = () => {
    setClubsMenuOpen(false);
  };

  // Xử lý mở/đóng dropdown menu
  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Xử lý mở thanh tìm kiếm
  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  // Xử lý xóa text tìm kiếm
  const handleClearSearch = () => {
    setSearchValue('');
  };

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown !== null && !(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  return (
    <header className="masthead">
      {/* Skip links */}
      <a className="sr-only focus:not-sr-only" href="#mainNav">Skip to main navigation</a>
      <a className="sr-only focus:not-sr-only" href="#mainContent">Skip to main content</a>

      {/* Club navigation */}
      <nav className="bg-white border-b border-gray-200" role="menubar">
        <Container maxWidth={false} sx={{ maxWidth: '1440px' }}>
          <Box
            onClick={handleClubsMenuClick}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              py: 1,
              fontWeight: 600
            }}
          >
            <Typography component="h4" variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' , fontWeight : 700 }}>
              Club sites
              <OpenInNewIcon sx={{ ml: 1, fontSize: 16 }} />
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                overflowX: 'auto',
                alignItems: 'center',
                py: 1,
                gap: 0.8,
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {clubs.map((club) => (
                <Box
                  key={club.id}
                  component="a"
                  href={club.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mx: 1,
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.1)' },
                  }}
                >
                  <Box
                    component="img"
                    src={`https://resources.premierleague.com/premierleague/badges/50/t${club.id}.png`}
                    alt={club.name}
                    sx={{ width: 32, height: 32 }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Container>

        <Popover
          open={clubsMenuOpen}
          anchorEl={clubsMenuRef.current}
          onClose={handleClubsMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              width: '100%',
              maxWidth: '1440px',
              maxHeight: 460,
              ml: { xs: 0, md: 'auto' },
              mr: { xs: 0, md: 'auto' },
              left: '0 !important',
              right: '0 !important',
              borderRadius: 0
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)' },
                gap: 2
              }}
            >
              {clubs.map((club) => (
                <Box
                  key={club.id}
                  component="a"
                  href={club.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                    p: 1,
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={`https://resources.premierleague.com/premierleague/badges/50/t${club.id}.png`}
                    srcSet={`https://resources.premierleague.com/premierleague/badges/50/t${club.id}@x2.png 2x`}
                    alt={club.name}
                    sx={{ width: 40, height: 40, mr: 1 }}
                  />
                  <Typography variant="body2">{club.name}</Typography>
                  <VisuallyHidden>{club.name}</VisuallyHidden>
                </Box>
              ))}
            </Box>
          </Box>
        </Popover>
      </nav>

      {/* Main navigation */}
      <AppBar
        position="sticky"
        color="primary"
        sx={{
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: '1440px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            {/* Logo */}
            <Link to="/" className="inline-block py-3">
              <Box
                component="img"
                src={plmainlogo}
                alt="Premier League"
                sx={{
                  height: { xs: 40, md: 50 },
                  mr: { xs: 2, md: 4 }
                }}
              />
            </Link>

            {/* Main Nav - Desktop */}
            {!isMobile && (
              <Box
                component="nav"
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                  '& > div': {
                    position: 'relative',
                  }
                }}
                id="mainNav"
              >
                {mainNavItems.map((item, index) => (
                  <Box
                    key={item.text}
                    className="dropdown-container"
                    sx={{
                      position: 'relative',
                      '&:hover': {
                        bgcolor: item.submenu ? 'rgba(255,255,255,0.1)' : 'transparent',
                      },
                    }}
                  >
                    <Box
                      component={item.submenu ? 'div' : Link}
                      to={!item.submenu ? item.path : undefined}
                      onClick={item.submenu ? () => handleDropdownToggle(index) : undefined}
                      aria-haspopup={item.submenu ? 'true' : undefined}
                      tabIndex={0}
                      role="menuitem"
                      sx={{
                        px: 2,
                        py: 3,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        fontWeight: item.active ? 700 : 400,
                      }}
                    >
                      <Typography component="span" variant="body1">{item.text}</Typography>
                      {item.submenu && <ExpandMoreIcon sx={{ ml: 0.5, fontSize: 18 }} />}
                    </Box>

                    {item.submenu && (
                      <Box
                        sx={{
                          display: activeDropdown === index ? 'block' : 'none',
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          width: 220,
                          bgcolor: 'white',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                          zIndex: 100,
                          py: 1,
                        }}
                        aria-hidden={activeDropdown !== index}
                        role="menu"
                      >
                        <List disablePadding>
                          {item.submenu.map((subItem) => (
                            <ListItem
                              key={subItem.text}
                              disablePadding
                              component={Link}
                              to={subItem.path}
                              onClick={() => setActiveDropdown(null)}
                              sx={{
                                pl: 2,
                                pr: 3,
                                py: 1,
                                color: 'text.primary',
                                textDecoration: 'none',
                                '&:hover': {
                                  bgcolor: 'rgba(0,0,0,0.04)'
                                }
                              }}
                              role="menuitem"
                            >
                              <ListItemText
                                primary={subItem.text}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <Box sx={{ ml: 'auto' }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleMobileMenuToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}

            {/* Search & Sign in buttons */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="inherit" aria-label="search" onClick={handleSearchToggle}>
                  <SearchIcon />
                </IconButton>

                <Link
                  to="/signin"
                  className="text-white hover:text-gray-200 ml-4 font-medium"
                  style={{ textDecoration: 'none' }}
                >
                  Sign in
                </Link>
              </Box>
            )}
          </Box>
        </Container>

        {/* Sub Navigation */}
        <Box
          sx={{
            bgcolor: 'rgba(255,255,255,0.1)',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Container maxWidth={false} sx={{ maxWidth: '1440px' }}>
            <Box
              component="nav"
              className="subNav"
              sx={{
                display: 'flex',
                overflowX: 'auto',
                '&::-webkit-scrollbar': {
                  display: 'none'
                },
                scrollbarWidth: 'none',
              }}
            >
              {subNavItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.path}
                  className="text-white hover:text-gray-200 text-sm whitespace-nowrap px-3 py-2 gradient-underline "
                  style={{ textDecoration: 'none' }}
                >
                  {item.text}
                </Link>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            height: searchOpen ? 'auto' : 0,
            overflow: 'hidden',
            transition: 'height 0.3s ease',
            bgcolor: 'white',
            borderTop: searchOpen ? '1px solid #e0e0e0' : 'none',
          }}
        >
          <Container maxWidth={false} sx={{ maxWidth: '1440px', py: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                bgcolor: '#f5f5f5',
                borderRadius: 1,
              }}
            >
              <SearchIcon
                sx={{
                  position: 'absolute',
                  left: 10,
                  color: 'text.secondary'
                }}
              />
              <SearchInput
                placeholder="Search for News, Players & Clubs"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                fullWidth
              />
              {searchValue && (
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', right: 10 }}
                  onClick={handleClearSearch}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Container>
        </Box>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: 400,
            bgcolor: 'primary.main',
            color: 'white',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box component="img" src={plmainlogo} alt="Premier League" sx={{ height: 36 }} />
          <IconButton color="inherit" onClick={handleMobileMenuToggle}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {mainNavItems.map((item) => (
            <ListItem
              key={item.text}
              component={item.submenu ? 'div' : Link}
              to={!item.submenu ? item.path : undefined}
              onClick={!item.submenu ? handleMobileMenuToggle : undefined}
              sx={{
                display: 'block',
                py: 0,
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  fontWeight: item.active ? 700 : 500,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Typography variant="body1">{item.text}</Typography>
                {item.submenu && <ExpandMoreIcon />}
              </Box>

              {item.submenu && (
                <List sx={{ bgcolor: 'rgba(0,0,0,0.2)', pb: 1 }}>
                  {item.submenu.map((subItem) => (
                    <ListItem
                      key={subItem.text}
                      component={Link}
                      to={subItem.path}
                      onClick={handleMobileMenuToggle}
                      sx={{
                        pl: 4,
                        py: 1,
                        color: 'rgba(255,255,255,0.9)',
                      }}
                    >
                      <ListItemText
                        primary={subItem.text}
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { fontWeight: 400 }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </ListItem>
          ))}

          <ListItem sx={{ pt: 2 }}>
            <Box component="form" sx={{ width: '100%', position: 'relative' }}>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 10,
                  transform: 'translateY(-50%)',
                  color: 'white'
                }}
                size="small"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search..."
                sx={{
                  width: '100%',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  px: 5,
                  py: 1,
                  color: 'white',
                  '&::placeholder': {
                    color: 'rgba(255,255,255,0.7)',
                    opacity: 1,
                  },
                }}
              />
            </Box>
          </ListItem>
        </List>
      </Drawer>
    </header>
  );
};

export default Header; 