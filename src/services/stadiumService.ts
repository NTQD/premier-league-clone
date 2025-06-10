import { fetchData, createData, updateData, deleteData } from './apiService';

export interface Stadium {
  id?: number;
  name: string;
  capacity: number;
  location: string;
  yearBuilt?: number;
}

const ENDPOINT = '/stadiums';

export const stadiumService = {
  getAllStadiums: async (): Promise<Stadium[]> => {
    return await fetchData(ENDPOINT);
  },

  getStadiumById: async (id: number): Promise<Stadium> => {
    return await fetchData(`${ENDPOINT}/${id}`);
  },

  createStadium: async (stadiumData: Stadium): Promise<Stadium> => {
    return await createData(ENDPOINT, stadiumData);
  },

  updateStadium: async (id: number, stadiumData: Stadium): Promise<Stadium> => {
    return await updateData(ENDPOINT, id, stadiumData);
  },

  deleteStadium: async (id: number): Promise<boolean> => {
    return await deleteData(ENDPOINT, id);
  }
}; 