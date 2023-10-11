import axios from 'axios';
import { IFetchedData } from '../interfaces';
import AppError from './error.utility';

const defaultOptions = {
  baseURL: 'https://swapi.dev/api/',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const clientAxios = axios.create(defaultOptions);

const fetchFilmsInBatch = async (filmUrls: string[]) => {
  try {
    const response = await axios.all(filmUrls.map((url: string) => axios.get(url)));
    return response.map((res) => res.data);
  } catch (error) {
    throw new AppError(`Error retrieving batch data: ${error}`);
  }
};

export const passthroughFetchBatch = async <K extends keyof IFetchedData>(
  fetchedData: IFetchedData,
  subIndex: K,
) => {
  const propertyValue = fetchedData[subIndex];

  if (Array.isArray(propertyValue)) {
    const filmsData = await fetchFilmsInBatch(propertyValue);
    const newAssignedData = fetchedData[subIndex] = filmsData;
    return newAssignedData;
  }
  if (typeof propertyValue === 'string') {
    const response = await axios.get(propertyValue);
    const newAssignedData = fetchedData[subIndex] = response.data;
    return newAssignedData;
  }
  throw new AppError('Wrong data type');
};
