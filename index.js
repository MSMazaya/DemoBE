const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config()

const connection = mysql.createConnection({
  host: "172.31.176.1",
  user: "root",
  password: process.env.PASSWORD,
  database: "ngajarin"
});

const app = express();
app.use(bodyParser.json());

app.post('/wishlists', (req, res) => {
  const { body } = req;
  if (body?.name && body?.url) {
    const sql_command = `INSERT INTO wishlists (name, url) VALUES ('${body.name}', '${body.url}')`;
    connection.query(sql_command, (error, result) => {
      if (error) res.json(error);
      console.log("successfully added 1 column");
    });
    res.status(200).send();
  }
  res.status(400).send();
})

app.put('/wishlists/:index', (req, res) => {
  const { index } = req.params;
  const { body } = req;
  if (body?.name && body?.url) {
    const sql_command = `UPDATE wishlists SET name='${body.name}', url='${body.url}' WHERE id=${index}`;
    connection.query(sql_command, (error, result) => {
      if (error) res.json(error);
      else {
        console.log("successfully updated 1 column");
        res.status(200).send();
      }
    });
  } else {
    res.status(400).send();
  }
})

app.get('/wishlists', (req, res) => {
  const sql_command = `SELECT * FROM wishlists`;
  connection.query(sql_command, (error, result) => {
    if (error) res.json(error);
    res.json(result);
  });
})

app.get('/wishlists/:index', (req, res) => {
  const { index } = req.params;
  const sql_command = `SELECT * FROM wishlists where id=${index}`;
  connection.query(sql_command, (error, result) => {
    if (error) res.json(error);
    res.json(result);
  });
})

app.delete('/wishlists/:index', (req, res) => {
  const { index } = req.params;
  const sql_command = `DELETE FROM wishlists where id=${index}`;
  connection.query(sql_command, (error, result) => {
    if (error) res.json(error);
    res.status(200).send();
  });
})

app.listen(8080, () => {
  console.log("Backend app is up and running!");
});
