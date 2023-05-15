import { Game } from '../Game';

describe('Testing Game Resource - Board Generation', () => {
	let game: Game;

	beforeEach(() => {
		game = new Game({ width: 10, height: 10, bombs: 45 });
		game.Generate();
	});

	test('Expects board to have correct size', () => {
		expect(game.width).toBe(10);
		expect(game.height).toBe(10);
		expect(game.bombs).toBe(45);
		expect(game.locations.length).toBe(45);
	});

	test('Expects board to have the correct number of bombs', () => {
		let counter = 0;
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				if (game.board[i][j].bomb) counter++;
			}
		}

		expect(counter).toBe(45);
	});

	test('Expects bomb locations to be different', () => {
		const { locations: loc } = game;

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

	test('Expects to throw error when number of bombs is to high', () => {
		const createGameSafe = () => new Game({ width: 5, height: 5, bombs: 10 });
		const createGameUnSafe = () => new Game({ width: 5, height: 5, bombs: 15 });

		expect(createGameSafe).not.toThrow();
		expect(createGameUnSafe).toThrow();
	});
});

describe('Testing Game Resource - Cell Update', () => {
	let game = new Game({ width: 5, height: 5, bombs: 10 });

	beforeEach(() => {
		game = new Game({ width: 5, height: 5, bombs: 10 });
	});

	test('Expects board to be updated correctly once', () => {
		game.UpdateCells({ x: 2, y: 2 });

		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				if (i !== 2 || j !== 2) {
					expect(game.board[i][j].bomb).toEqual(false);
				} else {
					expect(game.board[i][j].bomb).toEqual(true);
				}
			}
		}
	});

	test('Expects board corners to be updated correctly - 1', () => {
		game.UpdateCells({ x: 0, y: 0 });

		for (let i = 0; i <= 1; i++) {
			for (let j = 0; j <= 1; j++) {
				if (i !== 0 || j !== 0) {
					expect(game.board[i][j].bomb).toEqual(false);
				} else {
					expect(game.board[i][j].bomb).toEqual(true);
				}
			}
		}
	});

	test('Expects board corners to be updated correctly - 2', () => {
		game.UpdateCells({ x: 4, y: 4 });

		for (let i = 3; i <= 4; i++) {
			for (let j = 3; j <= 4; j++) {
				if (i !== 4 || j !== 4) {
					expect(game.board[i][j].bomb).toEqual(false);
				} else {
					expect(game.board[i][j].bomb).toEqual(true);
				}
			}
		}
	});

	test('Expects updates not to interfere with each other', () => {
		game.UpdateCells({ x: 1, y: 1 });
		game.UpdateCells({ x: 2, y: 2 });

		expect(game.board[1][1].bomb).toEqual(true);
		expect(game.board[2][2].bomb).toEqual(true);
	});

	test('Expects content to be updated correctly', () => {
		game.UpdateCells({ x: 1, y: 1 });
		game.UpdateCells({ x: 2, y: 2 });

		expect(game.board[1][1].bomb).toEqual(true);
		expect(game.board[2][2].bomb).toEqual(true);

		expect(game.board[0][0].content).toEqual(1);
		expect(game.board[1][0].content).toEqual(1);
		expect(game.board[2][0].content).toEqual(1);
		expect(game.board[0][1].content).toEqual(1);
		expect(game.board[0][2].content).toEqual(1);
		expect(game.board[0][0].content).toEqual(1);

		expect(game.board[3][1].content).toEqual(1);
		expect(game.board[3][2].content).toEqual(1);
		expect(game.board[3][3].content).toEqual(1);
		expect(game.board[2][3].content).toEqual(1);
		expect(game.board[1][3].content).toEqual(1);

		expect(game.board[1][2].content).toEqual(2);
		expect(game.board[2][1].content).toEqual(2);
	});
});
