const apiUrl = "https://jsonplaceholder.typicode.com/users";
const userList = document.getElementById("user-list");
const userForm = document.getElementById("user-form");
const errorMessage = document.getElementById("error-message");
const formTitle = document.getElementById("form-title");
const userIdInput = document.getElementById("user-id");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const departmentInput = document.getElementById("department");

document.addEventListener("DOMContentLoaded", loadUsers);

function loadUsers() {
  axios
    .get(apiUrl)
    .then((response) => {
      displayUsers(response.data); // Display all users
    })
    .catch((error) => showError("Failed to load users."));
}

function displayUsers(users) {
  userList.innerHTML = ""; // Clear the existing user list
  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.className = "user-card";
    userCard.id = `user-${user.id}`; // Add a unique ID for each user card
    userCard.innerHTML = `
      <div>
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Department:</strong> ${user.company.name}</p>
      </div>
      <div>
        <button onclick="editUser(${user.id})">Edit</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
      </div>
    `;
    userList.appendChild(userCard); // Add the user card to the list
  });
}

function openForm() {
  formTitle.textContent = "Add User";
  userForm.style.display = "flex";
  resetForm();
}

function closeForm() {
  userForm.style.display = "none";
  errorMessage.textContent = "";
}

function resetForm() {
  userIdInput.value = "";
  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  departmentInput.value = "";
}

function editUser(id) {
  axios
    .get(`${apiUrl}/${id}`)
    .then((response) => {
      const user = response.data;
      userIdInput.value = user.id;
      const [firstName, lastName] = user.name.split(" ");
      firstNameInput.value = firstName || "";
      lastNameInput.value = lastName || "";
      emailInput.value = user.email;
      departmentInput.value = user.company.name;
      formTitle.textContent = "Edit User";
      userForm.style.display = "flex";
    })
    .catch((error) => showError("Failed to load user details."));
}

function deleteUser(id) {
  axios
    .delete(`${apiUrl}/${id}`)
    .then((response) => {
      console.log("User deleted:", response.data);
      removeUserFromDOM(id); // Remove the user card from the DOM
    })
    .catch((error) => showError("Failed to delete user."));
}

// Function to remove the user card from the DOM
function removeUserFromDOM(id) {
  const userCard = document.getElementById(`user-${id}`);
  if (userCard) {
    userCard.remove(); // Remove the card from the DOM
  }
}

// Function to update the user card in the DOM after editing
function updateUserInDOM(updatedUser) {
  // Find the user card based on user ID
  const userCard = document.getElementById(`user-${updatedUser.id}`);
  if (userCard) {
    userCard.innerHTML = `
      <div>
        <p><strong>ID:</strong> ${updatedUser.id}</p>
        <p><strong>Name:</strong> ${updatedUser.name}</p>  <!-- Updated Name -->
        <p><strong>Email:</strong> ${updatedUser.email}</p>
        <p><strong>Department:</strong> ${updatedUser.company.name}</p>
      </div>
      <div>
        <button onclick="editUser(${updatedUser.id})">Edit</button>
        <button onclick="deleteUser(${updatedUser.id})">Delete</button>
      </div>
    `;
  }
}

function showError(message) {
  errorMessage.textContent = message;
}

function submitForm() {
  const userId = userIdInput.value;
  const userData = {
    name: `${firstNameInput.value} ${lastNameInput.value}`,
    email: emailInput.value,
    company: { name: departmentInput.value },
  };

  console.log("User data being submitted:", userData);

  // Email validation regex (basic email validation)
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Check if the email is valid
  if (!emailPattern.test(userData.email)) {
    showError("Please enter a valid email address.");
    return; // Prevent form submission if email is invalid
  }

  if (userId) {
    // Edit user (PUT request)
    axios
      .put(`${apiUrl}/${userId}`, userData)
      .then((response) => {
        console.log("User updated:", response.data); // Log the response data
        updateUserInDOM(response.data); // Update user in the DOM
        closeForm();
      })
      .catch((error) => {
        console.error("Error while updating user:", error); // Log error details
        showError("Failed to update user.");
      });
  } else {
    // Add new user (POST request)
    axios
      .post(apiUrl, userData) // POST request to add new user
      .then((response) => {
        console.log("User added:", response.data); // Log the response data
        appendUserToDOM(response.data); // Append the new user to the DOM
        closeForm();
      })
      .catch((error) => {
        console.error("Error while adding user:", error); // Log error details
        showError("Failed to add user.");
      });
  }
}

// Function to append new user to the DOM
function appendUserToDOM(user) {
  const userCard = document.createElement("div");
  userCard.className = "user-card";
  userCard.id = `user-${user.id}`; // Unique ID for the user card
  userCard.innerHTML = `
    <div>
      <p><strong>ID:</strong> ${user.id}</p>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Department:</strong> ${user.company.name}</p>
    </div>
    <div>
      <button onclick="editUser(${user.id})">Edit</button>
      <button onclick="deleteUser(${user.id})">Delete</button>
    </div>
  `;
  userList.appendChild(userCard); // Append the new user to the existing list
}
