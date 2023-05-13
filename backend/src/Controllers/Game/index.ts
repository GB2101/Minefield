import { Generate } from './Generate';
import { Schemas } from './Schemas/Generate';
import { Middlewares } from './Middlewares/Generate';

const GameController = {
	Generate,
};

const GameSchemas = {
	Generate: Schemas,
};

const GameFunctions = {
	Generate: Middlewares,
};

export { GameController, GameSchemas, GameFunctions };
