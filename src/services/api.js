import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'; // Sesuaikan dengan backend Django

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}users/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};