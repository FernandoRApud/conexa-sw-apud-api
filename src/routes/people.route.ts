import { Router } from 'express';
import {
  getPeopleById,
  getPeopleByIdAndBatch,
  getPeopleByIdAndBatchFilms,
  getPeopleByIdAndBatchHomeworld,
  getPeopleByIdAndBatchSpecies,
  getPeopleByIdAndBatchStarships,
  getPeopleByIdAndBatchVehicles,
} from '../controllers/people.controller';

const router = Router();

// router.get('/', getPeoples);
router.get('/:id', getPeopleById);
router.get('/:id/batched', getPeopleByIdAndBatch);
router.get('/:id/batched/homeworld', getPeopleByIdAndBatchHomeworld);
router.get('/:id/batched/films', getPeopleByIdAndBatchFilms);
router.get('/:id/batched/species', getPeopleByIdAndBatchSpecies);
router.get('/:id/batched/vehicles', getPeopleByIdAndBatchVehicles);
router.get('/:id/batched/starships', getPeopleByIdAndBatchStarships);

export default router;
