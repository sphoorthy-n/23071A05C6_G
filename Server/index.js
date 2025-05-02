const express = require('express');
const app = express();

// Import the bookmarks route
const bookmarks = require('./routes/bookmarks');

// Middleware to use the bookmarks route
app.use('/bookmarks', bookmarks);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});