const express = require('express')
require('dotenv').config(); // Load environment variables from .env file
const app = express();
const con = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const fileRoutes = require('./routes/fileRoutes')
const port = process.env.PORT || 1210;
const mongoose = require('mongoose')

app.use(express.json());

app.use('/api/user', userRoutes)
app.use('/api/file', fileRoutes)


app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
  });
  const connectToMongoDB = async () => {
    try {
        const { MONGO_URL, DATABASE_NAME } = process.env;

        mongoose.connect(MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          dbName: DATABASE_NAME,
        });
        
        const db = mongoose.connection;

        db.once('open', () => {
            console.log('Connected to MongoDB successfully');
          });
    } catch (error) {
        db.on('error', (error) => {
            console.error('MongoDB Connection Error:', error);
          });
    }
  };
  
  connectToMongoDB()
    .then(() => {
      // Start your Express server or define your routes here
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    })
    .catch((error) => {
      // Handle the error appropriately
    });

// app.listen(port, () => {
//     console.log(`Server running on ${port}`);
// });

module.exports = app;