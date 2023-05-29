import { GameService } from '@Services/Game';
import { IDParamsType } from '@Schemas/index';
import { ValidationError } from '@Errors/index';
import { GameInterface } from '@Interfaces/Game';
import { AsyncHandler } from '@Interfaces/Request';
import { Collections } from '@Mappings/Collections';
import { Firebase } from '@Resolvers/Database/Firebase';

const Find: AsyncHandler = async (req, res) => {
	const firebase = new Firebase<GameInterface>();
	const service = new GameService(firebase);

	const { id } = res.locals.params as IDParamsType;

	try {
		const document = await service.LookUp(Collections.games, id);

		const board = document.board.filter(cell => cell.state === 'open');

		res.status(200).send({
			width: document.width,
			height: document.height,
			bombs: document.bombs,
			board,
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

export { Find };
