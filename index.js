const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const payload = require('./payload');
const status = require('./status-page/status');

// start the slack bot
const { startBot } = require('./slackbot');

// start the slack bot and make an instance of it
startBot();

const { botInstance } = require('./slackbot');

// middleware
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/payload', payload);

app.get('/status', status);

botInstance.on('start', function() {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
