import { Router } from 'express';
import {
  getPlanets, getPlanetsById, getPlanetsByIdAndBatch, getPlanetsByIdAndBatchCharacters, getPlanetsByIdAndBatchFilms,
} from '../controllers/planets.controller';

const router = Router();

router.get('/', getPlanets);
router.get('/:id', getPlanetsById);
router.get('/:id/batched', getPlanetsByIdAndBatch);
router.get('/:id/batched/characters', getPlanetsByIdAndBatchCharacters);
router.get('/:id/batched/films', getPlanetsByIdAndBatchFilms);

export default router;
