const mongoose = require("mongoose");

/**
 * Asynchronous function to establish a connection with the MongoDB database.
 * @returns {Promise<void>} A Promise that resolves when the connection is established or rejects on error.
 */
const connectDB = async () => {
  try {
    // Establish a connection to the MongoDB database using the provided connection string
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log a success message upon successful database connection
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (err) {
    // Log the error and exit the process with an error code if connection fails
    console.error(err);
    process.exit(1);
  }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;
