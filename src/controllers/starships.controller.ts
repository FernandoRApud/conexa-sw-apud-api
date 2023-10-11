import { Request, Response } from 'express';
import { handleAppError } from '../utils/error.utility';
import {
  batchFilms, batchPilots, getAllStarships, getStarship,
} from '../services/starships.services';

export const getStarships = async (req: Request, res: Response) => {
  try {
    const { search } = req.query as { search: string };
    const starship = search ? await getAllStarships(search) : await getAllStarships();
    return res.status(200).json(starship);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
export const getStarshipsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const starship = await getStarship(id);
    return res.status(200).json(starship);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getStarshipsByIdAndBatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const starship = await getStarship(id);
    await Promise.all([
      await batchPilots(starship),
      await batchFilms(starship),
    ]);
    return res.status(200).json(starship);
  } catch (error: unknown) {
    console.error(error);
    return handleAppError(res, error);
  }
};

export const getStarshipsByIdAndBatchPilots = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const starship = await getStarship(id);
    await batchPilots(starship);
    return res.status(200).json(starship);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getStarshipsByIdAndBatchFilms = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const starship = await getStarship(id);
    await batchFilms(starship);
    return res.status(200).json(starship);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
