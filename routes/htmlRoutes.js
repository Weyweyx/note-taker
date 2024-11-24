const express = require('express');
const path = require('path');
const app = express();

// Serve the landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'notes.html'));
});

// Static assets
app.use(express.static('public'));

// Start the server
//const PORT = process.env.PORT || 3001;
//app.listen(PORT, () => {
  //console.log(`Server running on http://localhost:${PORT}`);
//});

module.exports = app;