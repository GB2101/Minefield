import { Router } from 'express';

import { Validate, GameId } from '@Middlewares/index';

import { HelloController } from '@Controllers/Hello';
import { GameController } from '@Controllers/Game';
import { MoveController } from '@Controllers/Move';
import { GameSchemas, MoveSchemas, Request } from '@Schemas/index';

const router = Router();

router.get('/', HelloController);

router.post('/game', Validate(GameSchemas.Body, 'body'), GameController.Generate);
router.get('/game/:id', Validate(Request.Params, 'params'), GameController.Find);

router.post('/game/:id', Validate(Request.Params, 'params'), Validate(MoveSchemas.Body, 'body'), MoveController.MakeMove);

export default router;
