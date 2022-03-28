const app = require('./index');

const connect = require('./configs/db');
const { default: mongoose } = require('mongoose');

app.listen(5000, async () => {
  try {
    await connect();
    console.log('listening on port 5000');
  } catch (err) {
    console.log({ err });
  }
});
