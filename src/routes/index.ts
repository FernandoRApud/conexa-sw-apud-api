import express from 'express';

import charactersRoutes from './characters.route';
import moviesRoutes from './movies.route';
import planetsRoutes from './planets.route';
import speciesRoutes from './species.route';
import starshipsRoutes from './starships.route';
import vehiclesRoutes from './vehicles.route';

const router = express.Router();

router.use('/characters', charactersRoutes);
router.use('/movies', moviesRoutes);
router.use('/planets', planetsRoutes);
router.use('/species', speciesRoutes);
router.use('/starships', starshipsRoutes);
router.use('/vehicles', vehiclesRoutes);

export default router;
