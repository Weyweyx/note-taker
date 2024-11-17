const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes'); // Ensure this path matches your folder structure

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the `public` directory
app.use(express.static('public'));

// Use API routes
app.use('/api', apiRoutes);

// Route for `/notes` to serve the `notes.html` file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Wildcard route to direct any other request to the `index.html` file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});