const mongoose = require("mongoose");

// Define the schema for the document
const spaceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Change the type to ObjectId
    ref: "User", // Reference to the 'User' model
    required: true,
  },
  stage: {
    type: String, // Assuming fileUrl is a string (URL to the file)
    required: true,
    default: "1"
  },
  freeSpace: {
    type: String, // Assuming fileUrl is a string (URL to the file)
    required: true,
    default: "500 MB"
  },

},
  {timestamps: true}
);

// Create the model for the document
const Space = mongoose.model("Space", spaceSchema);

module.exports = Space;
