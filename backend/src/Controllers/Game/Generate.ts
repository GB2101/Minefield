import { AsyncHandler } from '@Interfaces/Request';

import { Game } from '@Resources/Game';
import { BodyType } from './Schemas/Generate';
import { Error400 } from '@Interfaces/Errors';
import { GameInterface } from '@Interfaces/Game';
import { ValidationError } from '@Errors/index';
import { Firebase } from '@Resolvers/Database/Firebase';
import { GameService } from '@Services/Game';

const Generate: AsyncHandler = async (req, res) => {
	const { bombs, height, width } = res.locals.body as BodyType;

	try {
		const game = new Game({ width, height, bombs });

		const Database = new Firebase<GameInterface>();

		const service = new GameService(Database);
		const id = await service.Generate(game.GetData(), 'Games');

		res.status(201).send({ id });
	} catch (error) {
		if (error instanceof ValidationError) {
			res.status(error.status).send({
				error: error.code,
				issues: [ error.GetIssue() ],
			} as Error400);
		}
	}
};

export { Generate };
