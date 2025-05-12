import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const partners = [
  {
    name: 'EA Sports',
    logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/04/06/c9fc1dca-fe99-40ab-ab41-be1979ee852d/ea_sports_black_435_x_290_360.png?width=435&height=290',
    type: 'Lead Partner',
    website: 'https://www.ea.com/en-gb/games/ea-sports-fc'
  },
  {
    name: 'Barclays',
    logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/01/26/11fe030b-2b2e-41ed-8f34-be72a8403ea0/Barclays_Sponsor.png?width=230&height=80',
    type: 'Official Bank',
    website: 'https://www.home.barclays/'
  },
  {
    name: 'Guinness',
    logo: 'https://resources.premierleague.pulselive.com/photo-resources/2024/06/12/d5dcc7f8-fbaf-4f12-883b-04620b08506f/Guinness_Partner.jpg?width=435&height=290',
    type: 'Official Beer',
    website: 'https://www.guinness.com/en-gb'
  },
  {
    name: 'Hublot',
    logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/01/26/737c3235-de74-4d72-a2fc-496365258f4b/Hublot_Sponsor.png?width=300&height=150',
    type: 'Official Timekeeper',
    website: 'https://www.hublot.com/'
  },
  {
    name: 'Nike',
    logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/01/26/8016f9bd-4ca7-4a1a-8336-bf9eac81e265/Nike_Sponsor.png?width=222&height=78',
    type: 'Official Ball',
    website: 'https://www.nike.com/gb/w/mens-premier-league-accessories-equipment-2spkszawwpwznik1'
  },
  {
    name: 'Oracle',
    logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/01/26/c3238a2c-d4af-48a2-9345-0b7a82c18cd8/Oracle_Sponsor.png?width=300&height=150',
    type: 'Official Cloud Partner',
    website: 'https://www.oracle.com/premier-league'
  },
  {
    name: 'Avery Dennison',
    logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/01/26/29bca766-5224-4166-b20b-3aac01e67fb9/AD_Sponsor.png?width=280&height=90',
    type: 'Official Licensee',
    website: 'https://sport.averydennison.com/'
  },
  {
    name: 'Panini',
    logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/01/26/e7f37045-a73d-4b09-bfab-93a20044b31a/Panini_Sponsor.png?width=300&height=73',
    type: 'Official Licensee',
    website: 'https://www.panini.co.uk/'
  },
  {
    name: 'Sorare',
    logo: 'https://resources.premierleague.pulselive.com/photo-resources/2024/10/28/cf59f725-738f-4a56-b9cf-5e730101f9d1/SorareSponsor_New.png?width=230&height=80',
    type: 'Official Licensee',
    website: 'https://sorare.com/'
  },
  {
    name: 'Rezzil',
    logo: 'https://resources.premierleague.pulselive.com/photo-resources/2024/06/01/f620e214-5330-4021-b382-183e6b564a64/Rezzil_Logo.png?width=230&height=80',
    type: 'Official Licensee',
    website: 'https://rezzil.com/'
  },
  {
    name: 'Football Manager',
    logo: 'https://resources.premierleague.pulselive.com/photo-resources/2024/06/10/6547dca8-babf-49e5-95d5-ec4bb1744248/FootballManager_Logo.png?width=230&height=80',
    type: 'Official Licensee',
    website: 'https://www.footballmanager.com/'
  }
];

const Partners = () => {
  return (
    <Box sx={{ bgcolor: 'white', py: 4 }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
        <Grid container spacing={4}>
          {partners.map((partner, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={2}
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Box
                component="a"
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              >
                <Box
                  component="img"
                  src={partner.logo}
                  alt={partner.name}
                  sx={{
                    maxHeight: 50,
                    maxWidth: '100%',
                    mb: 1
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    textAlign: 'center',
                    color: '#6C6C6C',
                    fontSize: '0.7rem'
                  }}
                >
                  {partner.type}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Partners; 