const express = require('express');
const router = express.Router();
const Title = require('../models/Title');

/**
 * @swagger
 * /titles:
 *   get:
 *     summary: Get all titles with optional filters and pagination
 */
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, type, genre } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (genre) filter.listed_in = new RegExp(genre, 'i');

  const titles = await Title.find(filter)
    .limit(parseInt(limit))
    .skip((page - 1) * limit);

  res.status(200).json(titles);
});

module.exports = router;