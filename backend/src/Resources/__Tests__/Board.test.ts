import { Board } from '../Board';
import { CellInterface } from '@Interfaces/Game';

describe('Testing Board Resource', () => {
	let board = new Board(5, 5);

	beforeEach(() => {
		board = new Board(5, 5);
	});

	test('Expect board to get correct cell', () => {
		board = new Board(4, 3);
		const coord1 = { x: 0, y: 1 };
		const coord2 = { x: 1, y: 0 };
		const coord3 = { x: 2, y: 2 };
		const coord4 = { x: 3, y: 1 };

		expect(board.GetCell(coord1).coord).toEqual(coord1);
		expect(board.GetCell(coord2).coord).toEqual(coord2);
		expect(board.GetCell(coord3).coord).toEqual(coord3);
		expect(board.GetCell(coord4).coord).toEqual(coord4);
	});

	test('Expects board to be assigned correctly', () => {
		const cells: CellInterface[] = [
			{ coord: { x: 0, y: 0 }, bomb: true, content: -1, state: 'closed' },
			{ coord: { x: 0, y: 1 }, bomb: false, content: 2, state: 'open' },
			{ coord: { x: 1, y: 0 }, bomb: true, content: -1, state: 'closed' },
			{ coord: { x: 1, y: 1 }, bomb: false, content: 2, state: 'open' },
		];

		board = new Board(2, 2, cells);

		expect(board.GetCell({ x: 0, y: 0 }).GetData()).toEqual(cells[0]);
		expect(board.GetCell({ x: 0, y: 1 }).GetData()).toEqual(cells[1]);
		expect(board.GetCell({ x: 1, y: 0 }).GetData()).toEqual(cells[2]);
		expect(board.GetCell({ x: 1, y: 1 }).GetData()).toEqual(cells[3]);
	});

	test('Expects board to be updated correctly once', () => {
		board.MarkBombs({ x: 2, y: 2 });

		for (let x = 0; x < 5; x++) {
			for (let y = 0; y < 5; y++) {
				if (x !== 2 || y !== 2) {
					expect(board.GetCell({ x, y }).bomb).toEqual(false);
				} else {
					expect(board.GetCell({ x, y }).bomb).toEqual(true);
				}
			}
		}
	});

	test('Expects board corners to be updated correctly - 1', () => {
		board.MarkBombs({ x: 0, y: 0 });

		for (let x = 0; x <= 1; x++) {
			for (let y = 0; y <= 1; y++) {
				if (x !== 0 || y !== 0) {
					expect(board.GetCell({ x, y }).bomb).toEqual(false);
				} else {
					expect(board.GetCell({ x, y }).bomb).toEqual(true);
				}
			}
		}
	});

	test('Expects board corners to be updated correctly - 2', () => {
		board.MarkBombs({ x: 4, y: 4 });

		for (let x = 3; x <= 4; x++) {
			for (let y = 3; y <= 4; y++) {
				if (x !== 4 || y !== 4) {
					expect(board.GetCell({ x, y }).bomb).toEqual(false);
				} else {
					expect(board.GetCell({ x, y }).bomb).toEqual(true);
				}
			}
		}
	});

	test('Expects updates not to interfere with each other', () => {
		board.MarkBombs({ x: 1, y: 1 });
		board.MarkBombs({ x: 2, y: 2 });

		expect(board.GetCell({ x: 1, y: 1 }).bomb).toEqual(true);
		expect(board.GetCell({ x: 2, y: 2 }).bomb).toEqual(true);
	});

	test('Expects content to be updated correctly', () => {
		board.MarkBombs({ x: 1, y: 1 });
		board.MarkBombs({ x: 2, y: 2 });

		expect(board.GetCell({ x: 1, y: 1 }).bomb).toEqual(true);
		expect(board.GetCell({ x: 2, y: 2 }).bomb).toEqual(true);

		expect(board.GetCell({ x: 0, y: 0 }).content).toEqual(1);
		expect(board.GetCell({ x: 1, y: 0 }).content).toEqual(1);
		expect(board.GetCell({ x: 2, y: 0 }).content).toEqual(1);
		expect(board.GetCell({ x: 0, y: 1 }).content).toEqual(1);
		expect(board.GetCell({ x: 0, y: 2 }).content).toEqual(1);
		expect(board.GetCell({ x: 0, y: 0 }).content).toEqual(1);

		expect(board.GetCell({ x: 3, y: 1 }).content).toEqual(1);
		expect(board.GetCell({ x: 3, y: 2 }).content).toEqual(1);
		expect(board.GetCell({ x: 3, y: 3 }).content).toEqual(1);
		expect(board.GetCell({ x: 2, y: 3 }).content).toEqual(1);
		expect(board.GetCell({ x: 1, y: 3 }).content).toEqual(1);

		expect(board.GetCell({ x: 1, y: 2 }).content).toEqual(2);
		expect(board.GetCell({ x: 2, y: 1 }).content).toEqual(2);
	});
});
