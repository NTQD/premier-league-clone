import { fetchData, createData, updateData, deleteData } from './apiService';

export interface Player {
  id?: number;
  name: string;
  dateOfBirth: string;
  nationality: string;
  positionPlayer: string;
  club?: {
    id: number;
    name?: string;
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
    console.log('Creating player with data:', playerData);
    try {
      const result = await createData(ENDPOINT, playerData);
      console.log('Create player result:', result);
      return result;
    } catch (error) {
      console.error('Error in createPlayer:', error);
      throw error;
    }
  },

  updatePlayer: async (id: number, playerData: Player): Promise<Player> => {
    return await updateData(ENDPOINT, id, playerData);
  },

  deletePlayer: async (id: number): Promise<boolean> => {
    return await deleteData(ENDPOINT, id);
  }
}; 