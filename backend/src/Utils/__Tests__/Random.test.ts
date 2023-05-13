import { Random } from '../Random';

describe('Testing Random Function', () => {
	test('Expects bounds to be working', () => {
		let num: number;
		for (let i = 0; i < 1000; i++) {
			num = Random(100);

			expect(num).toBeGreaterThanOrEqual(0);
			expect(num).toBeLessThan(100);
		}
	});

	test('Expects generator to be random', () => {
		let num: number;
		const array: number[] = Array(10).fill(0);

		for (let i = 0; i < 1000; i++) {
			num = Random(10);
			array[num]++;
		}

		for (let i = 0; i < 10; i++) {
			const ratio = array[i] / 1000;

			expect(ratio).toBeCloseTo(1 / 10, 1);
		}
	});
});
