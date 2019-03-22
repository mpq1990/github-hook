const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const payload = require('./payload');

// middleware
app.use(bodyParser.json());

app.post('/payload', payload);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
