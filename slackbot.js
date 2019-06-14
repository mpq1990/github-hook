const channel = 'the_one_who_listens';

// bot.on('start', function() {
//   // more information about additional params https://api.slack.com/methods/chat.postMessage

//   // define existing username instead of 'user_name'
//   bot.postMessageToUser('user_name', 'meow!', params);

//   // If you add a 'slackbot' property,
//   // you will post to another user's slackbot channel instead of a direct message
//   bot.postMessageToUser('user_name', 'meow!', {
//     slackbot: true,
//     icon_emoji: ':cat:'
//   });

//   // define private group instead of 'private_group', where bot exist
//   bot.postMessageToGroup('private_group', 'meow!', params);
// });

exports.freeze = function freeze() {
  var params = {
    icon_emoji: ':devil:'
  };

  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  global.bot.postMessageToChannel(channel, 'Master is frozen', params);
};

exports.unfreeze = function unfreeze() {
  var params = {
    icon_emoji: ':tada:'
  };

  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  global.bot.postMessageToChannel(channel, 'Master is green', params);
};
