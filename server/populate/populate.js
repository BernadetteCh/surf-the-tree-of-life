/*Loading the .env file and creates environment variables from it
 */
require("dotenv").config();
const mongoose = require("mongoose");
const treeOfLifeGraph = require("./treeoflife.json");

const speciesModel = require("../db/species.model");
const dangerLevelModel = require("../db/dangerlevel.model");

console.log(process.env.MONGO_URL);
//coonnection
const mongoUrl = process.env.MONGO_URL;
console.log(mongoUrl);

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const populateSpecies = async () => {
  await speciesModel.deleteMany({});
  await dangerLevelModel.deleteMany({});

  const parentBySpecies = {};
  treeOfLifeGraph.links.forEach((nodeLink) => {
    parentBySpecies[nodeLink.target] = parseInt(nodeLink.source);
  });
  const confidenceById = {
    0: "confident",
    1: "incertae sedis in putative position",
    2: "incertae sedis position unspecified",
  };
  const species = treeOfLifeGraph.nodes.map((node) => ({
    name: node.name,
    extinct: node.EXTINCT === "1",
    _id: parseInt(node.id),
    parent: parentBySpecies[node.id],
    confidence: confidenceById[node.confidence],
  }));

  const dangerLevel = [
    { name: "not dangerous", level: 1 },
    { name: "dangerous", level: 2 },
    { name: "very dangerous", level: 3 },
    { name: "extremely dangerous", level: 4 },
  ];

  await speciesModel.create(...species);
  console.log("Species created");
  await dangerLevelModel.create(...dangerLevel);
  console.log("Level created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateSpecies();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
