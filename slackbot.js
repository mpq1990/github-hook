const channel = 'the_one_who_listens';
const defaultParams = {
  as_user: false
};
const SlackBot = require('slackbots');
exports.botInstance = null;

exports.startBot = function start() {
  // create a bot
  const bot = new SlackBot({
    token: 'xoxb-653738538546-665213955296-rTMP2vgCKYIfiukErBrQMPtS', // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'hades'
  });

  // assign it so we can use it later
  exports.botInstance = bot;
};

exports.freeze = function freeze() {
  if (!botInstance) {
    console.error('no bot instance so am returning');
    return;
  }

  botInstance.postMessageToChannel(
    channel,
    ':red_circle::red_circle::red_circle::red_circle: MASTER IS FROZEN :red_circle::red_circle::red_circle::red_circle:',
    {
      username: 'hades',
      icon_emoji: ':smiling_imp:',
      ...defaultParams
    }
  );
};

exports.unfreeze = function unfreeze() {
  if (!botInstance) {
    console.error('no bot instance so am returning');
    return;
  }
  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  botInstance.postMessageToChannel(
    channel,
    ':white_check_mark::white_check_mark::white_check_mark::white_check_mark: MASTER IS GREEN :white_check_mark::white_check_mark::white_check_mark::white_check_mark:',
    {
      username: 'zeus',
      icon_emoji: ':zap:',
      ...defaultParams
    }
  );
};
