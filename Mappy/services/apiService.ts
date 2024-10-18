import axios from 'axios';
import { User } from '~/types';

const BASE_URL = 'http://localhost:6543/api';


export const createUser = async (userData: User) => {
  const res = await axios.post(`${BASE_URL}/users`, userData);
  return res.data;
};

export const getUser = async (userId: string) => {
  const res = await axios.get(`${BASE_URL}/users/${userId}`);
  return res.data;
};

export const addVisitedCountry = async (userId: string, countryCode: string) => {
  const res = await axios.post(`${BASE_URL}/visited`, { userId, countryCode });
  return res.data;
};

export const getVisitedCountry = async (userId: string) => {
  const res = await axios.get(`${BASE_URL}/visited/${userId}`);
  return res.data;
};

export const removeVisitedCountry = async (userId: string, countryCode: string) => {
  const res = await axios.delete(`${BASE_URL}/visited`, { data: { userId, countryCode } });
  return res.data;
};

export const addWantToVisitCountry = async (userId: string, countryCode: string) => {
  const response = await axios.post(`${BASE_URL}/want-to-visit`, { userId, countryCode });
  return response.data;
};

export const getWantToVisitCountries = async (userId: string) => {
  const response = await axios.get(`${BASE_URL}/want-to-visit/${userId}`);
  return response.data;
};

export const removeWantToVisitCountry = async (userId: string, countryCode: string) => {
  const response = await axios.delete(`${BASE_URL}/want-to-visit`, {
    data: { userId, countryCode },
  });
  return response.data;
};
