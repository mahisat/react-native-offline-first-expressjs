import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {API_HOST} from '../config';
export const authApi = axios.create({
  baseURL: API_HOST,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';
authApi.interceptors.request.use(
  async (authApi) => {
    const userToken = await AsyncStorage.getItem('token');
    const session = JSON.parse(userToken);
    authApi.headers.authorization = session.token;
    return authApi;
  },
  (error) => Promise.reject(error),
);

export const api = axios.create({
  baseURL: API_HOST,
});
