const { faker, tr, th } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = "8080";
const path = require("path");
const { error } = require("console");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "abhi123",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

app.get("/", (req, res) => {
  let q = `select count(*) from user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0]["count(*)"];
      res.render("home.ejs", { user });
    });
  } catch (err) {
    res.send("some error");
  }
});

app.get("/user", (req, res) => {
  let q = "select*from user order by username asc";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = 0;
      res.render("showusers.ejs", { result, count });
    });
  } catch (user) {
    console.log(err);
    res.send("err");
  }
});

//EDIT route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `select*from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    res.send("some error");
  }
});

//UPDATE (DB) route
app.patch("/user/:id", (req, res) => {
  let { username, password } = req.body;
  let { id } = req.params;
  let q = `select*from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      if (result[0].password == password) {
        let q = `update user set username='${username}' where id='${id}' `;
        try {
          connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/user");
          });
        } catch (err) {
          res.send("some error");
        }
      } else {
        res.send("Envalid password");
      }
    });
  } catch (err) {
    res.send("some error");
  }
});

app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/user", (req, res) => {
  id = uuidv4();
  let { username, email, password } = req.body;
  let data = [id, username, email, password];
  let q = "insert into user(id,username,email,password) values(?,?,?,?)";
  try {
    connection.query(q, data, (err, result) => {
      if (err) throw err;
      console.log("send success");
      res.redirect("/user");
    });
  } catch (err) {
    res.send("some error");
  }
});

app.listen(port, () => {
  console.log("server start");
});

//let q = "insert into user(id,username,email,password) values ?";
//let data = [];
//for (let i = 0; i < 100; i++) {
//  data.push(getRandomUser());
//}

//try {
// connection.query(q, [data], (err, result) => {
//   if (err) {
//    throw err;
//  }
//  console.log(result);
//});
//} catch (err) {
// console.log(err);
//}
