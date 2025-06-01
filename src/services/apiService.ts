const API_BASE_URL = 'http://localhost:8080/api';

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to fetch data');
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export const createData = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to create data');
  } catch (error) {
    console.error(`Error creating data at ${endpoint}:`, error);
    throw error;
  }
};

export const updateData = async (endpoint: string, id: number, data: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to update data');
  } catch (error) {
    console.error(`Error updating data at ${endpoint}/${id}:`, error);
    throw error;
  }
};

export const deleteData = async (endpoint: string, id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return true;
    }
    throw new Error('Failed to delete data');
  } catch (error) {
    console.error(`Error deleting data at ${endpoint}/${id}:`, error);
    throw error;
  }
}; 