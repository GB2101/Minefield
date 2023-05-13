import { Contains } from '../Array';

describe('Testing Arrays Contains Function', () => {
	test('Expects Function to identify numbers', () => {
		const array = [ 1, 2, 3, 4, 5 ];

		expect(Contains(1, array)).toBe(true);
		expect(Contains(2, array)).toBe(true);
		expect(Contains(3, array)).toBe(true);
		expect(Contains(4, array)).toBe(true);
		expect(Contains(5, array)).toBe(true);

		expect(Contains(0, array)).toBe(false);
		expect(Contains(6, array)).toBe(false);
	});

	test('Expects Function to identify strings', () => {
		const array = [ '123', '456', '789', 'house' ];

		expect(Contains('123', array)).toBe(true);
		expect(Contains('456', array)).toBe(true);
		expect(Contains('789', array)).toBe(true);
		expect(Contains('house', array)).toBe(true);

		expect(Contains('000', array)).toBe(false);
		expect(Contains('101', array)).toBe(false);
		expect(Contains('home', array)).toBe(false);
	});

	test('Expects Function to identify objects', () => {
		const array = [{ test: 1 }, { testing: 'something' }];

		expect(Contains({ test: 1 }, array)).toBe(true);
		expect(Contains({ testing: 'something' }, array)).toBe(true);

		expect(Contains({ test: 13 }, array)).toBe(false);
		expect(Contains({ testing: 'another thing' }, array)).toBe(false);
	});

	test('Expects Function to identify multiple times', () => {
		const array: Array<{ x: number; y: number }> = [];

		for (let x = 0; x < 20; x++) {
			for (let y = 0; y < 20; y++) {
				array.push({ x, y });
			}
		}

		for (let x = 0; x < 20; x++) {
			for (let y = 0; y < 20; y++) {
				expect(Contains({ x, y }, array)).toBe(true);
			}
		}
	});
});
