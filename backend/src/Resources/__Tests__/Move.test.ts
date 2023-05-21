import { Move, Board } from '../index';

describe('Testing Move Resource', () => {
	let board: Board;

	beforeEach(() => {
		board = new Board(5, 5);
		board.MarkBombs({ x: 2, y: 2 });
	});

	test('Expects to movement out of bounds to throw an error', () => {
		const Execute = () => {
			new Move(board, { x: 5, y: 5 });
		};

		expect(Execute).toThrowError();
	});

	test('Expects open cells to be correct', () => {
		const move = new Move(board, { x: 1, y: 1 });
		const movement = move.GetMovement();

		expect(board.GetCell({ x: 1, y: 1 }).state).toBe('open');

		expect(movement.status).toBe('Playing');
		expect(movement.open_cells.length).toBe(1);
		expect(movement.open_cells[0]).toEqual({ bomb: false, content: 1, coord: { x: 1, y: 1 }});
	});

	test('Expects to open bomb', () => {
		const move = new Move(board, { x: 2, y: 2 });
		const movement = move.GetMovement();

		expect(movement.status).toBe('Lost');
		expect(movement.open_cells.length).toBe(1);
		expect(movement.open_cells[0]).toEqual({ bomb: true, content: -1, coord: { x: 2, y: 2 }});
	});

	test('Expects to open multiple blank cells', () => {
		const move = new Move(board, { x: 0, y: 0 });
		const movement = move.GetMovement();

		expect(movement.status).toBe('Playing');
		expect(movement.open_cells.length).toBe(24);
	});

	test('Expects to loose when opening an opened cell without flags', () => {
		new Move(board, { x: 1, y: 1 });
		const move = new Move(board, { x: 1, y: 1 });
		const movement = move.GetMovement();

		expect(movement.status).toBe('Lost');
		expect(movement.open_cells.length).toBe(24);
	});

	test('Expects to win when opening an opened cell with flags', () => {
		new Move(board, { x: 1, y: 1 });
		const move = new Move(board, { x: 1, y: 1 }, [{ x: 2, y: 2 }]);
		const movement = move.GetMovement();

		expect(movement.status).toBe('Playing');
		expect(movement.open_cells.length).toBe(23);
	});
});
