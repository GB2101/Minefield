import { MakeMove } from './MakeMove';
import { Schemas } from './Schemas/MakeMove';
import { Middlewares } from './Middlewares/ValidateId';

export const MoveController = {
	MakeMove,
};

export const MoveSchemas = {
	MakeMove: Schemas,
};

export const MoveFunctions = Middlewares;
