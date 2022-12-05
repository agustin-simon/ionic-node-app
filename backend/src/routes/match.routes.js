const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Match model
const Match = require("../models/match");
const { User } = require("../models/user");

// Get all matches
router.get("/", async (req, res) => {
  const matches = await Match.find();
  res.json(matches);
});

// Get match by Id
router.get("/:id", async (req, res) => {
  const match = await Match.findById(req.params.id);
  res.json(match);
});

// Get all matches by userId
router.get("/user/:id", async (req, res) => {
  const authorization = req.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, "" + process.env.JWTPRIVATEKEY);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const userFind = await User.findById(decodedToken.id);

  if (!userFind) {
    return res.status(401).json({ error: "User not exist" });
  }

  const matches = await Match.find();

  const allMatches = matches.filter(
    (elem) => elem.user === userFind._id.toString()
  );

  res.json(allMatches);
});

// Post
router.post("/", async (req, res) => {
  const { date, club, mode, players, vacants, genre } = req.body;

  const authorization = req.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, "" + process.env.JWTPRIVATEKEY);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const userFind = await User.findById(decodedToken.id);

  if (!userFind) {
    return res.status(401).json({ error: "User not exist" });
  }
  const user = userFind.id;
  const image = userFind.image;
  const complete = false;

  const match = new Match({
    user,
    image,
    date,
    club,
    mode,
    players,
    vacants,
    genre,
    complete,
  });

  await match.save();
  res.json(match);
});

// Post test
router.put("/add/player/:id", async (req, res) => {
  const authorization = req.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, "" + process.env.JWTPRIVATEKEY);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const userFind = await User.findById(decodedToken.id);

  if (!userFind) {
    return res.status(401).json({ error: "User not exist" });
  }

  const match = await Match.findById(req.params.id);
  match.vacants.push(userFind._id);

  await Match.findByIdAndUpdate(req.params.id, match);
  res.json({ status: "Match players list updated" });
});

// Update
router.put("/:id", async (req, res) => {
  const { user, image, date, club, mode, players, vacants, genre, complete } =
    req.body;
  const newMatch = {
    user,
    image,
    date,
    club,
    mode,
    players,
    vacants,
    genre,
    complete,
  };
  await Match.findByIdAndUpdate(req.params.id, newMatch);
  res.json({ status: "Match updated" });
});

// Delete
router.delete("/", async (req, res) => {
  await Match.remove();
  res.json({ status: "Matches eliminated" });
});

// Delete by Id
router.delete("/:id", async (req, res) => {
  const authorization = req.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, "" + process.env.JWTPRIVATEKEY);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const userFind = await User.findById(decodedToken.id);

  if (!userFind) {
    return res.status(401).json({ error: "User not exist" });
  }

  userFind.matches.filter((elem) => {});

  const newMatches = userFind.matches.filter((elem) => elem != req.params.id);
  userFind.matches = newMatches;

  await User.findOneAndUpdate(
    { _id: userFind._id },
    { matches: newMatches },
    { new: true }
  );

  await Match.findByIdAndRemove(req.params.id);
  res.json({ status: "Match eliminated" });
});

module.exports = router;
