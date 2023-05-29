import { FieldValue } from 'firebase-admin/firestore';

import { GameInterface, Movement } from '@Interfaces/Game';
import { AsyncHandler } from '@Interfaces/Request';
import { Firebase } from '@Resolvers/Database/Firebase';
import { GameService } from '@Services/Game';
import { IDParamsType, MoveBodyType } from '@Schemas/index';
import { ValidationError } from '@Errors/index';
import { Collections } from '@Mappings/Collections';
import { Game } from '@Resources/index';

const MakeMove: AsyncHandler = async (req, res) => {
	const firebase = new Firebase<GameInterface>();
	const service = new GameService(firebase);

	const params = res.locals.params as IDParamsType;
	const body = res.locals.body as MoveBodyType;
	try {
		const document = await service.LookUp(Collections.games, params.id);

		if (document.status !== 'Playing') {
			const message = `This game is already ${document.status}. You can not make more moves.`;
			throw new ValidationError('GameAlreadyFinished', 'you_have_won', 400, message);
		}

		const flags = body.flags?.map(flag => ({ x: flag.coord_x, y: flag.coord_y }));

		const game = new Game({ ...document }, document);
		const move = game.MakeMove({ x: body.coord_x, y: body.coord_y }, flags);

		await service.Update(
			{
				board: game.board,
				status: move.status,
				movements: game.movements,
			},
			Collections.games,
			params.id,
		);

		res.status(200).send({
			status: move.status,
			open_cells: move.open_cells,
		});
	} catch (error) {
		if (error instanceof ValidationError) {
			res.status(error.status).send({
				error: error.issue,
				issues: [ error.GetIssue() ],
			});
		}
	}
};

export { MakeMove };
