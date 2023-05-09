import express from 'express';

const app = express();
app.use(express.json());

app.get('/', function(req, res) {
	res.send({ message: 'hello world' });
});

app.listen(3000);
