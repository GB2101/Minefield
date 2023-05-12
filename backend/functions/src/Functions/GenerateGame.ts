import { Random } from '@Utils/Random';
import { Contains } from '@Utils/Array';
import { UpdateBoard } from '@Utils/Update';
import { Board, Cell, Coord } from '@Interfaces/Game';

type Declaration = (width: number, height: number, bombs: number) => Board;
const GenerateGame: Declaration = (width, height, bombs) => {
	const board: Cell[][] = [];
	for (let x = 0; x < width; x++) {
		board[x] = [];
		for (let y = 0; y < height; y++) {
			board[x][y] = {
				bomb: false,
				state: 'closed',
				content: 0,
			};
		}
	}

	const locations: Coord[] = [];
	let x: number, y: number;
	for (let i = 0; i < bombs; i++) {
		x = Random(width);
		y = Random(height);

		while (Contains({ x, y }, locations)) {
			x = Random(width);
			y = Random(height);
		}

		locations.push({ x, y });
		UpdateBoard(board, { x, y }, { x: width, y: height });
	}

	return {
		width,
		height,
		bombs,
		board,
		locations,
	};
};

export { GenerateGame };
