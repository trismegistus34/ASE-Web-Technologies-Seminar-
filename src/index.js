const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) =>
  res.send('Hello World'))

// ping route
app.get("/ping", (req, res) =>
  res.send("Pong."));

app.listen(8080);