// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date", function (req, res) {
  const schema = { unix: undefined, utc: undefined };
  let date = req.params.date;
  if (Number.isInteger(Number(date))) {
    date = +date;
  }
  const objDate = new Date(date);
  if (objDate.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return;
  }
  schema.unix = objDate.valueOf();
  schema.utc = objDate.toUTCString();
  res.json(schema);
});

// your first API endpoint...
app.get("/api", function (req, res) {
  const schema = { unix: undefined, utc: undefined };
  const now = Date.now();
  const date = new Date(now);
  schema.unix = date.valueOf();
  schema.utc = date.toUTCString();
  res.json(schema);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
