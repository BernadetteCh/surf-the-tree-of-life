const { Router } = require("express");
const { db, create } = require("../db/species.model");
const SpeciesModel = require("../db/species.model");
const FormInput = require("../db/form.model");
const speciesRouter = new Router();

//sort({ name: "asc" }) wtf?!?
speciesRouter.get("/", async (req, res) => {
  const species = await SpeciesModel.find({}).sort({ name: 1 }).limit(50);
  return res.json(species);
});

speciesRouter.get("/formdata", async (req, res) => {
  await FormInput.find({}).then((result) => {
    res.json([...result]);
  });
});

speciesRouter.delete("/formdata/delete/:id", async (req, res) => {
  await FormInput.findByIdAndDelete(req.params.id);
  await FormInput.find({}).then((result) => {
    res.json([...result]);
  });
});

speciesRouter.post("/search", async (req, res) => {
  await SpeciesModel.find({ name: { $regex: req.body.search } })
    .limit(50)
    .then((result) => {
      res.send(result);
    });
});

speciesRouter.post("/create/post/field", async (req, res) => {
  const { name, option, date, description } = req.body;
  let newPost = new FormInput({
    name: name,
    option: option,
    date: date,
    description: description,
  });
  try {
    await newPost.save().then((result) => {
      res.status(200).json(result);
    });
  } catch {
    console.log(e);
  }
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
