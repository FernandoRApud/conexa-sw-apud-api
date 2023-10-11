import { Router } from 'express';
import {
  getFilms,
  getFilmsById,
  getFilmsByIdAndBatch,
  getFilmsByIdAndBatchCharacters,
  getFilmsByIdAndBatchPlanets,
  getFilmsByIdAndBatchSpecies,
  getFilmsByIdAndBatchStarships,
  getFilmsByIdAndBatchVehicles,
} from '../controllers/films.controller';

const router = Router();

router.get('/', getFilms);
router.get('/:id', getFilmsById);
router.get('/:id/batched', getFilmsByIdAndBatch);
router.get('/:id/batched/characters', getFilmsByIdAndBatchCharacters);
router.get('/:id/batched/planets', getFilmsByIdAndBatchPlanets);
router.get('/:id/batched/species', getFilmsByIdAndBatchSpecies);
router.get('/:id/batched/vehicles', getFilmsByIdAndBatchVehicles);
router.get('/:id/batched/starships', getFilmsByIdAndBatchStarships);

export default router;
