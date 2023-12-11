const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add the admin username"],
    unique: [true, "Username already taken"]
  },
  email: {
    type: String,
    required: [true, "Please add the admin email address"],
    unique: [true, "Email address already taken"]
  },
  password: {
    type: String,
    required: [true, "Please add the admin password"],
  },
  role: {
    type: String,
    default: 'admin', // Set the default role for admins
  },
},
{
  timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
