import { fetchData, createData, updateData, deleteData } from './apiService';

export interface Scorer {
  player: {
    id: number;
  };
  minute: number;
}

export interface MatchStats {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
}

export interface Result {
  id?: number;
  homeTeam: {
    id: number;
    name?: string;
  };
  awayTeam: {
    id: number;
    name?: string;
  };
  homeScore: number;
  awayScore: number;
  date: string;
  competition: string;
  matchweek: number;
  scorers: {
    home: Scorer[];
    away: Scorer[];
  };
  stats: MatchStats;
}

const ENDPOINT = '/results';

export const resultService = {
  getAllResults: async (): Promise<Result[]> => {
    return await fetchData(ENDPOINT);
  },

  getResultById: async (id: number): Promise<Result> => {
    return await fetchData(`${ENDPOINT}/${id}`);
  },

  getResultsByTeam: async (teamId: number): Promise<Result[]> => {
    return await fetchData(`${ENDPOINT}/team/${teamId}`);
  },

  getResultsByDate: async (date: string): Promise<Result[]> => {
    return await fetchData(`${ENDPOINT}/date/${date}`);
  },

  createResult: async (resultData: Result): Promise<Result> => {
    return await createData(ENDPOINT, resultData);
  },

  updateResult: async (id: number, resultData: Result): Promise<Result> => {
    return await updateData(ENDPOINT, id, resultData);
  },

  deleteResult: async (id: number): Promise<boolean> => {
    return await deleteData(ENDPOINT, id);
  }
}; 