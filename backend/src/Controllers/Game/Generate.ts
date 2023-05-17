import { Request, Response } from 'express';

import { Game } from '@Resources/Game';
import { BodyType } from './Schemas/Generate';
import { Error400 } from '@Interfaces/Errors';
import { GameInterface, Data } from '@Interfaces/Game';
import { ErrorInvalidArgs } from '@Errors/ErrorInvalidArgs';
import { Firebase } from '@Resolvers/Database/Firebase';
import { GameService } from '@Services/Game';

const Generate = async (req: Request, res: Response): Promise<void> => {
	const { bombs, height, width } = res.locals.body as BodyType;

	try {
		const game = new Game({ width, height, bombs });
		game.Generate();

		const Database = new Firebase<Data>();

		const service = new GameService(Database);
		await service.Generate(game.GetData(), 'Games');

		res.send({ game });
	} catch (error) {
		if (error instanceof ErrorInvalidArgs) {
			res.status(400).send({
				error: 'InvalidArgument',
				issues: [ error ],
			} as Error400);
		}
	}
};

export { Generate };
