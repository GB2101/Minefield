import { Cell, Coord } from '@Interfaces/Game';

const UpdateCell = (cell: Cell, bomb: boolean): void => {
	cell.bomb = bomb;
	cell.state = 'closed';
	cell.content = bomb ? -1 : cell.content + 1;
};

const UpdateBoard = (board: Cell[][], bomb: Coord, limits: Coord): void => {
	const spaces = [
		{ x: 0, y: 1 },
		{ x: 1, y: 1 },
		{ x: 1, y: 0 },
		{ x: 1, y: -1 },
		{ x: 0, y: -1 },
		{ x: -1, y: -1 },
		{ x: -1, y: 0 },
		{ x: -1, y: 1 },
	];

	UpdateCell(board[bomb.x][bomb.y], true);
	for (const space of spaces) {
		const x = bomb.x + space.x;
		const y = bomb.y + space.y;

		if (x < 0 || x >= limits.x) {
			continue;
		}

		if (y < 0 || y >= limits.y) {
			continue;
		}

		if (board[x][y].bomb) {
			continue;
		}

		UpdateCell(board[x][y], false);
	}
};

export { UpdateBoard, UpdateCell };
