import { fetchData, createData, updateData, deleteData } from './apiService';

export interface Standing {
  id?: number;
  team: {
    id: number;
    name?: string;
  };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}

const ENDPOINT = '/standings';

export const standingService = {
  getAllStandings: async (): Promise<Standing[]> => {
    return await fetchData(ENDPOINT);
  },

  getStandingById: async (id: number): Promise<Standing> => {
    return await fetchData(`${ENDPOINT}/${id}`);
  },

  getStandingByTeam: async (teamId: number): Promise<Standing> => {
    return await fetchData(`${ENDPOINT}/team/${teamId}`);
  },

  createStanding: async (standingData: Standing): Promise<Standing> => {
    return await createData(ENDPOINT, standingData);
  },

  updateStanding: async (id: number, standingData: Standing): Promise<Standing> => {
    return await updateData(ENDPOINT, id, standingData);
  },

  deleteStanding: async (id: number): Promise<boolean> => {
    return await deleteData(ENDPOINT, id);
  }
}; 