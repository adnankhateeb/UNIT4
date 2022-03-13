const app = require("./index.js");
const connect = require("./configs/db.js");

app.listen(5000, async () => {
  try {
    await connect();
  }
  catch (err) {
    console.log("error:",err.message);
  }
  console.log("listening on port 5000");
});