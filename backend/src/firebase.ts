import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';

import _account from '@private/minefield-admin.json';
const account = _account as ServiceAccount;

const app = initializeApp({
	credential: cert(account),
});

export { app };
