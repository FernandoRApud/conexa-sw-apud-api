import { Request, Response } from 'express';
import { handleAppError } from '../utils/error.utility';
import {
  batchFilms, batchPeople, getAllSpecies, getSpecies,
} from '../services/species.services';

export const getSpeciesFilter = async (req: Request, res: Response) => {
  try {
    const { search } = req.query as { search: string };
    const species = search ? await getAllSpecies(search) : await getAllSpecies();
    return res.status(200).json(species);
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
