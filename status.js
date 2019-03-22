const pug = require('pug');

if (typeof localStorage === 'undefined' || localStorage === null) {
  const { LocalStorage } = require('node-localstorage');
  localStorage = new LocalStorage('./scratch');
}

module.exports = (req, res) => {
  const compiledFunction = pug.compileFile('status.pug');
  res.send(
    compiledFunction({
      status: localStorage.getItem('success')
    })
  );
};
