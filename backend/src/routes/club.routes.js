const express = require('express');
const router = express.Router();

// Club model
const Club = require('../models/club');

// Get
router.get('/', async (req, res) => {
    const clubes = await Club.find();
    res.json(clubes);
});

// Get club by Id
router.get('/:id', async (req, res) => {
    const club = await Club.findById(req.params.id);
    res.json(club);
});

// Post
router.post('/', async (req, res) => {
    const { name, address, type, hour, description } = req.body;
    const club = new Club({name, address, type, hour, description});
    await club.save();
    res.json({status: 'Club saved'});
});

// Update
router.put('/:id', async (req, res) => {
    const { name, address, type, hour, description } = req.body;
    const newClub = { name, address, type, hour, description };
    await Club.findByIdAndUpdate(req.params.id, newClub);
    res.json({status: 'Club updated'});
});

// Delete by Id
router.delete('/:id', async (req, res) => {
    await Club.findByIdAndRemove(req.params.id);
    res.json({status: 'Club eliminated'});
});

module.exports = router;