import { Cell } from '../Cell';
import { CellInterface } from '@Interfaces/Game';

describe('Testing Cell Resource', () => {
	let cell = new Cell({ x: 0, y: 0 });

	beforeEach(() => {
		cell = new Cell({ x: 0, y: 0 });
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
		expect(cell.coord.x).toBe(0);
		expect(cell.coord.y).toBe(0);
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

	test('Expects cell to be assigned correctly', () => {
		const data: CellInterface = { coord: { x: 0, y: 0 }, bomb: true, content: -1, state: 'closed' };

		cell = new Cell(data.coord, data);
		expect(cell.GetData()).toEqual(data);
	});
});
