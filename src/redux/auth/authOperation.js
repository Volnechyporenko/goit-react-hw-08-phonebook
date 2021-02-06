import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common['Authorization'] = '';
  },
};

const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await axios.post('/users/signup', credentials);
    if (!data.token) {
      throw new Error(data);
    }
    token.set(data.token);
    return data;
  } catch (error) {
    console.log('error', error);
  }
});

const login = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    if (!data.token) {
      throw new Error(data);
    }
    token.set(data.token);
    return data;
  } catch (error) {
    console.log('error', error);
    return error;
  }
});

const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const { data } = await axios.post('/users/logout');
    token.unset();
  } catch (error) {
    console.log('error', error);
  }
});

const fetchRefreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      throw new Error();
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return error;
    }
  },
);

export default { register, login, logout, fetchRefreshUser };
