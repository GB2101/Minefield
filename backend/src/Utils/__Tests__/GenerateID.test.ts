import { GenerateID } from '../GenerateID';

describe('Testing ID generation', () => {
	test('Expects id to have specified length', () => {
		const length1 = 5;
		const length2 = 10;
		const length3 = 20;

		const id1 = GenerateID(length1);
		const id2 = GenerateID(length2);
		const id3 = GenerateID(length3);

		expect(id1.length).toBe(length1);
		expect(id2.length).toBe(length2);
		expect(id3.length).toBe(length3);
	});
});
