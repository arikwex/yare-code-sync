const provider = require('./provider');
const express = require('express');
const app = express();

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
};

// Configure middleware
app.use(allowCrossDomain);

app.get('/code-sync', async (req, res, next) => {
  try {
    const data = await provider.getCodeSync();
    res.jsonp(data.toString());
  } catch (err) {
    next(err);
  }
});

app.get('/code-main', async (req, res, next) => {
  try {
    const data = await provider.getCodeMain();
    res.jsonp(data.toString());
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send(err.toString());
});

console.log('Starting express server...')
app.listen(4000)
