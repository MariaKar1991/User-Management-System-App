// Handle form submission for adding a user
$("#add_user").submit(function (event) {
// Display an alert upon successful data insertion
  alert("Data Inserted Successfully!");
});

// Handle form submission for updating a user
$("#update_user").submit(function (event) {
  event.preventDefault();
  
// Serialize form data into an array and convert to an object
  var unindexed_array = $(this).serializeArray();
  var data = {};

  // Map serialized data to a structured object
  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  var request = {
    url: `http://localhost:4002/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  // Send AJAX request to update user data
  $.ajax(request).done(function (response) {
    alert("Data Updated Successfully!");
  });
});

if (window.location.pathname == "/") {
  // Attach a click event handler to the delete links
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      url: `http://localhost:4002/api/users/${id}`,
      method: "DELETE",
    };

    // Ask for user confirmation before deletion
    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function (response) {
        alert("Data Deleted Successfully!");
        location.reload();
      });
    }
  });
}
