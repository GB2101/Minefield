import { Random } from './Random';

const GenerateID = (length: number): string => {
	const num = 48;
	const upper = 65;
	const lower = 97;

	let id = '';
	let char: number;
	let code: number;

	for (let i = 0; i < length; i++) {
		char = Random(62);
		if (char < 10) {
			code = num + char;
		} else if (char < 36) {
			code = upper + char - 10;
		} else {
			code = lower + char - 36;
		}
		id += String.fromCharCode(code);
	}

	return id;
};

export { GenerateID };
