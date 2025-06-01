import { fetchData, createData, updateData, deleteData } from './apiService';

export interface Player {
  id?: number;
  name: string;
  dateOfBirth: string;
  nationality: string;
  positionPlayer: string;
  club?: {
    id: number;
  };
}

const ENDPOINT = '/players';

export const playerService = {
  getAllPlayers: async (): Promise<Player[]> => {
    return await fetchData(ENDPOINT);
  },

  getPlayerById: async (id: number): Promise<Player> => {
    return await fetchData(`${ENDPOINT}/${id}`);
  },

  createPlayer: async (playerData: Player): Promise<Player> => {
    return await createData(ENDPOINT, playerData);
  },

  updatePlayer: async (id: number, playerData: Player): Promise<Player> => {
    return await updateData(ENDPOINT, id, playerData);
  },

  deletePlayer: async (id: number): Promise<boolean> => {
    return await deleteData(ENDPOINT, id);
  }
}; 