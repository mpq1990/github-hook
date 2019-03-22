var assert = require('assert');

describe('Dummy test', function() {
  it('should pass after a given time 🎉', function(done) {
    this.timeout(20000);
    setTimeout(done, 10000);
  });
});
