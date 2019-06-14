const channel = 'the_one_who_listens';
const defaultParams = {
  as_user: false
};

exports.freeze = function freeze() {
  global.bot.postMessageToChannel(
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
  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  global.bot.postMessageToChannel(
    channel,
    ':white_check_mark::white_check_mark::white_check_mark::white_check_mark: MASTER IS GREEN :white_check_mark::white_check_mark::white_check_mark::white_check_mark:',
    {
      username: 'zeus',
      icon_emoji: ':zap:',
      ...defaultParams
    }
  );
};
