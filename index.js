const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// middleware
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/payload', (req, res) => {
  const readData = req.body.read;
  res.send(readData);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
