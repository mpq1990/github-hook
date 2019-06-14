if (typeof localStorage === 'undefined' || localStorage === null) {
  const { LocalStorage } = require('node-localstorage');
  localStorage = new LocalStorage('./scratch');
}

const crypto = require('crypto');
const puns = require('./utils/puns');
const { exec } = require('child_process');
const { freeze, unfreeze } = require('slackbots');

// auth the secret shit
function validate(req) {
  // make sure we have the token on the env
  const secretEnv = process.env.SECRET_TOKEN;
  if (!secretEnv) {
    throw new Error('no secret var');
  }
  // get the sig from git
  const gitSig = req.get('X-Hub-Signature');
  if (!gitSig) {
    throw new Error('no headers sent from git you fool!');
  }

  // generate a new hash for comparison
  const hash = `sha1=${crypto
    .createHmac('sha1', secretEnv)
    .update(JSON.stringify(req.body))
    .digest('hex')}`;

  // compare with the git one
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(gitSig));
}

module.exports = (req, res) => {
  try {
    if (!validate(req)) {
      return res.status('401').send('not authorized to use this hook baby');
    }
  } catch (error) {
    return res.status(500).send(error);
  }

  const { conclusion } = req.body.check_run;
  if (conclusion === null) {
    return res.status(304);
  }
  if (conclusion === 'success') {
    localStorage.setItem('success', true);
    console.log('we should re-enable master');
    exec('afplay foghorn-daniel_simon.mp3');
    unfreeze();
  } else if (conclusion === 'failure') {
    // pick a pun and say it 🤣
    localStorage.setItem('success', false);
    const pun = puns[Math.floor(Math.random() * puns.length)];
    exec(`say ${pun}`, () => {
      exec('afplay submarine-diving-alarm-daniel_simon.mp3');
    });
    // to arms men ⚠️
    freeze();
  }

  return res.status(200).send(conclusion);
};
