// Import required modules and packages
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

// Import the function to connect to the database
const connectDB = require("./server/database/connection");

// Create an Express application instance
const app = express();

// Load environment variables from the "config.env" file
dotenv.config({ path: "config.env" });

// Set the port number for the server to listen on
const PORT = process.env.PORT || 4002;

// Log requests using the morgan middleware
app.use(morgan("tiny"));

// Establish a connection to the MongoDB database
connectDB();

// Parse incoming requests with URL-encoded data using body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// Set the view engine for rendering dynamic content (using EJS)
app.set("view engine", "ejs");
//app.set("views".path.resolve(__dirname, "views/ejs"));

// Serve static assets (CSS, images, JavaScript)
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// Load and use the defined routers for handling routes
app.use("/", require("./server/routes/router"));

// Start the server and listen for incoming connections
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

