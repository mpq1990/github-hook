if (typeof localStorage === 'undefined' || localStorage === null) {
  const { LocalStorage } = require('node-localstorage');
  localStorage = new LocalStorage('./scratch');
}

module.exports = (req, res) => {
  res.send(`the status is ${JSON.stringify(localStorage.getItem('success'))}`);
};
