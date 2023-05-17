import { AsyncMiddleware } from '@Interfaces/Request';
import { Firebase } from '@Resolvers/Database/Firebase';
import { GameService } from '@Services/Game';
import { GameInterface } from '@Interfaces/Game';
import { Collections } from '@Mappings/Collections';
import { ParamsType } from '../Schemas/MakeMove';
import { ValidationError } from '@Errors/Error';

const ValidateId: AsyncMiddleware = () => async (req, res, next) => {
	const firebase = new Firebase<GameInterface>();
	const Database = new GameService(firebase);

	const { id } = res.locals.params as ParamsType;
	try {
		const document = await Database.LookUp(Collections.Games, id);

		res.locals.document = document;
		next();
	} catch (error) {
		if (error instanceof ValidationError) {
			res.status(error.status).send({
				code: error.code,
				issues: [ error.GetIssue() ],
			});
		}
	}
};

export const Middlewares = { ValidateId };
