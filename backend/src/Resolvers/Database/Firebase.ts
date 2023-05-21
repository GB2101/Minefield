import { getFirestore } from 'firebase-admin/firestore';

import { DataBase } from '@Contracts/Database';
import { app } from 'src/firebase';
import { Data } from '@Interfaces/Game';
import { ValidationError } from '@Errors/index';

export class Firebase<T extends Data> implements DataBase<T> {
	public database = getFirestore(app);

	public async write(data: T, location: string, document?: string): Promise<string> {
		let reference = this.database.collection(location).doc();

		if (document) {
			reference = this.database.collection(location).doc(document);
		}

		await reference.set(data);

		return reference.id;
	}

	public async update(data: Partial<T>, location: string, document: string): Promise<void> {
		const reference = this.database.collection(location).doc(document);
		await reference.update(data);
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
