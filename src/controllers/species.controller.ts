import { Request, Response } from 'express';
import AppError, { handleAppError } from '../utils/error.utility';
import {
  batchFilms, batchPeople, getAllSpecies, getSpecies, getSpeciesByPage, getSpeciesBySearch, getSpeciesBySearchAndPage,
} from '../services/species.services';

export const getSpeciesFilter = async (req: Request, res: Response) => {
  try {
    const { search, page } = req.query as { search: string, page: string };
    if (search && page) {
      const species = await getSpeciesBySearchAndPage(search, page);
      return res.status(200).json(species);
    }
    if (search) {
      const species = await getSpeciesBySearch(search);
      return res.status(200).json(species);
    }
    if (page) {
      const species = await getSpeciesByPage(page);
      return res.status(200).json(species);
    }
    if (!search && !page) {
      const species = await getAllSpecies();
      return res.status(200).json(species);
    }
    throw new AppError('Invalid route');
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
export const getSpeciesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const species = await getSpecies(id);
    return res.status(200).json(species);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getSpeciesByIdAndBatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const species = await getSpecies(id);
    await Promise.all([
      await batchPeople(species),
      await batchFilms(species),
    ]);
    return res.status(200).json(species);
  } catch (error: unknown) {
    console.error(error);
    return handleAppError(res, error);
  }
};

export const getSpeciesByIdAndBatchPeople = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const species = await getSpecies(id);
    await batchPeople(species);
    return res.status(200).json(species);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getSpeciesByIdAndBatchFilms = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const species = await getSpecies(id);
    await batchFilms(species);
    return res.status(200).json(species);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
