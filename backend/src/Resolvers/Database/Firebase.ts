import { getFirestore } from 'firebase-admin/firestore';

import { app } from 'src/firebase';
import { ValidationError } from '@Errors/index';
import { Data } from '@Interfaces/Game';
import { DataBase } from '@Contracts/Database';

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

	public async read(location: string, document: string): Promise<T> {
		const reference = this.database.collection(location).doc(document);

		const snapshot = await reference.get();

		if (!snapshot.exists) {
			throw new ValidationError('IdNotFound', 404, `The document id: ${document} was not found`);
		}
		const data = snapshot.data() as T;
		return data;
	}
}

export { Firebase };
