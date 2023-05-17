import { GameInterface } from '@Interfaces/Game';
import { Handler } from '@Interfaces/Request';
import { Game } from '@Resources/Game';

const MakeMove: Handler = (req, res) => {
	const document = res.locals.document as GameInterface;

	const game = new Game({ ...document }, document);

	res.send({ test });
};

export { MakeMove };
