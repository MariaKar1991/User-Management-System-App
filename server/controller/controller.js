const Userdb = require("../model/model");

// Create and save a new user
exports.create = (req, res) => {
  // Validate request data
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create a new user instance from request data
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // Save user in the database
  user
    .save()
    .then((data) => {
      // Redirect after successful user creation
      res.redirect("/add-user");
    })
    .catch((err) => {
      // Handle errors during user creation
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a user",
      });
    });
};

// Retrieve and return users or a single user by ID
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    // Find a user by ID
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "User not found with ID " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retrieving user with ID " + id });
      });
  } else {
    // Find all users
    Userdb.find()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message: "Error occurred while retrieving user information",
          });
      });
  }
};

// Update an identified user by user ID
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;

  // Update user by ID
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot update user with ID ${id}. User not found!`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating user information" });
    });
};

// Delete a user with specified user ID
exports.delete = (req, res) => {
  const id = req.params.id;

  // Delete user by ID
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete user with ID ${id}. User not found` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with ID=" + id,
      });
    });
};

