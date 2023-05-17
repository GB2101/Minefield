import { Game } from '../Game';

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
});


