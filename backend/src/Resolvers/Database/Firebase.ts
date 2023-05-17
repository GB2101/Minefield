import { getFirestore } from 'firebase-admin/firestore';

import { Data } from '@Interfaces/Game';
import { DataBase } from '@Contracts/Database';
import { app } from 'src/firebase';

const test2 = <T>(location: string): T => {
	const test = {} as T;

	return test;
};

class Firebase<T extends Data> implements DataBase<T> {
	public database = getFirestore(app);

	public async write(data: T, location: string, document?: string): Promise<string> {
		let reference = this.database.collection(location).doc();

		if (document) {
			reference = this.database.collection(location).doc(document);
		}

		await reference.set(data);

		return reference.id;
	}

	public read: (location: string) => T = test2;
}

export { Firebase };
