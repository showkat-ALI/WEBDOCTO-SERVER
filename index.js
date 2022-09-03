const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();
app.use(cors());
app.use(express.json());
// Database connection
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.goxkt.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pconlku.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
//New Client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    console.log("connected to db");
    const services_collection = client.db("web_docto").collection("services");

    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = services_collection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
