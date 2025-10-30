import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  // IMPORTANT: Change this to your backend's URL when you deploy!
  // baseURL: 'http://localhost:5001/api', 
  baseURL: 'https://event-finder-backend-qov1.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEvents = (location = '') => {
  return apiClient.get('/events', { params: { location } });
};

export const getEventById = (id) => {
  return apiClient.get(`/events/${id}`);
};

export const createEvent = (eventData) => {
  return apiClient.post('/events', eventData);
};

export const joinEvent = (id) => {
  return apiClient.post(`/events/${id}/join`);
};