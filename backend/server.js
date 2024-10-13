const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    const database = client.db('DOC_DB');
    app.locals.database = database; // Make the database accessible to route handlers
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

connectToDatabase();

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
