import { AsyncMiddleware } from '@Interfaces/Request';
import { Firebase } from '@Resolvers/Database/Firebase';
import { GameService } from '@Services/Game';
import { GameInterface } from '@Interfaces/Game';
import { Collections } from '@Mappings/Collections';
// import { MoveParamsType } from '@Schemas/Move';
import { ValidationError } from '@Errors/Error';

const GameId: AsyncMiddleware = () => async (req, res, next) => {
	// const firebase = new Firebase<GameInterface>();
	// const Database = new GameService(firebase);

	// const { id } = res.locals.params as MoveParamsType;
	// try {
	// 	const document = await Database.LookUp(Collections.Games, id);

	// 	res.locals.document = document;
	// 	next();
	// } catch (error) {
	// 	if (error instanceof ValidationError) {
	// 		res.status(error.status).send({
	// 			code: error.code,
	// 			issues: [ error.GetIssue() ],
	// 		});
	// 	}
	// }
};

export { GameId };
