const app = require('express')();
const compression = require('compression');

app.use(compression());
app.use(require('express').static('dist'));

app.listen(3000, () => {
  console.log('Running on http://localhost:3000');
});