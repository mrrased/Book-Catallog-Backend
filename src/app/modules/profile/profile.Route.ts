import express from 'express';
import { PorfileController } from './profile.Controller';

const router = express.Router();

router.get('/', PorfileController.getProfile);

export const ProfileRoutes = router;
