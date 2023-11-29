const express = require('express')
require('dotenv').config(); // Load environment variables from .env file
const app = express();
const con = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const fileRoutes = require('./routes/fileRoutes')
const port = process.env.PORT || 5000;




app.use(express.json());

app.use('/api/user', userRoutes)
app.use('/api/file', fileRoutes)


app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
  });

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

module.exports = app;