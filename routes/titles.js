const express = require('express');
const router = express.Router();
const Title = require('../models/Title');

/**
 * @swagger
 * /titles:
 *   get:
 *     summary: Get all titles with optional filters and pagination
 */

// Get all titles with filters and pagination
router.get('/', async (req, res) => {
  try {
    // query params
    const { page = 1, limit = 10, type, genre, release_year } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (genre) filter.listed_in = new RegExp(genre, 'i');
    if (release_year) filter.release_year = parseInt(release_year);

    // Query the database, add pagination
    const titles = await Title.find(filter)
      .limit(parseInt(limit))
      .skip((page - 1) * limit);

    res.status(200).json(titles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single title by ID
router.get('/:id', async (req, res) => {
  try {
    const title = await Title.findById(req.params.id);
    if (!title) {
      return res.status(404).json({ message: 'Title not found' });
    }
    res.status(200).json(title);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;