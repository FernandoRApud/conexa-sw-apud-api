import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import {
  batchFilms, batchHomeworld, batchSpecies, batchStarships, batchVehicles, getAllPeoples, getPeople, getPeoplesByPage, getPeoplesBySearch, getPeoplesBySearchAndPage,
} from '../services/people.services';
import AppError, { handleAppError } from '../utils/error.utility';
import { CACHE_DURATION_SECONDS, ROUTES } from '../constants';

const cache = new NodeCache({ stdTTL: CACHE_DURATION_SECONDS });

export const getPeoples = async (req: Request, res: Response) => {
  try {
    const { search, page } = req.query as { search: string, page: string };
    if (search && page) {
      const cacheKey = `${ROUTES.PEOPLE}$?search=${search}&page=${page}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const people = await getPeoplesBySearchAndPage(search, page);
      cache.set(cacheKey, people);
      return res.status(200).json(people);
    }
    if (search) {
      const cacheKey = `${ROUTES.PEOPLE}$?search=${search}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const people = await getPeoplesBySearch(search);
      cache.set(cacheKey, people);
      return res.status(200).json(people);
    }
    if (page) {
      const cacheKey = `${ROUTES.PEOPLE}$?page=${page}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const people = await getPeoplesByPage(page);
      cache.set(cacheKey, people);
      return res.status(200).json(people);
    }
    if (!search && !page) {
      const cacheKey = `${ROUTES.PEOPLE}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const people = await getAllPeoples();
      cache.set(cacheKey, people);
      return res.status(200).json(people);
    }
    throw new AppError('Invalid route');
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
export const getPeopleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const people = await getPeople(id);
    return res.status(200).json(people);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getPeopleByIdAndBatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const people = await getPeople(id);
    await Promise.all([
      await batchHomeworld(people),
      await batchFilms(people),
      await batchSpecies(people),
      await batchVehicles(people),
      await batchStarships(people),
    ]);
    return res.status(200).json(people);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getPeopleByIdAndBatchHomeworld = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const people = await getPeople(id);
    await batchHomeworld(people);
    return res.status(200).json(people);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getPeopleByIdAndBatchFilms = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const people = await getPeople(id);
    await batchFilms(people);
    return res.status(200).json(people);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getPeopleByIdAndBatchSpecies = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const people = await getPeople(id);
    await batchSpecies(people);
    return res.status(200).json(people);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getPeopleByIdAndBatchVehicles = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const people = await getPeople(id);
    await batchVehicles(people);
    return res.status(200).json(people);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getPeopleByIdAndBatchStarships = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const people = await getPeople(id);
    await batchStarships(people);
    return res.status(200).json(people);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
