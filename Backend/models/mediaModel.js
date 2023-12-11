const mongoose = require("mongoose");
const moment = require('moment');

// Define the schema for the document
const fileSchema = new mongoose.Schema({
  fileUrl: {
    type: String, // Assuming fileUrl is a string (URL to the file)
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Change the type to ObjectId
    ref: "User", // Reference to the 'User' model
    required: true,
  }
},
  {timestamps: true}
);

// Create the model for the document
const File = mongoose.model("File", fileSchema);

module.exports = File;
