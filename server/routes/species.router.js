const { Router } = require("express");
const SpeciesModel = require("../db/species.model");

const speciesRouter = new Router();
//

speciesRouter.get("/", async (req, res) => {
  const species = await SpeciesModel.find().limit(50).sort({ created: "asc" });
  return res.json(species);
});
speciesRouter.post("/search", async (req, res) => {
  console.log(req.body);

  await SpeciesModel.find({ name: { $regex: req.body.search } })
    .limit(50)
    .then((result) => {
      res.send(result);
    });
});

module.exports = speciesRouter;
