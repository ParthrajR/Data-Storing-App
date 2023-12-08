const express = require('express')
require('dotenv').config(); // Load environment variables from .env file
const app = express();
const userRoutes = require('./routes/userRoutes')
const fileRoutes = require('./routes/fileRoutes')
const port = process.env.PORT || 1210;
const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/Data_Storing_App"


app.use(express.json());

app.use('/api/user', userRoutes)
app.use('/api/file', fileRoutes)


mongoose.connect(url, {}).then(result => console.log("Database Connected")).catch(err => console.log(err))

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
  });

app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})


module.exports = app;