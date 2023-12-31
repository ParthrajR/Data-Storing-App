const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes')
const freeSpaceRouter = require('./routes/freeSpaceRoutes');
const fileRoutes = require('./routes/fileRoutes');
const port = process.env.PORT || 1210;

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/file', fileRoutes);
app.use('/api', freeSpaceRouter);

// Connect to MongoDB using mongoose
const url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('helllllllllllll  Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;
