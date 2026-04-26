const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/register", (req, res) => {
  let { user, password } = req.query;
  res.send(`GET req welcome ${user}`);
});

app.post("/register", (req, res) => {
  let { user, password } = req.body;
  res.send(`POST req welcome ${user}`);
});

app.listen(port, () => {
  console.log("server start");
});
