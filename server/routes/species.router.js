const { Router } = require("express");
const { db, create } = require("../db/species.model");
const SpeciesModel = require("../db/species.model");
const ReferenceModel = require("../db/reference.model.");
const speciesRouter = new Router();
//

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

speciesRouter.get("/:id", async (req, res) => {
  const user = await SpeciesModel.findById(req.params.id);
  console.log(user);
  // let model = await SpeciesModel.findById(req.params.id);
  // let obj = await SpeciesModel.findById(req.params.id).then((result) => {
  //   console.log(result.parent);
  //   return (result.parent = SpeciesModel.findById(result.parent));
  // });

  // model.parent = obj;
  // console.log(model);
  // SpeciesModel.findById(req.params.id)
  // .then((result) => {
  //   return result.populate("parent");
  // });

  //  console.log((result.parentObject = 2));

  // SpeciesModel.find({ _id: result.parent }).then((result) => {
  //   console.log(result);
  // });
});

module.exports = speciesRouter;
