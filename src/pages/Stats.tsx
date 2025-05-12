import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Grid,
  Paper,
  Button,
  Avatar,
  Stack,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Define Tab items
const statsTabs = [
  'Dashboard',
  'Player Stats',
  'Club Stats',
  'All-time Stats',
  'Milestones',
  'Records',
  'Head-to-Head',
  'Player Comparison',
];

// Top 10 Players by Goals
const goalsData = [
  {
    rank: 1,
    name: 'Mohamed Salah',
    club: 'Liverpool',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p118748.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t14.png',
    value: 28
  },
  {
    rank: 2,
    name: 'Alexander Isak',
    club: 'Newcastle',
    img: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p219168.png',
    value: 21
  },
  {
    rank: 3,
    name: 'Erling Haaland',
    club: 'Man City',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p223094.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t43.png',
    value: 20
  },
  {
    rank: 4,
    name: 'Chris Wood',
    club: 'Nottm Forest',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p60689.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t17.png',
    value: 20
  },
  {
    rank: 5,
    name: 'Bryan Mbeumo',
    club: 'Brentford',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p437742.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t94.png',
    value: 18
  },
  {
    rank: 6,
    name: 'Yoane Wissa',
    club: 'Brentford',
    img: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p216646.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t8.png',
    value: 16
  },
  {
    rank: 7,
    name: 'Cole Palmer',
    club: 'Chelsea',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p244851.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t8.png',
    value: 16
  },
  {
    rank: 8,
    name: 'Ollie Watkins',
    club: 'Aston Villa',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p178301.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t7.png',
    value: 16
  },
  {
    rank: 9,
    name: 'Phil Foden',
    club: 'Man City',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p209244.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t43.png',
    value: 15
  },
  {
    rank: 10,
    name: 'Jean-Philippe Mateta',
    club: 'Crystal Palace',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p244711.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t31.png',
    value: 14
  },
];

// Top 10 Players by Assists
const assistsData = [
  {
    rank: 1,
    name: 'Mohamed Salah',
    club: 'Liverpool',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p118748.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t14.png',
    value: 18
  },
  {
    rank: 2,
    name: 'Jacob Murphy',
    club: 'Newcastle',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p153127.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t4.png',
    value: 12
  },
  {
    rank: 3,
    name: 'Pascal Groß',
    club: 'Brighton',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p80607.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t36.png',
    value: 10
  },
  {
    rank: 4,
    name: 'Anthony Elanga',
    club: 'Nottm Forest',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p449434.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t17.png',
    value: 10
  },
  {
    rank: 5,
    name: 'Antoine Robinson',
    club: 'Fulham',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p244731.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t54.png',
    value: 10
  },
  {
    rank: 6,
    name: 'Gabriel Jesus',
    club: 'Arsenal',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p205651.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t3.png',
    value: 10
  },
  {
    rank: 7,
    name: 'Bruno Fernandes',
    club: 'Man Utd',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p141746.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t1.png',
    value: 9
  },
  {
    rank: 8,
    name: 'Morgan Rogers',
    club: 'Aston Villa',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p449990.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t7.png',
    value: 9
  },
  {
    rank: 9,
    name: 'Son Heung-min',
    club: 'Tottenham',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p85971.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t6.png',
    value: 9
  },
  {
    rank: 10,
    name: 'Eberechi Eze',
    club: 'Crystal Palace',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p221273.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t31.png',
    value: 8
  },
];

// Top 10 Players by Passes
const passesData = [
  {
    rank: 1,
    name: 'Virgil van Dijk',
    club: 'Liverpool',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p97032.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t14.png',
    value: 2814
  },
  {
    rank: 2,
    name: 'William Saliba',
    club: 'Arsenal',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p462424.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t3.png',
    value: 2517
  },
  {
    rank: 3,
    name: 'Joël Matip',
    club: 'Liverpool',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p60914.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t14.png',
    value: 2493
  },
  {
    rank: 4,
    name: 'Stefan Ortega',
    club: 'Man City',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p41461.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t43.png',
    value: 2490
  },
  {
    rank: 5,
    name: 'Moisés Caicedo',
    club: 'Chelsea',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p474291.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t8.png',
    value: 2172
  },
  {
    rank: 6,
    name: 'João Palhinha',
    club: 'Fulham',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p168281.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t54.png',
    value: 2129
  },
  {
    rank: 7,
    name: 'Curtis Jones',
    club: 'Liverpool',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p206915.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t14.png',
    value: 2097
  },
  {
    rank: 8,
    name: 'Nicolas Domínguez',
    club: 'Nottm Forest',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p241158.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t17.png',
    value: 2054
  },
  {
    rank: 9,
    name: 'Taylor Harwood-Bellis',
    club: 'Southampton',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p232794.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t20.png',
    value: 2054
  },
  {
    rank: 10,
    name: 'Lewis Dunk',
    club: 'Brighton',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p83299.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t36.png',
    value: 1934
  },
];

// Top 10 Players by Clean Sheets
const cleanSheetsData = [
  {
    rank: 1,
    name: 'Matz Sels',
    club: 'Nottm Forest',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p85633.png',
    value: 13
  },
  {
    rank: 2,
    name: 'David Raya',
    club: 'Arsenal',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p154561.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t3.png',
    value: 12
  },
  {
    rank: 3,
    name: 'Dean Henderson',
    club: 'Crystal Palace',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p172649.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t31.png',
    value: 11
  },
  {
    rank: 4,
    name: 'Jordan Pickford',
    club: 'Everton',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p111234.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t11.png',
    value: 10
  },
  {
    rank: 5,
    name: 'Alisson Becker',
    club: 'Liverpool',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p116535.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t14.png',
    value: 9
  },
  {
    rank: 6,
    name: 'Bart Verbruggen',
    club: 'Brighton',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p461422.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t36.png',
    value: 9
  },
  {
    rank: 7,
    name: 'Nick Pope',
    club: 'Newcastle',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p98747.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t4.png',
    value: 8
  },
  {
    rank: 8,
    name: 'Robert Sánchez',
    club: 'Chelsea',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p215059.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t8.png',
    value: 8
  },
  {
    rank: 9,
    name: 'Emi Martínez',
    club: 'Aston Villa',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p98980.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t7.png',
    value: 7
  },
  {
    rank: 10,
    name: 'Neto',
    club: 'Bournemouth',
    img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p40349.png',
    clubImg: 'https://resources.premierleague.com/premierleague/badges/70/t91.png',
    value: 7
  },
];

// Club stats data
const clubGoalsData = [
  { rank: 1, name: 'Liverpool', img: 'https://resources.premierleague.com/premierleague/badges/70/t14.png', stadium: 'at Anfield, Liverpool', value: 85 },
  { rank: 2, name: 'Newcastle', img: 'https://resources.premierleague.com/premierleague/badges/70/t4.png', stadium: 'at St. James\' Park', value: 84 },
  { rank: 3, name: 'Man City', img: 'https://resources.premierleague.com/premierleague/badges/70/t43.png', stadium: 'at Etihad Stadium', value: 76 },
  { rank: 4, name: 'Arsenal', img: 'https://resources.premierleague.com/premierleague/badges/70/t3.png', stadium: 'at Emirates Stadium', value: 66 },
  { rank: 5, name: 'Brentford', img: 'https://resources.premierleague.com/premierleague/badges/70/t94.png', stadium: 'at Gtech Community Stadium', value: 63 },
  { rank: 6, name: 'Tottenham', img: 'https://resources.premierleague.com/premierleague/badges/70/t6.png', stadium: 'at Tottenham Hotspur Stadium', value: 63 },
  { rank: 7, name: 'Chelsea', img: 'https://resources.premierleague.com/premierleague/badges/70/t8.png', stadium: 'at Stamford Bridge', value: 61 },
  { rank: 8, name: 'Brighton', img: 'https://resources.premierleague.com/premierleague/badges/70/t36.png', stadium: 'at American Express Stadium', value: 59 },
  { rank: 9, name: 'Aston Villa', img: 'https://resources.premierleague.com/premierleague/badges/70/t7.png', stadium: 'at Villa Park', value: 56 },
  { rank: 10, name: 'Nottm Forest', img: 'https://resources.premierleague.com/premierleague/badges/70/t17.png', stadium: 'at City Ground', value: 56 },
];

const clubTacklesData = [
  { rank: 1, name: 'Man Utd', img: 'https://resources.premierleague.com/premierleague/badges/70/t1.png', stadium: 'at Warwick Stadium', value: 774 },
  { rank: 2, name: 'West Ham', img: 'https://resources.premierleague.com/premierleague/badges/70/t21.png', stadium: 'at London Stadium', value: 739 },
  { rank: 3, name: 'Everton', img: 'https://resources.premierleague.com/premierleague/badges/70/t11.png', stadium: 'at Goodison Park', value: 694 },
  { rank: 4, name: 'Leicester', img: 'https://resources.premierleague.com/premierleague/badges/70/t13.png', stadium: 'at King Power Stadium', value: 685 },
  { rank: 5, name: 'Bournemouth', img: 'https://resources.premierleague.com/premierleague/badges/70/t91.png', stadium: 'at Vitality Stadium', value: 667 },
  { rank: 6, name: 'Brighton', img: 'https://resources.premierleague.com/premierleague/badges/70/t36.png', stadium: 'at American Express Stadium', value: 660 },
  { rank: 7, name: 'Nottm Forest', img: 'https://resources.premierleague.com/premierleague/badges/70/t17.png', stadium: 'at City Ground', value: 651 },
  { rank: 8, name: 'Fulham', img: 'https://resources.premierleague.com/premierleague/badges/70/t54.png', stadium: 'at Craven Cottage', value: 642 },
  { rank: 9, name: 'Spurs', img: 'https://resources.premierleague.com/premierleague/badges/70/t6.png', stadium: 'at Tottenham Hotspur Stadium', value: 639 },
  { rank: 10, name: 'Brentford', img: 'https://resources.premierleague.com/premierleague/badges/70/t94.png', stadium: 'at Gtech Community Stadium', value: 629 },
];

const clubWinsData = [
  { rank: 1, name: 'Liverpool', img: 'https://resources.premierleague.com/premierleague/badges/70/t14.png', stadium: 'at Anfield, Liverpool', value: 25 },
  { rank: 2, name: 'Man City', img: 'https://resources.premierleague.com/premierleague/badges/70/t43.png', stadium: 'at Etihad Stadium', value: 23 },
  { rank: 3, name: 'Arsenal', img: 'https://resources.premierleague.com/premierleague/badges/70/t3.png', stadium: 'at Emirates Stadium', value: 18 },
  { rank: 4, name: 'Aston Villa', img: 'https://resources.premierleague.com/premierleague/badges/70/t7.png', stadium: 'at Villa Park', value: 18 },
  { rank: 5, name: 'Chelsea', img: 'https://resources.premierleague.com/premierleague/badges/70/t8.png', stadium: 'at Stamford Bridge', value: 18 },
  { rank: 6, name: 'Nottm Forest', img: 'https://resources.premierleague.com/premierleague/badges/70/t17.png', stadium: 'at City Ground', value: 16 },
  { rank: 7, name: 'Bournemouth', img: 'https://resources.premierleague.com/premierleague/badges/70/t91.png', stadium: 'at Vitality Stadium', value: 14 },
  { rank: 8, name: 'Brighton', img: 'https://resources.premierleague.com/premierleague/badges/70/t36.png', stadium: 'at American Express Stadium', value: 14 },
  { rank: 9, name: 'Newcastle', img: 'https://resources.premierleague.com/premierleague/badges/70/t4.png', stadium: 'at St. James\' Park', value: 14 },
  { rank: 10, name: 'Fulham', img: 'https://resources.premierleague.com/premierleague/badges/70/t54.png', stadium: 'at Craven Cottage', value: 13 },
];

const clubLossesData = [
  { rank: 1, name: 'Southampton', img: 'https://resources.premierleague.com/premierleague/badges/70/t20.png', stadium: 'at St. Mary\'s Stadium', value: 28 },
  { rank: 2, name: 'Leicester', img: 'https://resources.premierleague.com/premierleague/badges/70/t13.png', stadium: 'at King Power Stadium', value: 24 },
  { rank: 3, name: 'Sheffield Utd', img: 'https://resources.premierleague.com/premierleague/badges/70/t49.png', stadium: 'at Bramall Lane', value: 22 },
  { rank: 4, name: 'Spurs', img: 'https://resources.premierleague.com/premierleague/badges/70/t6.png', stadium: 'at Tottenham Hotspur Stadium', value: 20 },
  { rank: 5, name: 'Wolves', img: 'https://resources.premierleague.com/premierleague/badges/70/t39.png', stadium: 'at Molineux Stadium', value: 20 },
  { rank: 6, name: 'Man Utd', img: 'https://resources.premierleague.com/premierleague/badges/70/t1.png', stadium: 'at Old Trafford', value: 17 },
  { rank: 7, name: 'West Ham', img: 'https://resources.premierleague.com/premierleague/badges/70/t21.png', stadium: 'at London Stadium', value: 16 },
  { rank: 8, name: 'Brentford', img: 'https://resources.premierleague.com/premierleague/badges/70/t94.png', stadium: 'at Gtech Community Stadium', value: 13 },
  { rank: 9, name: 'Fulham', img: 'https://resources.premierleague.com/premierleague/badges/70/t54.png', stadium: 'at Craven Cottage', value: 13 },
  { rank: 10, name: 'Everton', img: 'https://resources.premierleague.com/premierleague/badges/70/t11.png', stadium: 'at Goodison Park', value: 12 },
];

// Partners data
const partners = [
  { name: 'EA Sports', logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/04/06/c9fc1dca-fe99-40ab-ab41-be1979ee852d/ea_sports_black_435_x_290_360.png?width=435&height=290', type: 'Lead Partner' },
  { name: 'Barclays', logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/01/26/11fe030b-2b2e-41ed-8f34-be72a8403ea0/Barclays_Sponsor.png?width=230&height=80', type: 'Official Bank' },
  { name: 'Guinness', logo: 'https://resources.premierleague.pulselive.com/photo-resources/2024/06/12/d5dcc7f8-fbaf-4f12-883b-04620b08506f/Guinness_Partner.jpg?width=435&height=290', type: 'Official Beer' },
  { name: 'Hublot', logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/01/26/737c3235-de74-4d72-a2fc-496365258f4b/Hublot_Sponsor.png?width=300&height=150', type: 'Official Timekeeper' },
  { name: 'Nike', logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/01/26/8016f9bd-4ca7-4a1a-8336-bf9eac81e265/Nike_Sponsor.png?width=222&height=78', type: 'Official Ball' },
  { name: 'Oracle', logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/01/26/c3238a2c-d4af-48a2-9345-0b7a82c18cd8/Oracle_Sponsor.png?width=300&height=150', type: 'Official Cloud Partner' },
  { name: 'Avery Dennison', logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/01/26/29bca766-5224-4166-b20b-3aac01e67fb9/AD_Sponsor.png?width=280&height=90', type: 'Official Licensee' },
  { name: 'Panini', logo: 'https://resources.premierleague.pulselive.com/photo-resources/2023/01/26/e7f37045-a73d-4b09-bfab-93a20044b31a/Panini_Sponsor.png?width=300&height=73', type: 'Official Licensee' },
  { name: 'Sorare', logo: 'https://resources.premierleague.pulselive.com/photo-resources/2024/10/28/cf59f725-738f-4a56-b9cf-5e730101f9d1/SorareSponsor_New.png?width=230&height=80', type: 'Official Licensee' },
  { name: 'Rezzil', logo: 'https://resources.premierleague.pulselive.com/photo-resources/2024/06/01/f620e214-5330-4021-b382-183e6b564a64/Rezzil_Logo.png?width=230&height=80', type: 'Official Licensee' },
  { name: 'Football Manager', logo: 'https://resources.premierleague.pulselive.com/photo-resources/2024/06/10/6547dca8-babf-49e5-95d5-ec4bb1744248/FootballManager_Logo.png?width=230&height=80', type: 'Official Licensee' },
];

// Footer menu data
const footerMenus = [
  {
    title: 'Premier League',
    links: [
      { name: 'Home', url: '#' },
      { name: 'Fixtures', url: '#' },
      { name: 'Results', url: '#' },
      { name: 'Tables', url: '#' },
      { name: 'Stats', url: '#' },
      { name: 'News', url: '#' },
      { name: 'Video', url: '#' },
      { name: 'Transfers', url: '#' },
      { name: 'Awards', url: '#' },
    ]
  },
  {
    title: 'Fantasy',
    links: [
      { name: 'FPL Home', url: '#' },
      { name: 'My Team', url: '#' },
      { name: 'FPL Transfers', url: '#' },
      { name: 'Leagues', url: '#' },
      { name: 'FPL Fixtures', url: '#' },
      { name: 'Statistics', url: '#' },
      { name: 'The Scout', url: '#' },
      { name: 'FPL Draft', url: '#' },
    ]
  },
  {
    title: 'Football & Community',
    links: [
      { name: 'Wider Football', url: '#' },
      { name: 'PL Charitable Fund', url: '#' },
      { name: 'Community', url: '#' },
      { name: 'Youth Development', url: '#' },
      { name: 'No Room for Racism', url: '#' },
      { name: 'Mental Health', url: '#' },
      { name: 'Rainbow Laces', url: '#' },
      { name: 'Poppy', url: '#' },
    ]
  },
  {
    title: 'About',
    links: [
      { name: 'Overview', url: '#' },
      { name: 'What we do', url: '#' },
      { name: 'Governance', url: '#' },
      { name: 'Statement of Principles', url: '#' },
      { name: 'Inclusion', url: '#' },
      { name: 'Publications', url: '#' },
      { name: 'Partners', url: '#' },
      { name: 'Legal', url: '#' },
      { name: 'Safeguarding', url: '#' },
      { name: 'Careers', url: '#' },
      { name: 'Media', url: '#' },
    ]
  },
  {
    title: 'Stats',
    links: [
      { name: 'Dashboard', url: '#' },
      { name: 'Player Stats', url: '#' },
      { name: 'Club Stats', url: '#' },
      { name: 'All-time Stats', url: '#' },
      { name: 'Milestones', url: '#' },
      { name: 'Records', url: '#' },
      { name: 'Head-to-Head', url: '#' },
      { name: 'Player Comparison', url: '#' },
      { name: 'Awards', url: '#' },
    ]
  },
  {
    title: 'More',
    links: [
      { name: 'History', url: '#' },
      { name: 'Hall of Fame', url: '#' },
      { name: 'PL30', url: '#' },
      { name: 'ePremier League', url: '#' },
      { name: 'Nike Ball Hub', url: '#' },
      { name: 'FAQs', url: '#' },
      { name: 'Contact Us', url: '#' },
      { name: 'Tickets', url: '#' },
    ]
  },
];

// Social links data
const socialLinks = [
  { name: 'PL on YouTube', url: '#', external: true },
  { name: 'PL on Tik Tok', url: '#', external: true },
  { name: 'PL on Facebook', url: '#', external: true },
  { name: 'PL on X', url: '#', external: true },
  { name: 'FPL on X', url: '#', external: true },
  { name: 'PL Communities on X', url: '#', external: true },
  { name: 'PL Youth on X', url: '#', external: true },
  { name: 'PL on Instagram', url: '#', external: true },
  { name: 'PL on WhatsApp', url: '#', external: true },
  { name: 'PL USA on X', url: '#', external: true },
  { name: 'PL USA on Instagram', url: '#', external: true },
  { name: 'La Premier on Instagram', url: '#', external: true },
  { name: 'PL India on X', url: '#', external: true },
  { name: 'PL India on Instagram', url: '#', external: true },
  { name: 'PL Arabic on X', url: '#', external: true },
  { name: 'PL Arabic on Instagram', url: '#', external: true },
  { name: 'La Premier on TikTok', url: '#', external: true },
  { name: 'PL Music on Spotify', url: '#', external: true },
];

type StatsSectionHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

const StatsSectionHeader = ({ title, children }: StatsSectionHeaderProps) => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    mb: 2
  }}>
    <Typography variant="h5" sx={{
      color: '#37003c',
      fontWeight: 700,
      fontSize: '1.5rem'
    }}>
      {title}
    </Typography>
    {children}
  </Box>
);

// Player type
interface Player {
  rank: number;
  name: string;
  club: string;
  img: string;
  clubImg?: string;
  value: number;
}

interface StatsCardProps {
  title: string;
  color: string;
  data: Player[];
}

const StatsCard = ({ title, color, data }: StatsCardProps) => {
  const topPlayer = data[0];

  return (
    <Box sx={{ mb: 4, width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Box sx={{
        bgcolor: color,
        color: 'white',
        p: 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        minHeight: 160,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2, alignItems: 'center' }}>
          <Box>
            <Avatar
              src={topPlayer.img}
              alt={topPlayer.name}
              sx={{
                width: 70,
                height: 70,
                border: '2px solid white',
                bgcolor: 'white',
                borderRadius: '50%'
              }}
            />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{topPlayer.name}</Typography>
            <Typography variant="body2">{topPlayer.club}</Typography>
          </Box>
        </Stack>
        <Typography variant="h3" sx={{ fontWeight: 900, my: 2 }}>
          {topPlayer.value}
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: 0, flex: 1 }}>
        <Table>
          <TableBody>
            {data.slice(1).map((player: Player, index: number) => (
              <TableRow key={index} sx={{ '&:last-child td': { border: 0 }, '&:hover': { background: 'rgba(55,0,60,0.06)', boxShadow: '0 2px 8px 0 rgba(55,0,60,0.08)', fontWeight: 700, cursor: 'pointer' } }}>
                <TableCell sx={{ width: 30, borderBottom: '1px solid #f0f0f0', py: 1 }}>
                  <Typography sx={{ fontWeight: 700, textAlign: 'center' }}>{player.rank}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #f0f0f0', py: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      src={player.img}
                      alt={player.name}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                        {player.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                        {player.club}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell align="right" sx={{ width: 30, borderBottom: '1px solid #f0f0f0', py: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>{player.value}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ p: 1, textAlign: 'left' }}>
        <Button
          endIcon={<ArrowForwardIcon fontSize="small" />}
          sx={{
            color: color,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            p: 0,
            '&:hover': {
              background: 'transparent',
              opacity: 0.8
            }
          }}
        >
          View Full List
        </Button>
      </Box>
    </Box>
  );
};

// Club type
interface Club {
  rank: number;
  name: string;
  img: string;
  stadium: string;
  value: number;
}

interface ClubStatsCardProps {
  title: string;
  color: string;
  data: Club[];
}

const ClubStatsCard = ({ title, color, data }: ClubStatsCardProps) => {
  const topClub = data[0];

  return (
    <Box sx={{ mb: 4, width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Box sx={{
        bgcolor: color,
        color: 'white',
        p: 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        position: 'relative',
        overflow: 'hidden',
        minHeight: 160,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2, alignItems: 'center' }}>
          <Box>
            <Avatar
              src={topClub.img}
              alt={topClub.name}
              sx={{
                width: 70,
                height: 70,
                border: '2px solid white',
                bgcolor: 'white',
                borderRadius: '50%'
              }}
            />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{topClub.name}</Typography>
            {topClub.stadium && (
              <Typography variant="body2">{topClub.stadium}</Typography>
            )}
          </Box>
        </Stack>
        <Typography variant="h3" sx={{ fontWeight: 900, my: 2 }}>
          {topClub.value}
        </Typography>
        <Box
          component="img"
          src={topClub.img}
          alt={topClub.name}
          sx={{
            position: 'absolute',
            right: -15,
            bottom: -15,
            width: 120,
            height: 120,
            opacity: 0.2
          }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: 0, flex: 1 }}>
        <Table>
          <TableBody>
            {data.slice(1).map((club: Club, index: number) => (
              <TableRow key={index} sx={{ '&:last-child td': { border: 0 }, '&:hover': { background: 'rgba(55,0,60,0.06)', boxShadow: '0 2px 8px 0 rgba(55,0,60,0.08)', fontWeight: 700, cursor: 'pointer' } }}>
                <TableCell sx={{ width: 30, borderBottom: '1px solid #f0f0f0', py: 1 }}>
                  <Typography sx={{ fontWeight: 700, textAlign: 'center' }}>{club.rank}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #f0f0f0', py: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      src={club.img}
                      alt={club.name}
                      sx={{ width: 32, height: 32, bgcolor: 'white' }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                        {club.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                        {club.stadium}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell align="right" sx={{ width: 30, borderBottom: '1px solid #f0f0f0', py: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>{club.value}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ p: 1, textAlign: 'left' }}>
        <Button
          endIcon={<ArrowForwardIcon fontSize="small" />}
          sx={{
            color: color,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            p: 0,
            '&:hover': {
              background: 'transparent',
              opacity: 0.8
            }
          }}
        >
          View Full List
        </Button>
      </Box>
    </Box>
  );
};

const Stats = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ bgcolor: '#f8f8f8' }}>
      {/* Header with Gradient */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, #00ff85 0%, #37dbff 100%)',
          py: 3,
          px: 2
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 900,
                color: '#37003c',
                letterSpacing: '-0.5px',
                lineHeight: 1.1
              }}
            >
              Stats Centre
            </Typography>
            <Box
              component="img"
              src="https://resources.premierleague.pulselive.com/photo-resources/2023/05/25/abdb76a9-6cf0-4979-8a0e-9c42b7847647/oracle_logo.png?width=800&height="
              alt="Oracle Cloud"
              sx={{
                height: { xs: 40, md: 60 },
                display: { xs: 'none', md: 'block' }
              }}
            />
          </Box>

          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mt: 2,
              ml: 0,
              pl: 0,
              alignItems: 'flex-start',
              '& .MuiTabs-flexContainer': {
                justifyContent: 'flex-start',
              },
              '& .MuiTab-root': {
                color: '#37003c',
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                minWidth: 'auto',
                px: 2,
                py: 1,
                mr: 1,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '4px',
                transition: 'font-weight 0.2s',
                '&:hover': {
                  fontWeight: 900,
                  background: 'rgba(55,0,60,0.08)',
                },
                '&.Mui-selected': {
                  color: '#37003c',
                  bgcolor: 'white',
                  fontWeight: 700
                }
              },
              '& .MuiTabs-indicator': { display: 'none' }
            }}
          >
            {statsTabs.map((label) => (
              <Tab
                key={label}
                label={label}
                disableRipple
              />
            ))}
          </Tabs>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth={false} sx={{ maxWidth: 1440, py: 4 }}>
        {/* Player Stats Section */}
        <StatsSectionHeader title="2024/25 Player Stats" />

        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <StatsCard
              title="Goals"
              color="#e90052"
              data={goalsData}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <StatsCard
              title="Assists"
              color="#04f5ff"
              data={assistsData}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <StatsCard
              title="Passes"
              color="#6caddf"
              data={passesData}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <StatsCard
              title="Clean sheets"
              color="#963cff"
              data={cleanSheetsData}
            />
          </Grid>
        </Grid>

        {/* Club Stats Section */}
        <Box sx={{ mt: 6 }}>
          <StatsSectionHeader title="Premier League Club Stats" />
        </Box>

        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <ClubStatsCard
              title="Goals"
              color="#e90052"
              data={clubGoalsData}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <ClubStatsCard
              title="Tackles"
              color="#04f5ff"
              data={clubTacklesData}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <ClubStatsCard
              title="Wins"
              color="#6caddf"
              data={clubWinsData}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <ClubStatsCard
              title="Losses"
              color="#963cff"
              data={clubLossesData}
            />
          </Grid>
        </Grid>

        {/* Disclaimer */}
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              bgcolor: '#37003c',
              color: 'white',
              px: 4,
              py: 2,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              transition: 'all 0.25s',
              boxShadow: '0 2px 8px 0 rgba(55,0,60,0.08)',
              '&:hover': {
                bgcolor: 'white',
                color: '#37003c',
                boxShadow: '0 4px 16px 0 rgba(55,0,60,0.12)',
              },
              textAlign: 'center',
              minWidth: 400,
              justifyContent: 'center',
            }}
          >
            Some statistics are not available prior to the 2006/07 season. Click here for more details.
            <ArrowForwardIcon sx={{ fontSize: 20, ml: 1 }} />
          </Box>
        </Box>
      </Container>

      {/* Partners */}
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
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Stats;
