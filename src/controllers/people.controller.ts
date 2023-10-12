import { Request, Response } from 'express';
import {
  batchFilms, batchHomeworld, batchSpecies, batchStarships, batchVehicles, getAllPeoples, getPeople, getPeoplesByPage, getPeoplesBySearch, getPeoplesBySearchAndPage,
} from '../services/people.services';
import AppError, { handleAppError } from '../utils/error.utility';

export const getPeoples = async (req: Request, res: Response) => {
  try {
    const { search, page } = req.query as { search: string, page: string };
    if (search && page) {
      const people = await getPeoplesBySearchAndPage(search, page);
      return res.status(200).json(people);
    }
    if (search) {
      const people = await getPeoplesBySearch(search);
      return res.status(200).json(people);
    }
    if (page) {
      const people = await getPeoplesByPage(page);
      return res.status(200).json(people);
    }
    if (!search && !page) {
      const people = await getAllPeoples();
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
