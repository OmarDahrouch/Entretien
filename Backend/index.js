const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize, testConnection } = require('./database');
const fs = require('fs');
const path = require('path');
const studentRoute = require('./routes/StudentRoute');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test database connection
testConnection();

// Load models 
const modelsDir = path.join(__dirname, 'models');
fs.readdirSync(modelsDir)
  .filter(file => file.endsWith('.js') && file !== 'index.js')
  .forEach(file => {
    require(path.join(modelsDir, file));
  });

// Synchronize models with the database
sequelize.sync()
  .then(() => {
    console.log('Models synchronized with the database');
  })
  .catch((error) => {
    console.error('Error synchronizing models with the database:', error);
  });

// Routes
app.use(studentRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
