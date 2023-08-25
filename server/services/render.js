const axios = require("axios");
const { Query } = require("mongoose");

/**
 * @description Renders the home page with a list of users
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
exports.homeRoutes = (req, res) => {
  // Make a GET request to retrieve user data from the API
  axios
    .get("http://localhost:4002/api/users")
    .then(function (response) {
      // Render the "index" view with user data
      res.render("index", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

/**
 * @description Renders the "Add User" page
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
exports.add_user = (req, res) => {
  // Render the "add_user" view
  res.render("add_user");
};

/**
 * @description Renders the "Update User" page with user data for a specific user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
exports.update_user = (req, res) => {
  // Make a GET request to retrieve specific user data from the API
  axios
    .get("http://localhost:4002/api/users", {
      params: { id: req.query.id },
    })
    .then(function (userdata) {
      // Render the "update_user" view with the user data
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

