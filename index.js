const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const payload = require('./payload');
const status = require('./status-page/status');

// middleware
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/payload', payload);

app.get('/status', status);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
