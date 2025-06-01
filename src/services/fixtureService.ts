import { fetchData, createData, updateData, deleteData } from './apiService';

export interface Fixture {
  id?: number;
  homeTeam: {
    id: number;
    name?: string;
  };
  awayTeam: {
    id: number;
    name?: string;
  };
  date: string;
  time: string;
  stadium: {
    id: number;
    name?: string;
  };
  competition: string;
  matchweek: number;
  status: 'Scheduled' | 'Live' | 'Finished';
  broadcasters?: string[];
}

const ENDPOINT = '/fixtures';

export const fixtureService = {
  getAllFixtures: async (): Promise<Fixture[]> => {
    return await fetchData(ENDPOINT);
  },

  getFixtureById: async (id: number): Promise<Fixture> => {
    return await fetchData(`${ENDPOINT}/${id}`);
  },

  getFixturesByTeam: async (teamId: number): Promise<Fixture[]> => {
    return await fetchData(`${ENDPOINT}/team/${teamId}`);
  },

  getFixturesByDate: async (date: string): Promise<Fixture[]> => {
    return await fetchData(`${ENDPOINT}/date/${date}`);
  },

  getFixturesByStadium: async (stadiumId: number): Promise<Fixture[]> => {
    return await fetchData(`${ENDPOINT}/stadium/${stadiumId}`);
  },

  createFixture: async (fixtureData: Fixture): Promise<Fixture> => {
    return await createData(ENDPOINT, fixtureData);
  },

  updateFixture: async (id: number, fixtureData: Fixture): Promise<Fixture> => {
    return await updateData(ENDPOINT, id, fixtureData);
  },

  deleteFixture: async (id: number): Promise<boolean> => {
    return await deleteData(ENDPOINT, id);
  }
}; 