const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const passwordComplexity = require('joi-password-complexity');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    image: { type: String },
    likes: { type: Number },
    dislikes: { type: Number },
    matches: { type: Array, default: [] },
});

UserSchema.methods.generateAuthToken = (_id) => {
    const userForToken = {
        id: _id
    }
    const token = jwt.sign(userForToken, "" + process.env.JWTPRIVATEKEY , {expiresIn: "7d"});
    return token;
};

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label('Username'),
        password: passwordComplexity().required().label('Password'),
        email: Joi.string().email().required().label('Email'),
    });
    return schema.validate(data);
};

const validateEmail = (email) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
    });
    return schema.validate(email);
};

const User = mongoose.model('User', UserSchema);

module.exports= { User, validate, validateEmail };
