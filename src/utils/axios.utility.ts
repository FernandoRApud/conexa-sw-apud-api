import axios from 'axios';
import { FetchedData } from '../interfaces';
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

export const passthroughFetchBatch = async <K extends keyof FetchedData>(
  fetchedData: FetchedData,
  subIndex: K,
) => {
  const propertyValue = fetchedData[subIndex];

  if (Array.isArray(propertyValue)) {
    const filmsData = await fetchFilmsInBatch(propertyValue);
    console.log(filmsData);
  } else throw new AppError('Wrong data type');
};
