const express = require('express');
const Bookmark = require('../models/Bookmark');
const router = express.Router();

// Add a new bookmark
router.post('/', async (req, res) => {
  try {
    const bookmark = new Bookmark(req.body);
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookmarks
router.get('/', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.status(200).json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export bookmarks as JSON
router.get('/export', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.setHeader('Content-Disposition', 'attachment; filename=bookmarks.json');
    res.status(200).json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;