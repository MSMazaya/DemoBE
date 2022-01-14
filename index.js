const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const wishlists = [];

app.post('/wishlists', (req, res) => {
  const { body } = req;
  if (body?.name && body?.url) {
    wishlists.push({
      name: body.name,
      url: body.url,
    })
    res.status(200).send();
  }
  res.status(400).send();
})

app.put('/wishlists/:index', (req, res) => {
  const { index } = req.params;
  if (body?.name && body?.url && wishlists.length > index) {
    wishlists[index - 1] = {
      name: body.name,
      url: body.url
    }
    res.status(200).send();
  }
  res.status(400).send();
})

app.get('/wishlists', (req, res) => {
  res.json(wishlists);
})

app.get('/wishlists/:index', (req, res) => {
  const { index } = req.params;
  if (wishlists.length >= index && index > 0) {
    res.json(wishlists[index - 1]);
  }
  res.status(400).send();
})

app.listen(8080, () => {
  console.log("Backend app is up and running!");
});
