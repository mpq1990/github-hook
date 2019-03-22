const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.post('payload', (req, res, next) => {
  const readData = JSON.parse(req.body.read);
  console.log(readData);
  next();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
