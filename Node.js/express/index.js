const express = require("express");
const app = express();

let port = 8080;

app.listen(port, () => {
  console.log("port");
});
/*let code = "<h1>Fruits</h1><ul><li>apple</li><li>orange</li></ul>";
  res.send(code);
  res.send({
    name: "apple",
    color: "red",
  });*/

app.get("/:username/:id", (req, res) => {
  let { username, id } = req.params;
  console.log(username);
  let htmlstr = `<h1>wecome to the myweb @${username}</h1>`;
  res.send(htmlstr);
});

app.get("/search", (req, res) => {
  let { q } = req.query;
  console.log(req.query);
  res.send(`search result ${q}`);
});

app.get("/apple", (req, res) => {
  res.send("you contacted apple path");
});
