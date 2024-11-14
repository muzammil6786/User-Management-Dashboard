# User Management System

This project implements a simple user management system that allows you to add, edit, and delete users. It display all users and includes client-side form validation for adding and editing user details.

### Features:
- **User Management**: Add, edit, and delete users.
- **Client-side Validation**: Ensures required fields (First Name, Last Name, Email, and Department) are correctly filled out before submitting the form.
- **API Integration**: Data is fetched and manipulated using the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/), which provides fake user data.

## Table of Contents
1. [Project Setup](#project-setup)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Installation](#installation)
5. [Usage](#usage)

## Project Setup

### Prerequisites
Before you start, you need to have the following installed:

- **A code editor** (e.g., VS Code)
- **Browser** (for testing)

## Technologies Used

- **HTML**: Markup for the user interface.
- **CSS**: Styling for the page and form.
- **JavaScript**: Used for handling user interactions, API calls, pagination, and form validation.
- **Axios**: A promise-based HTTP client to make API requests.

## Features

### User Management
- **Add User**: Allows you to add new users to the list.
- **Edit User**: Allows you to edit an existing user's information.
- **Delete User**: Allows you to delete a user from the list.

### Client-side Validation
- Ensures all required fields (First Name, Last Name, Email, Department) are filled correctly before submitting the form.
- Email field is validated using a regex pattern to ensure it's in the correct format.

## Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/muzammil6786/User-Management-Dashboard.git>
2. Navigate into the project directory:
   ```bash
   cd User-Management

3. Open the index.html file in your browser to view the project.
4. Open your browser and navigate to http://127.0.0.1:5500/index.html or right click on index.html and open with live server.
   Also you can use the deployed link : 
    ```bash
    https://sprightly-cucurucho-a620c3.netlify.app

## Usage

1. To add a new user:
Click the "Add User" button to open the form.
Fill in the user's details (First Name, Last Name, Email, and Department).
Click "Submit" to add the user. The form will validate the inputs before submission.
2. To edit a user:
Click the "Edit" button next to the user you want to update.
Modify the user's details and click "Submit" to save the changes.
3. To delete a user:
Click the "Delete" button next to the user you want to remove.

