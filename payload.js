const crypto = require('crypto');

// auth the secret shit
function validate(req) {
  // make sure we have the token on the env
  console.log("hey buddy")
  console.log(process.env.SECRET_TOKEN)
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
  console.log(req.body)
  console.log(req.body.raw)
  const validationResult = validate(req);
  if (!validationResult.valid) {
    res
      .status(500)
      .send(validationResult.message)
      .end();
  }
  const readData = JSON.stringify(req.body);
  res.status(200).send(readData);
};
