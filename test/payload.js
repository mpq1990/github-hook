// the package we are testing
const payload = require('../payload');

// fake local storage for the tests
if (typeof localStorage === 'undefined' || localStorage === null) {
  const { LocalStorage } = require('node-localstorage');
  localStorage = new LocalStorage('./scratch');
}

const gitHubToken = 'helloworld123';

let goodReq = {
  get: () => {
    return {
      // helloworld123
      'X-Hub-Signature': 'sha1=ae466235350b46c652b8a3db2cf357abc9a7768f'
    };
  },
  body: {
    check_run: {
      check_suite: {
        head_branch: 'master'
      },
      conclusion: 'success'
    }
  }
};

let sampleRes = {
  status: newStatus => {
    return {
      send: message => {
        return message;
      }
    };
  }
};

var assert = require('assert');

describe('Test the way that the payload hook works', function() {
  it('You need a secret var on the guthub auth', function(done) {
    try {
      assert.equal(payload({ get: () => {} }, sampleRes), 'no secret var');
    } catch (_) {}
    done();
  });

  it('will fail if you do not have the X-Hub-Signature signature', function(done) {
    process.env.SECRET_TOKEN = gitHubToken;
    try {
      assert.equal(
        payload({ get: () => {} }, sampleRes),
        'no headers sent from git you fool!'
      );
    } catch (_) {}
    done();
  });

  it('will not fail auth if you pass good auth headers', function(done) {
    process.env.SECRET_TOKEN = gitHubToken;
    assert.doesNotThrow(() => {
      payload(goodReq, sampleRes);
    });
    done();
  });
});
