import { Board } from '../Board';

describe('Testing Board Resource', () => {
	let board = new Board(5, 5);

	beforeEach(() => {
		board = new Board(5, 5);
	});

	test('Expects board to be updated correctly once', () => {
		board.UpdateCells({ x: 2, y: 2 });

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
		board.UpdateCells({ x: 0, y: 0 });

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
		board.UpdateCells({ x: 4, y: 4 });

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
		board.UpdateCells({ x: 1, y: 1 });
		board.UpdateCells({ x: 2, y: 2 });

		expect(board.GetCell({ x: 1, y: 1 }).bomb).toEqual(true);
		expect(board.GetCell({ x: 2, y: 2 }).bomb).toEqual(true);
	});

	test('Expects content to be updated correctly', () => {
		board.UpdateCells({ x: 1, y: 1 });
		board.UpdateCells({ x: 2, y: 2 });

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
