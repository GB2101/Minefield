import { GameInterface } from '@Interfaces/Game';
import { AsyncHandler } from '@Interfaces/Request';
import { Firebase } from '@Resolvers/Database/Firebase';
import { GameService } from '@Services/Game';
import { IDParamsType } from '@Schemas/Params';
import { ValidationError } from '@Errors/index';
import { Collections } from '@Mappings/Collections';
import { Game } from '@Resources/Game';

const MakeMove: AsyncHandler = async (req, res) => {
	const firebase = new Firebase<GameInterface>();
	const database = new GameService(firebase);

	const { id } = res.locals.params as IDParamsType;
	try {
		const document = await database.LookUp(Collections.Games, id);

		const game = new Game({ ...document }, document);
	} catch (error) {
		if (error instanceof ValidationError) {
			res.status(error.status).send({
				code: error.code,
				issues: [ error.GetIssue() ],
			});
		}
	}
};

export { MakeMove };
