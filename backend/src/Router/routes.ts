import { Router } from 'express';

import { Validate } from '@Middlewares/Validate';

import { HelloController } from '@Controllers/Hello';
import { GameController, GameSchemas } from '@Controllers/Game';

const router = Router();

router.get('/', HelloController);
router.post('/game', Validate(GameSchemas.Generate.Body, 'body'), GameController.Generate);

export default router;
