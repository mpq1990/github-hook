const SlackBot = require('slackbots');
const people = require('./utils/people');

const channel = 'the_one_who_listens';
const channelId = 'CKM8WGVPY';
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

  const message = `:red_circle::red_circle::red_circle::red_circle: MASTER IS FROZEN :red_circle::red_circle::red_circle::red_circle:, please investigate: ${getNextPerson()}`;

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
    ':white_check_mark::white_check_mark::white_check_mark::white_check_mark: MASTER IS GREEN :white_check_mark::white_check_mark::white_check_mark::white_check_mark:';

  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  instance.postMessageToChannel(channel, message, {
    username: 'zeus',
    icon_emoji: ':zap:',
    ...defaultParams
  });

  setTopic(message);
};
