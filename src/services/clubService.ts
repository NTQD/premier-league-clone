import { fetchData, createData, updateData, deleteData } from './apiService';

export interface Club {
  id?: number;
  name: string;
  foundedYear: number;
  manager: string;
  location: string;
  website?: string;
  stadium?: {
    id: number;
  };
}

const ENDPOINT = '/clubs';

export const clubService = {
  getAllClubs: async (): Promise<Club[]> => {
    return await fetchData(ENDPOINT);
  },

  getClubById: async (id: number): Promise<Club> => {
    return await fetchData(`${ENDPOINT}/${id}`);
  },

  createClub: async (clubData: Club): Promise<Club> => {
    return await createData(ENDPOINT, clubData);
  },

  updateClub: async (id: number, clubData: Club): Promise<Club> => {
    return await updateData(ENDPOINT, id, clubData);
  },

  deleteClub: async (id: number): Promise<boolean> => {
    return await deleteData(ENDPOINT, id);
  }
}; 