const path = require('path');
const router = require('express').Router();

// Serve the landing page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Serve the notes page
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../notes.html'));
});

// Wildcard route to direct all other requests to the index.html
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = router;