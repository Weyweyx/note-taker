const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes'); // Your API routes
const htmlRoutes = require('./routes/htmlRoutes'); // Import your HTML routes
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the `public` directory
app.use(express.static('public'));

// Use API routes
app.use('/api', apiRoutes);

// Use HTML routes (separate file)
app.use(htmlRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});