import axios from 'axios';
import NodeCache from 'node-cache';
import { IFetchedDataExtended } from '../interfaces';
import AppError from './error.utility';
import { CACHE_DURATION_SECONDS } from '../constants';

const cache = new NodeCache({ stdTTL: CACHE_DURATION_SECONDS });

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

export const passthroughFetchBatch = async <K extends keyof IFetchedDataExtended>(
  fetchedData: IFetchedDataExtended,
  subIndex: K,
) => {
  const cacheKey = `${subIndex}:${fetchedData[subIndex]}`;

  const cachedData = cache.get(cacheKey) as [];
  if (cachedData) {
    const newAssignedData = fetchedData[subIndex] = cachedData;
    return newAssignedData;
  }

  const propertyValue = fetchedData[subIndex];

  if (Array.isArray(propertyValue)) {
    const filmsData = await fetchFilmsInBatch(propertyValue);
    const newAssignedData = fetchedData[subIndex] = filmsData;

    cache.set(cacheKey, newAssignedData);

    return newAssignedData;
  }
  if (typeof propertyValue === 'string') {
    const response = await axios.get(propertyValue);
    const newAssignedData = fetchedData[subIndex] = response.data;

    cache.set(cacheKey, newAssignedData);

    return newAssignedData;
  }
  throw new AppError('Wrong data type');
};
