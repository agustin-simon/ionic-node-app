const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");

// Club model
const { User } = require("../models/user");

// Get
router.get("/", async (req, res) => {
  const user = await User.find();
  res.json(user);
});

// Post
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(401).send({ message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(401).send({ message: "Invalid email or password" });

    const token = user.generateAuthToken(user.id);

    ////res.status(200).cookie('token', token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true }).json({ success: true, token});
    res
      .status(200)
      .send({
        username: user.username,
        data: token,
        message: "Logged in sucessfully",
      });
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

const validate = (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return Schema.validate(data);
};

module.exports = router;
