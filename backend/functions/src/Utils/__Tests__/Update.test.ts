import { Cell } from '@Interfaces/Game';
import { UpdateCell, UpdateBoard } from '../Update';

describe('Testing Updating Cell Function', () => {
	const cell: Cell = {
		bomb: false,
		state: 'closed',
		content: 0,
	};

	beforeEach(() => {
		cell.bomb = false;
		cell.state = 'closed';
		cell.content = 0;
	});

	test('Expects cell to be updated as bomb', () => {
		UpdateCell(cell, true);

		expect(cell.bomb).toBe(true);
		expect(cell.state).toBe('closed');
		expect(cell.content).toBe(-1);
	});

	test('Expects cell to be updated correctly', () => {
		UpdateCell(cell, false);

		expect(cell.bomb).toBe(false);
		expect(cell.state).toBe('closed');
		expect(cell.content).toBe(1);
	});

	test('Expects cell to be updated correctly multiple times', () => {
		UpdateCell(cell, false);
		UpdateCell(cell, false);
		UpdateCell(cell, false);

		expect(cell.bomb).toBe(false);
		expect(cell.state).toBe('closed');
		expect(cell.content).toBe(3);
	});
});

describe('Testing Update Board Function', () => {
	const board: Cell[][] = [];
	const cell: Cell = {
		bomb: false,
		state: 'closed',
		content: 1,
	};
	const bomb: Cell = {
		bomb: true,
		state: 'closed',
		content: -1,
	};

	beforeEach(() => {
		for (let x = 0; x < 5; x++) {
			board[x] = [];
			for (let y = 0; y < 5; y++) {
				board[x][y] = {
					bomb: false,
					state: 'closed',
					content: 0,
				};
			}
		}
	});

	test('Expects board to be updated correctly once', () => {
		UpdateBoard(board, { x: 2, y: 2 }, { x: 5, y: 5 });

		for (let i = 1; i <= 3; i++) {
			for (let j = 1; j <= 3; j++) {
				if (i !== 2 || j !== 2) {
					expect(board[i][j]).toEqual(cell);
				} else {
					expect(board[i][j]).toEqual(bomb);
				}
			}
		}
	});

	test('Expects board corners to be updated correctly - 1', () => {
		UpdateBoard(board, { x: 0, y: 0 }, { x: 5, y: 5 });

		for (let i = 0; i <= 1; i++) {
			for (let j = 0; j <= 1; j++) {
				if (i !== 0 || j !== 0) {
					expect(board[i][j]).toEqual(cell);
				} else {
					expect(board[i][j]).toEqual(bomb);
				}
			}
		}
	});

	test('Expects board corners to be updated correctly - 2', () => {
		UpdateBoard(board, { x: 4, y: 4 }, { x: 5, y: 5 });

		for (let i = 3; i <= 4; i++) {
			for (let j = 3; j <= 4; j++) {
				if (i !== 4 || j !== 4) {
					expect(board[i][j]).toEqual(cell);
				} else {
					expect(board[i][j]).toEqual(bomb);
				}
			}
		}
	});

	test('Expects updates not to interfere with each other', () => {
		UpdateBoard(board, { x: 1, y: 1 }, { x: 5, y: 5 });
		UpdateBoard(board, { x: 2, y: 2 }, { x: 5, y: 5 });

		expect(board[1][1]).toEqual(bomb);
		expect(board[2][2]).toEqual(bomb);
	});

	test('Expects content to be updated correctly', () => {
		UpdateBoard(board, { x: 1, y: 1 }, { x: 5, y: 5 });
		UpdateBoard(board, { x: 2, y: 2 }, { x: 5, y: 5 });

		const cell2: Cell = { ...cell };
		cell2.content = 2;

		expect(board[1][1]).toEqual(bomb);
		expect(board[2][2]).toEqual(bomb);

		expect(board[0][0]).toEqual(cell);
		expect(board[1][0]).toEqual(cell);
		expect(board[2][0]).toEqual(cell);
		expect(board[0][1]).toEqual(cell);
		expect(board[0][2]).toEqual(cell);
		expect(board[0][0]).toEqual(cell);

		expect(board[3][1]).toEqual(cell);
		expect(board[3][2]).toEqual(cell);
		expect(board[3][3]).toEqual(cell);
		expect(board[2][3]).toEqual(cell);
		expect(board[1][3]).toEqual(cell);

		expect(board[1][2]).toEqual(cell2);
		expect(board[2][1]).toEqual(cell2);
	});
});
