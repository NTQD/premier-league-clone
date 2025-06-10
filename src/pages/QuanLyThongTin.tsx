import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import Partners from '../components/Partners';
import PlayerManagement from '../components/PlayerManagement';
import ClubManagement from '../components/ClubManagement';
import FixtureManagement from '../components/FixtureManagement';
import StandingManagement from '../components/StandingManagement';
import { playerService, Player as ServicePlayer } from '../services/playerService';
import { clubService, Club as ServiceClub } from '../services/clubService';
import { stadiumService } from '../services/stadiumService';
import { fixtureService, Fixture } from '../services/fixtureService';
import { resultService, Result, Scorer, MatchStats } from '../services/resultService';
import { standingService, Standing } from '../services/standingService';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const initialForm = {
  name: '',
  dateOfBirth: '',
  nationality: '',
  position: '',
  clubId: '',
  avatar: '',
  flag: '',
};

const initialClubForm = {
  name: '',
  foundedYear: '',
  location: '',
  manager: '',
  website: '',
  logo: '',
  capacity: '',
};

const initialFixtureForm = {
  date: '',
  time: '',
  homeTeamId: '',
  awayTeamId: '',
  stadiumName: '',
  homeScore: '',
  awayScore: '',
  competition: 'Premier League',
  matchweek: '',
  status: 'Scheduled'
};

const initialStandingForm = {
  team_id: '',
  team_name: '',
  played: '',
  won: '',
  drawn: '',
  lost: '',
  GF: '',
  GA: '',
  GD: '',
  points: '',
  position: '',
};

const QuanLyThongTin = () => {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [clubForm, setClubForm] = useState(initialClubForm);
  const [fixtureForm, setFixtureForm] = useState(initialFixtureForm);
  const [standingForm, setStandingForm] = useState(initialStandingForm);

  const [players, setPlayers] = useState<any[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [standings, setStandings] = useState<any[]>([]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editClubIndex, setEditClubIndex] = useState<number | null>(null);
  const [editFixtureIndex, setEditFixtureIndex] = useState<number | null>(null);
  const [editStandingIndex, setEditStandingIndex] = useState<number | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // Player handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const name = e.target.name as string;
    const value = (e.target as any).value;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const playerData: ServicePlayer = {
      name: form.name,
      dateOfBirth: form.dateOfBirth,
      nationality: form.nationality,
      position: form.position,
      club: form.clubId ? { id: parseInt(form.clubId) } : undefined,
      avatar: form.avatar,
      flag: form.flag,
    };
    try {
      if (editIndex !== null) {
        const playerId = players[editIndex].id!;
        await playerService.updatePlayer(playerId, playerData);
      } else {
        await playerService.createPlayer(playerData);
      }
      const updatedPlayers = await playerService.getAllPlayers();
      setPlayers(updatedPlayers);
      setEditIndex(null);
      setForm(initialForm);
    } catch (error) {
      console.error('Error saving player:', error);
    }
  };
  const handleEdit = (idx: number) => {
    const playerToEdit = players[idx];
    setForm({
      name: playerToEdit.name,
      dateOfBirth: playerToEdit.dateOfBirth || '',
      nationality: playerToEdit.nationality || '',
      position: playerToEdit.position || '',
      clubId: playerToEdit.club?.id?.toString() || '',
      avatar: playerToEdit.avatar || '',
      flag: playerToEdit.flag || '',
    });
    setEditIndex(idx);
  };
  const handleDelete = (idx: number) => {
    const playerId = players[idx].id!;
    handleDeletePlayer(playerId);
    if (editIndex === idx) setEditIndex(null);
  };
  const handleDeletePlayer = async (playerId: number) => {
    try {
      await playerService.deletePlayer(playerId);
      const updatedPlayers = await playerService.getAllPlayers();
      setPlayers(updatedPlayers);
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  // Club handlers
  const handleClubInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClubForm({ ...clubForm, [name]: value });
  };
  const handleClubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clubData: ServiceClub = {
      name: clubForm.name,
      foundedYear: clubForm.foundedYear ? parseInt(clubForm.foundedYear) : undefined,
      manager: clubForm.manager,
      location: clubForm.location,
      website: clubForm.website || undefined,
      logo: clubForm.logo || undefined,
      capacity: clubForm.capacity ? parseInt(clubForm.capacity) : undefined,
    };
    try {
      if (editClubIndex !== null) {
        const clubId = clubs[editClubIndex].id!;
        await clubService.updateClub(clubId, clubData);
      } else {
        await clubService.createClub(clubData);
      }
      const updatedClubs = await clubService.getAllClubs();
      setClubs(updatedClubs);
      setEditClubIndex(null);
      setClubForm(initialClubForm);
    } catch (error) {
      console.error('Error saving club:', error);
    }
  };
  const handleEditClub = (idx: number) => {
    const clubToEdit = clubs[idx];
    setClubForm({
      name: clubToEdit.name || '',
      foundedYear: clubToEdit.foundedYear?.toString() || '',
      manager: clubToEdit.manager || '',
      location: clubToEdit.location || '',
      website: clubToEdit.website || '',
      logo: clubToEdit.logo || '',
      capacity: clubToEdit.capacity?.toString() || '',
    });
    setEditClubIndex(idx);
  };
  const handleDeleteClub = async (idx: number) => {
    try {
      const clubId = clubs[idx].id!;
      await clubService.deleteClub(clubId);
      const updatedClubs = await clubService.getAllClubs();
      setClubs(updatedClubs);
      if (editClubIndex === idx) {
        setEditClubIndex(null);
      }
    } catch (error) {
      console.error('Error deleting club:', error);
    }
  };

  // Fixture handlers
  const handleFixtureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFixtureForm({ ...fixtureForm, [name]: value });
  };
  const handleFixtureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fixtureForm.homeTeamId || !fixtureForm.awayTeamId) {
      alert("Bạn phải chọn cả Home Team và Away Team!");
      return;
    }

    // Tạo object dữ liệu khớp với entity Fixture của backend
    const fixtureData = {
      homeTeam: { 
        id: parseInt(fixtureForm.homeTeamId)
      },
      awayTeam: { 
        id: parseInt(fixtureForm.awayTeamId)
      },
      date: fixtureForm.date,
      time: fixtureForm.time,
      stadiumName: fixtureForm.stadiumName || null,
      homeScore: fixtureForm.homeScore ? parseInt(fixtureForm.homeScore) : null,
      awayScore: fixtureForm.awayScore ? parseInt(fixtureForm.awayScore) : null,
      competition: fixtureForm.competition,
      matchweek: parseInt(fixtureForm.matchweek),
      status: fixtureForm.status
    };

    console.log('Data being sent to server:', fixtureData);

    try {
      if (editFixtureIndex !== null) {
        const fixtureId = fixtures[editFixtureIndex].id!;
        await fixtureService.updateFixture(fixtureId, fixtureData);
      } else {
        await fixtureService.createFixture(fixtureData);
      }
      const updatedFixtures = await fixtureService.getAllFixtures();
      setFixtures(updatedFixtures);
      setEditFixtureIndex(null);
      setFixtureForm(initialFixtureForm);
    } catch (error) {
      console.error('Error saving fixture:', error);
    }
  };
  const handleFixtureEdit = (idx: number) => {
    const fixtureToEdit = fixtures[idx];
    const validStatuses: ('Scheduled' | 'Live' | 'Finished')[] = ['Scheduled', 'Live', 'Finished'];
    const status: 'Scheduled' | 'Live' | 'Finished' = validStatuses.includes(fixtureToEdit.status) ? fixtureToEdit.status : 'Scheduled';
    
    setFixtureForm({
      date: fixtureToEdit.date,
      time: fixtureToEdit.time,
      homeTeamId: fixtureToEdit.homeTeam.id.toString(),
      awayTeamId: fixtureToEdit.awayTeam.id.toString(),
      stadiumName: fixtureToEdit.stadiumName || '',
      homeScore: fixtureToEdit.homeScore?.toString() || '',
      awayScore: fixtureToEdit.awayScore?.toString() || '',
      competition: fixtureToEdit.competition,
      matchweek: fixtureToEdit.matchweek?.toString() || '',
      status: status
    });
    setEditFixtureIndex(idx);
  };
  const handleDeleteFixture = async (idx: number) => {
    try {
      const fixtureId = fixtures[idx].id!;
      await fixtureService.deleteFixture(fixtureId);
      const updatedFixtures = await fixtureService.getAllFixtures();
      setFixtures(updatedFixtures);
      if (editFixtureIndex === idx) {
        setEditFixtureIndex(null);
      }
    } catch (error) {
      console.error('Error deleting fixture:', error);
    }
  };

  // Standing handlers
  const handleStandingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStandingForm({ ...standingForm, [name]: value });
  };
  const handleStandingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const standingData: Standing = {
      team: { id: parseInt(standingForm.team_id), name: standingForm.team_name },
      played: parseInt(standingForm.played),
      won: parseInt(standingForm.won),
      drawn: parseInt(standingForm.drawn),
      lost: parseInt(standingForm.lost),
      points: parseInt(standingForm.points),
    };
    try {
      if (editStandingIndex !== null) {
        const standingId = standings[editStandingIndex].id!;
        await standingService.updateStanding(standingId, standingData);
      } else {
        await standingService.createStanding(standingData);
      }
      const updatedStandings = await standingService.getAllStandings();
      setStandings(updatedStandings);
      setEditStandingIndex(null);
      setStandingForm(initialStandingForm);
    } catch (error) {
      console.error('Error saving standing:', error);
    }
  };
  const handleStandingEdit = (idx: number) => {
    const standingToEdit = standings[idx];
    setStandingForm({
      team_id: standingToEdit.team.id.toString(),
      team_name: standingToEdit.team.name,
      played: standingToEdit.played?.toString() || '',
      won: standingToEdit.won?.toString() || '',
      drawn: standingToEdit.drawn?.toString() || '',
      lost: standingToEdit.lost?.toString() || '',
      points: standingToEdit.points?.toString() || '',
      GF: '',
      GA: '',
      GD: '',
      position: '',
    });
    setEditStandingIndex(idx);
  };
  const handleDeleteStanding = async (idx: number) => {
    try {
      const standingId = standings[idx].id!;
      await standingService.deleteStanding(standingId);
      const updatedStandings = await standingService.getAllStandings();
      setStandings(updatedStandings);
      if (editStandingIndex === idx) {
        setEditStandingIndex(null);
      }
    } catch (error) {
      console.error('Error deleting standing:', error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [playersData, clubsData, fixturesData, standingsData] = await Promise.all([
          playerService.getAllPlayers(),
          clubService.getAllClubs(),
          fixtureService.getAllFixtures(),
          standingService.getAllStandings()
        ]);
        setPlayers(playersData);
        setClubs(clubsData);
        setFixtures(fixturesData);
        setStandings(standingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAllData();
  }, []);

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Tabs value={tab} onChange={handleChange} centered sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Players" />
        <Tab label="Clubs" />
        <Tab label="Fixtures & Results" />
        <Tab label="Standings" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <PlayerManagement
          players={players}
          clubs={clubs}
          form={form}
          editIndex={editIndex}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setForm={setForm}
          initialForm={initialForm}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <ClubManagement
          clubs={clubs}
          clubForm={clubForm}
          editClubIndex={editClubIndex}
          handleClubInputChange={handleClubInputChange}
          handleClubSubmit={handleClubSubmit}
          handleEditClub={handleEditClub}
          handleDeleteClub={handleDeleteClub}
          setClubForm={setClubForm}
          initialClubForm={initialClubForm}
        />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <FixtureManagement
          fixtures={fixtures}
          fixtureForm={fixtureForm}
          editFixtureIndex={editFixtureIndex}
          handleFixtureInputChange={handleFixtureInputChange}
          handleFixtureSubmit={handleFixtureSubmit}
          handleFixtureEdit={handleFixtureEdit}
          handleDeleteFixture={handleDeleteFixture}
          setFixtureForm={setFixtureForm}
          initialFixtureForm={initialFixtureForm}
          clubs={clubs}
        />
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <StandingManagement
          standings={standings}
          standingForm={standingForm}
          editStandingIndex={editStandingIndex}
          handleStandingInputChange={handleStandingInputChange}
          handleStandingSubmit={handleStandingSubmit}
          handleStandingEdit={handleStandingEdit}
          handleDeleteStanding={handleDeleteStanding}
          setStandingForm={setStandingForm}
          initialStandingForm={initialStandingForm}
          clubs={clubs}
        />
      </TabPanel>
      <Partners />
    </Box>
  );
};

export default QuanLyThongTin; 