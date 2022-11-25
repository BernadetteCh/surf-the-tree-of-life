require("dotenv").config(); // diese Methode liest enviromental variable file and saves all the variables.
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const speciesRouter = require("./routes/species.router");
//env.sample

//The process object in Node.js is a global object that can be accessed inside any module without requiring it. There are very few global objects or properties provided in Node.js and process is one of them. It is an essential component in the Node.js ecosystem as it provides various information sets about the runtime of a program.
//https://stackoverflow.com/questions/61423136/what-is-process-in-node-js
const { MONGO_URL, PORT = 8080 } = process.env; //take the PORT to read the environmental variables

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/api/species", speciesRouter);

app.use(function (req, res) {
  res.status(200).send("server is working");
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("http://localhost:" + PORT);
    console.log("Try / route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
