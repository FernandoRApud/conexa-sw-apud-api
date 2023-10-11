import { Request, Response } from 'express';
import {
  batchFilms, batchHomeworld, batchSpecies, batchStarships, batchVehicles, getAllPeoples, getPeople,
} from '../services/people.services';
import { handleAppError } from '../utils/error.utility';

export const getPeoples = async (_req: Request, res: Response) => {
  try {
    const people = await getAllPeoples();
    return res.status(200).json(people);
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
