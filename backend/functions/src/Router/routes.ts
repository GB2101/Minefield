import { Router } from 'express';

import { Validate } from '@Middlewares/Validate';

import { HelloController } from '@Controllers/Hello';
import { GameController } from '@Controllers/Game';

const router = Router();

router.get('/', HelloController);
router.post('/game', Validate({ body: GameController.Schemas.Body }), GameController.Generate);

export default router;
