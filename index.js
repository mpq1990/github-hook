const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const payload = require('./payload');
const status = require('./status-page/status');

// start the slack bot
const SlackBot = require('slackbots');

// create a bot
const bot = new SlackBot({
  token: 'xoxb-653738538546-665213955296-rTMP2vgCKYIfiukErBrQMPtS', // Add a bot https://my.slack.com/services/new/bot and put the token
  name: 'hades'
});

// middleware
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/payload', payload);

app.get('/status', status);

bot.on('start', function() {
  global.bot = bot;
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
