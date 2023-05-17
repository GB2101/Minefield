import express from 'express';
import router from '@Router/routes';
// import { initialize } from './firebase';

const app = express();

// app.use(initialize);
app.use(express.json());
app.use(router);

app.listen(3000);
