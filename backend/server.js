const express = require("express");
const app = express();
const port = 3000;
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

//Database Name
const dbName = "passop";
const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.json());

const db = client.db(dbName);

//get all the passwords
app.get("/", async (req, res) => {
  const collection = db.collection("documents");
  const findResult = await Collection.find({}).toArray();
  res.json(findResult);
});

//save a password
app.post("/", async (req, res) => {
    const collection = db.collection("documents");
    const findResult = await Collection.find({}).toArray();
    res.send(req.body);
  });
  

  //delete a pasword
    app.delete("/", async (req, res) => {
        const collection = db.collection("documents");
        const findResult = await Collection.find({}).toArray();
        res.send(req.body);
    });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
