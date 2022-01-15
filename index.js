const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config()

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.post('/wishlists', async (req, res) => {
  const { body } = req;
  if (body?.name && body?.url) {
    const { name, url } = body;
    await prisma.wishlists.create({
      data: {
        name,
        url
      }
    })
    res.status(200).send();
  }
  res.status(400).send();
})

app.put('/wishlists/:index', async (req, res) => {
  const { index } = req.params;
  const { body } = req;
  if (body?.name && body?.url) {
    const { name, url } = body;
    await prisma.wishlists.update({
      where: { id: index },
      data: {
        name,
        url
      }
    });
    res.status(200).send();
  } else {
    res.status(400).send();
  }
})

app.get('/wishlists', async (req, res) => {
  const wishlists = await prisma.wishlists.findMany()
  res.json(wishlists);
})

app.get('/wishlists/:index', async (req, res) => {
  const { index } = req.params;
  const wishlist = await prisma.wishlists.findUnique(
    {
      where: {
        id: index
      },
    }
  )
  res.json(wishlist)
})

app.delete('/wishlists/:index', async (req, res) => {
  const { index } = req.params;
  await prisma.wishlists.delete({
    where: {
      id: index
    }
  })
  res.status(200).send()
})

app.listen(8080, () => {
  console.log("Backend app is up and running!");
});
