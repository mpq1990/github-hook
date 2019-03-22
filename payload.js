const crypto = require('crypto');

// auth the secret shit
function valid(req) {
  // make sure we have the token on the env
  const secretEnv = process.env.SECRET_TOKEN;
  if (!secretEnv) {
    return {
      valid: false,
      message: 'no secret env var'
    };
  }
  // get the sig from git
  const gitSig = req.get('HTTP_X_HUB_SIGNATURE');
  if (!gitSig) {
    return {
      valid: false,
      message: 'no headers sent from git you fool!'
    };
  }

  // generate a new hash for comparison
  const hash = `sha1=${crypto
    .createHmac('sha1', secretEnv)
    .update(req.body)
    .digest('hex')}`;

  // compare with the git one
  const valid = crypto.timingSafeEqual(hash, gitSig);
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
  const readData = req.body.read;
  res.status(200).send(readData);
};
