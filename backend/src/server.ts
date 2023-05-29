import express from 'express';
import swagger from 'swagger-ui-express';

import router from '@Router/routes';
import document from '@Docs/documentation.json';

const app = express();

app.use(express.json());
app.use('/docs', swagger.serve, swagger.setup(document));
app.use('/v1', router);

app.listen(3000);
