const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Models
const { TempUser, validate } = require('../models/tempusers');

router.get('/', async (req, res) => {
    const user = await TempUser.find();
    res.json(user);
});

// Delete
router.delete('/', async (req, res) => {
    await TempUser.remove();
    res.json({status: 'TempUsers eliminated'});
});

module.exports = router;


