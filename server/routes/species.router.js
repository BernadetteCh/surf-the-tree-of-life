const { Router } = require("express");
const { db, create } = require("../db/species.model");
const SpeciesModel = require("../db/species.model");
const speciesRouter = new Router();

speciesRouter.get("/", async (req, res) => {
  const species = await SpeciesModel.find().limit(50).sort({ created: "asc" });
  return res.json(species);
});

speciesRouter.post("/search", async (req, res) => {
  await SpeciesModel.find({ name: { $regex: req.body.search } })
    .limit(50)
    .then((result) => {
      res.send(result);
    });
});

speciesRouter.patch("/comment/:id", async (req, res) => {
  //multi true update all !
  const id = parseInt(req.params.id);
  const newSpecies = await SpeciesModel.updateOne(
    { _id: id },
    { $set: { comment: req.body.comment.comment } },
    { multi: true }
  );
  res.json(newSpecies);
});

speciesRouter.get("/:id", async (req, res) => {
  await SpeciesModel.findById(req.params.id).then((result) => {
    res.json(result);
  });
});

module.exports = speciesRouter;
