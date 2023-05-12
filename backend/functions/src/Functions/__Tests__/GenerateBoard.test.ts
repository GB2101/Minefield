import { GenerateGame } from '../GenerateGame';

describe('Testing Board Generation Function', () => {
	test('Expects board to have correct size', () => {
		const board = GenerateGame(6, 7, 10);

		expect(board.width).toBe(6);
		expect(board.height).toBe(7);
		expect(board.bombs).toBe(10);
		expect(board.locations.length).toBe(10);
	});

	test('Expects board to have the correct number of bombs', () => {
		const game = GenerateGame(10, 10, 45);

		let counter = 0;
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				if (game.board[i][j].bomb) counter++;
			}
		}

		expect(counter).toBe(45);
	});

	test('Expects bomb locations to be different', () => {
		const { locations: loc } = GenerateGame(10, 10, 45);

		let counter = 0;
		for (let i = 0; i < loc.length; i++) {
			for (let j = i + 1; j < loc.length; j++) {
				if (loc[i].x === loc[j].x && loc[i].y === loc[j].y) {
					counter++;
				}
			}
		}

		expect(counter).toBe(0);
	});
});
