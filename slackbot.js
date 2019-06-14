const SlackBot = require('slackbots');
const people = require('./utils/people');

const channel = 'dev-status';
const channelId = 'C70DUQZ0Q';
const defaultParams = {
  as_user: false
};

let instance = null;
exports.botInstance = instance;

exports.startBot = function start() {
  // create a bot
  const bot = new SlackBot({
    token: process.env.SLACK_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'hades'
  });

  // assign it so we can use it later
  instance = bot;
  exports.botInstance = instance;
};

const setTopic = function(topic) {
  const params = {
    token: process.env.SLACK_TOKEN,
    name: 'hades',
    topic,
    channel: channelId
  };

  instance._api('channels.setTopic', params);
};

exports.setTopic = setTopic;

exports.freeze = function freeze() {
  if (!instance) {
    console.error('no bot instance so am returning');
    return;
  }

  const message = `:circle-fail::circle-fail::circle-fail::circle-fail: MASTER IS FROZEN :circle-fail::circle-fail::circle-fail::circle-fail:, please investigate: ${getNextPerson()}`;

  instance.postMessageToChannel(channel, message, {
    username: 'hades',
    icon_emoji: ':smiling_imp:',
    ...defaultParams
  });

  setTopic(message);
};

function getNextPerson() {
  // pick the next person to look into why it is broken
  // set that person in the local storage
  const lastPerson = localStorage.getItem('personToFix');
  let personToFix;

  if (!lastPerson) {
    personToFix = people[0];
  } else {
    const currentIndex = people.indexOf(lastPerson);
    personToFix = people[currentIndex + 1]
      ? people[currentIndex + 1]
      : people[0];
  }
  localStorage.setItem('personToFix', personToFix);
  return personToFix;
}

exports.unfreeze = function unfreeze() {
  if (!instance) {
    console.error('no bot instance so am returning');
    return;
  }

  const message =
    ':circle-pass::circle-pass::circle-pass::circle-pass: MASTER IS GREEN :circle-pass::circle-pass::circle-pass::circle-pass:';

  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  instance.postMessageToChannel(channel, message, {
    username: 'zeus',
    icon_emoji: ':zap:',
    ...defaultParams
  });

  setTopic(message);
};
