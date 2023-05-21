import { Game } from '../Game';
import { GameInterface, Coord } from '@Interfaces/Game';

describe('Testing Game Resource', () => {
	let game: Game;

	beforeEach(() => {
		game = new Game({ width: 10, height: 10, bombs: 45 });
	});

	test('Expects board to have correct size', () => {
		expect(game.width).toBe(10);
		expect(game.height).toBe(10);
		expect(game.bombs).toBe(45);
		expect(game.locations.length).toBe(45);
	});

	test('Expects board to have the correct number of bombs', () => {
		let counter = 0;
		for (const cell of game.board) {
			if (cell.bomb) counter++;
		}

		expect(counter).toBe(45);
	});

	test('Expects bomb locations to be correct', () => {
		const { locations } = game;

		let counter = 0;
		for (const bomb of locations) {
			if (game.GetCell(bomb).bomb) {
				counter++;
			}
		}

		expect(counter).toBe(45);
	});

	test('Expects to throw error when number of bombs is to high', () => {
		const createGameSafe = () => new Game({ width: 5, height: 5, bombs: 10 });
		const createGameUnSafe = () => new Game({ width: 5, height: 5, bombs: 15 });

		expect(createGameSafe).not.toThrow();
		expect(createGameUnSafe).toThrow();
	});

	test('Expects game to be assigned correctly', () => {
		const data: GameInterface = {
			height: 2,
			width: 2,
			bombs: 2,
			status: 'Playing',
			locations: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
			board: [
				{ coord: { x: 0, y: 0 }, bomb: true, content: -1, state: 'closed' },
				{ coord: { x: 0, y: 1 }, bomb: false, content: 2, state: 'open' },
				{ coord: { x: 1, y: 0 }, bomb: true, content: -1, state: 'closed' },
				{ coord: { x: 1, y: 1 }, bomb: false, content: 2, state: 'closed' },
			],
			movements: [
				{
					status: 'Playing',
					coord: { x: 1, y: 0 },
					open_cells: [{ bomb: false, content: 2, coord: { x: 1, y: 0 }}],
				},
			],
		};

		game = new Game({ ...data }, data);
		expect(game.GetData()).toEqual(data);
	});

	test('Expects move to be correct', () => {
		let coord: Coord = { x: 0, y: 0 };
		for (let i = 0; i < game.board.length; i++) {
			if (!game.board[i].bomb) {
				coord = {
					x: Math.floor(i / 10),
					y: i % 10,
				};
				break;
			}
		}
		const move = game.MakeMove(coord);
		expect(move.status).toBe('Playing');
		expect(move.open_cells.length).toBeGreaterThan(0);
	});
});


