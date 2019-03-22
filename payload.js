const crypto = require('crypto');
const puns = require('./puns');
const { exec } = require('child_process');

// auth the secret shit
function validate(req) {
  // make sure we have the token on the env
  const secretEnv = process.env.SECRET_TOKEN;
  if (!secretEnv) {
    return {
      valid: false,
      message: 'no secret env var'
    };
  }
  // get the sig from git
  const gitSig = req.get('X-Hub-Signature');
  if (!gitSig) {
    return {
      valid: false,
      message: 'no headers sent from git you fool!'
    };
  }

  // generate a new hash for comparison
  const hash = `sha1=${crypto
    .createHmac('sha1', secretEnv)
    .update(JSON.stringify(req.body))
    .digest('hex')}`;

  // compare with the git one
  const valid = crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(gitSig));
  return {
    valid,
    message: 'validation result message'
  };
}

module.exports = (req, res) => {
  const validationResult = validate(req);
  if (!validationResult.valid) {
    res
      .status(500)
      .send(validationResult.message)
      .end();
  }
  const { conclusion } = req.body.check_run;
  if (!conclusion) {
    res.status(500).send({ message: 'we need the status' });
  }
  if (conclusion === 'success') {
    console.log('we should re-enable master');
    exec('afplay foghorn-daniel_simon.mp3');
  } else {
    // pick a pun and say it 🤣
    const pun = puns[Math.floor(Math.random() * puns.length)];
    exec(`say ${pun}`, () => {
      exec('afplay submarine-diving-alarm-daniel_simon.mp3');
    });
    // to arms men ⚠️
  }
  res.status(200).send(conclusion);
};
