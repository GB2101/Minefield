import { Router } from 'express';

import { Validate } from '@Middlewares/Validate';

import { HelloController } from '@Controllers/Hello';
import { GameController, GameSchemas, GameFunctions } from '@Controllers/Game';

const router = Router();

router.get('/', HelloController);
router.post('/game', Validate(GameSchemas.Generate.Body, 'body'), GameFunctions.Generate.BodyValues, GameController.Generate);

export default router;
