const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

// Match model
const Match = require("../models/match");
const { User, validate, validateEmail } = require("../models/user");
const { TempUser } = require("../models/tempusers");

// Mailer
const { sendEmail, sendEmailPassword } = require("../mailer");

// Get
router.get("/", async (req, res) => {
  const user = await User.find();
  res.json(user);
});

// Get users by MatchId
router.get("/match/:id", async (req, res) => {
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
  const users = [];

  for (let index = 0; index < match.vacants.length; index++) {
    const newUser = await User.findById(match.vacants[index]);
    const obj = {
      id: newUser._id,
      username: newUser.username,
      image: newUser.image,
    };
    users.push(obj);
  }

  res.json(users);
});

// Get
router.get("/get_user", async (req, res) => {
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
  res.json(userFind);
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    const tempUser = await TempUser.findOne({ email: req.body.email });

    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exist" });

    if (tempUser)
      return res
        .status(409)
        .send({ message: "User is already register waiting for confirmation" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newTempUser = await new TempUser({
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
      image: "imagen",
      likes: 0,
      dislikes: 0,
      matches: [],
    }).save();

    sendEmail({ toUser: newTempUser, hash: newTempUser._id });
    res.status(201).send({ message: "User created succesfully" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Activate user
router.get("/activate/:hash", async (req, res) => {
  const { hash } = req.params;
  try {
    const user = await TempUser.findById(hash);
    //if(!user.username) return res.status(422).send('User cannot be activated');

    const newUser = new User({
      username: user.username,
      password: user.password,
      email: user.email,
      image: user.image,
      likes: user.likes,
      dislikes: user.dislikes,
      matches: user.matches,
    });
    await newUser.save();
    await user.remove();
    res.json({ message: `User ${hash} has been activated` });
  } catch {
    res.status(422).send("User cannot be activated catch");
  }
});

// Send email user to activate
router.post("/send-email", async (req, res) => {
  try {
    const { error } = validateEmail(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(401)
        .json({ message: "User with that email not exist" });

    sendEmail({ toUser: user, hash: user._id });

    res.json({
      message: `Se ha enviado un mensaje al siguiente correo: ${user.email}`,
    });
  } catch {
    res.status(422).send("The email dosent");
  }
});

// Send email user password
router.post("/send-email-password", async (req, res) => {
  try {
    const { error } = validateEmail(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(401)
        .json({ message: "User with that email not exist" });

    sendEmailPassword({ toUser: user, hash: user._id });

    res.json({
      message: `Se ha enviado un mensaje al siguiente correo: ${user.email}`,
    });
  } catch {
    res.status(422).send("The email dosent");
  }
});

// Change password request
router.put("/reset-password/:id", async (req, res) => {
  const { id } = req.params;

  const obj = {
    password: req.body.password,
  };
  const { error } = validatePassword(obj);

  if (error)
    return res.status(400).send({ message: "Invalid password format" });

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.findOneAndUpdate(
    { _id: id },
    { password: hashPassword },
    { new: true }
  );

  user.save();
  res.send({ message: "User updated" });
});

// Update
router.put("/", async (req, res) => {
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

  const user = await User.findOneAndUpdate(
    { _id: userFind._id },
    { matches: req.body },
    { new: true }
  );

  user.save();
  res.send({ message: "User updated" });
});

// Update and delete user by matchId and userId
router.put("/match/:id", async (req, res) => {
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

  const userLogged = userFind._id.toString();
  const userToDelete = req.body.id;

  if (userLogged === userToDelete) {
    const newArray = match.vacants.filter(
      (item) => item.toString() != userToDelete
    );
    const matchUpdated = await Match.findOneAndUpdate(
      { _id: req.params.id },
      { vacants: newArray },
      { new: true }
    );
    matchUpdated.save();
    res.send({ message: "User deleted from match vacant list" });
  }
});

// Delete
router.delete("/", async (req, res) => {
  await User.remove();
  res.json({ status: "Users eliminated" });
});

const validatePassword = (data) => {
  const schema = Joi.object({
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
