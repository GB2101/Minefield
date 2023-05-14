import { Cell } from '../Cell';

describe('Testing Cell Resource', () => {
	let cell = new Cell();

	beforeEach(() => {
		cell = new Cell();
	});

	test('Expects cell to be open', () => {
		cell.Open();

		expect(cell.state).toBe('open');
	});

	test('Expects cell to be a bomb', () => {
		// UpdateCell(cell, true);
		cell.MakeBomb();

		expect(cell.bomb).toBe(true);
		expect(cell.state).toBe('closed');
		expect(cell.content).toBe(-1);
	});

	test('Expects cell to be updated correctly', () => {
		cell.Increment();

		expect(cell.bomb).toBe(false);
		expect(cell.state).toBe('closed');
		expect(cell.content).toBe(1);
	});

	test('Expects cell to be updated correctly multiple times', () => {
		cell.Increment();
		cell.Increment();
		cell.Increment();

		expect(cell.bomb).toBe(false);
		expect(cell.state).toBe('closed');
		expect(cell.content).toBe(3);
	});
});
