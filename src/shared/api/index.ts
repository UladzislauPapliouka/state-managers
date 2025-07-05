import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

export const dummyJsonAxiosInstance = axios.create({
  baseURL: 'https://dummyjson.com'
});

export const queryClient = new QueryClient();
