const mongoose = require("mongoose");

// Define a schema for the User collection
var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // The 'name' field is required for every user
  },
  email: {
    type: String,
    required: true, // The 'email' field is required for every user
    unique: true,   // The 'email' field must be unique
  },
  gender: String,   // The 'gender' field is optional
  status: String,   // The 'status' field is optional
});

// Create a User model using the defined schema
const Userdb = mongoose.model("userdb", schema);

// Export the Userdb model to be used in other parts of the application
module.exports = Userdb;

