# Solace 🏡

**Solace** is a full-stack property listing web application built using Node.js, Express.js, MongoDB, and EJS. It allows users to explore property listings, create new listings, manage existing listings, and share reviews with ratings.

The project is being developed incrementally, focusing on backend development, database relationships, validation, error handling, session management, and user authentication.

---

## 📌 Project Overview

Solace provides a platform where users can:

- Browse available property listings.
- View detailed information about individual properties.
- Create, edit, and delete property listings.
- Submit reviews and ratings for properties.
- View reviews submitted by other users.
- Delete reviews.
- Register and log in using username and password authentication.
- Receive success and error notifications when performing operations.

The application uses Express.js for server-side routing, MongoDB for data storage, Mongoose for database operations, and EJS for rendering dynamic web pages.

---

## 🚀 Features Implemented

### 1. Property Listings Management

Implemented complete CRUD functionality for property listings.

- **Create:** Add a new property with its title, description, image, price, location, and country.
- **Read:** Display all available listings and view individual listing details.
- **Update:** Edit the information of an existing listing.
- **Delete:** Remove a listing from the database.

### 2. User Interface and Reusable Layouts

- Integrated Bootstrap for responsive UI components and styling.
- Used EJS-Mate for reusable layouts.
- Created a common boilerplate layout for application pages.
- Implemented reusable navbar and footer components.
- Styled listing cards, forms, and individual listing pages.
- Integrated Lucide and Font Awesome icons.

### 3. Form Validation

Implemented validation at both client and server levels.

**Client-side validation**
- Used HTML `required` attributes.
- Used Bootstrap form validation styles.
- Used the `novalidate` attribute to customize browser validation behavior.

**Server-side validation**
- Integrated Joi for validating incoming listing data.
- Created reusable validation middleware.
- Ensured invalid data is checked before reaching the route handler.

### 4. Error Handling

Implemented centralized error handling to avoid repetitive error-handling code.

- Created a custom `ExpressError` class by extending JavaScript's Error class.
- Implemented `wrapAsync` to handle errors from asynchronous route handlers.
- Created custom error-handling middleware.
- Designed a reusable `error.ejs` page using Bootstrap alert styling.
- Handled invalid routes and missing listing resources.

### 5. Review and Rating System

Established a one-to-many relationship between listings and reviews.

- Created a separate Review model.
- Connected reviews with their respective listings.
- Implemented review creation.
- Displayed submitted reviews on individual listing pages.
- Added a review submission form with a textarea.
- Implemented a rating slider with values from 1 to 5 and a step of 1.
- Added validation for review submissions.
- Implemented deletion of individual reviews.
- Used Mongoose middleware to handle associated review deletion when a listing is deleted.

### 6. Express Router and Code Modularization

Restructured the application to separate routes into dedicated files.

- Created a `routes` directory.
- Moved listing-related routes into `routes/listing.js`.
- Moved review-related routes into `routes/reviews.js`.
- Created `routes/user.js` for user authentication routes.
- Used Express Router to organize application endpoints.
- Used `mergeParams: true` to access parent route parameters in nested routers.
- Reduced the amount of routing code inside the main `app.js` file.

### 7. Session Management and Flash Messages

Integrated session management to maintain user-related state across HTTP requests.

- Installed and configured `express-session`.
- Configured session options such as `secret`, `resave`, and `saveUninitialized`.
- Configured cookie options such as `expires`, `maxAge`, and `httpOnly`.
- Implemented session information storage and retrieval.
- Integrated `connect-flash` for displaying one-time messages.
- Used `res.locals` to make flash messages accessible in EJS templates.
- Created reusable flash message partials.
- Implemented success and error notifications for listing and review operations.
- Handled missing or deleted listings with appropriate error messages.

### 8. User Authentication with Passport.js

Implemented username and password authentication using Passport.js.

- Installed `passport`, `passport-local`, and `passport-local-mongoose`.
- Created a User model using `passport-local-mongoose`.
- Configured Passport LocalStrategy.
- Implemented user registration using `User.register()`.
- Implemented signup and login routes.
- Configured Passport initialization and session middleware.
- Implemented user serialization and deserialization.
- Configured login failure redirects and flash messages.
- Created separate signup and login EJS pages.
- Applied Bootstrap styling and form validation to authentication pages.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Custom styling |
| JavaScript | Client-side and server-side logic |
| Bootstrap | Responsive UI and components |
| Node.js | JavaScript runtime |
| Express.js | Backend framework and routing |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| EJS | Dynamic server-side rendering |
| EJS-Mate | Reusable EJS layouts |
| Joi | Server-side schema validation |
| Passport.js | User authentication |
| Passport Local | Username and password authentication |
| Passport Local Mongoose | User authentication and password management |
| Express Session | Session management |
| Connect Flash | Temporary success and error messages |
| Method Override | Support for PUT and DELETE form requests |
| Git & GitHub | Version control |

---

## 📂 Project Structure

```text
MAJORPROJECT/
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── reviews.js
│   └── user.js
│
├── public/
│   └── css/
│       └── style.css
│
├── views/
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   │
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   └── show.ejs
│   │
│   └── users/
│       ├── login.ejs
│       └── signup.ejs
│
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

*The structure represents the files and organization implemented so far.*

---

## ⚙️ Installation and Setup

### Prerequisites

Make sure the following are installed on your system:

- Node.js
- npm (Node Package Manager)
- MongoDB Community Server
- Git

### Step 1: Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### Step 2: Navigate to the project directory

```bash
cd MAJORPROJECT
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Start MongoDB

Make sure your local MongoDB server is running.

The application currently uses the following MongoDB connection string:

```js
mongodb://127.0.0.1:27017/solace
```

The database name is `solace`.

### Step 5: Initialize sample data (Optional)

To populate the database with the predefined sample listings:

```bash
node init/index.js
```

**Important:** The initialization script deletes existing listings before inserting the sample data. Do not run it if you want to preserve your existing listings.

### Step 6: Start the application

```bash
node app.js
```

Open your browser and visit:

```text
http://localhost:8080
```

---

## 🗄️ Database Models

The application currently uses three main models.

### Listing Model

Stores property listing information.

| Field | Description |
|---|---|
| title | Title of the property |
| description | Property description |
| image | Image filename and URL |
| price | Property price |
| location | Property location |
| country | Country where the property is located |

### Review Model

Stores reviews associated with individual listings.

The review model represents the one-to-many relationship between listings and reviews: one listing can have multiple reviews.

### User Model

Stores user account information and integrates with `passport-local-mongoose` for username and password authentication.

---

## 🔄 Application Flow

The application follows this general request flow:

```text
             Client / Browser
                    |
                    v
              Express Server
                    |
                    v
             Express Router
                    |
          +---------+---------+
          |         |         |
          v         v         v
       Listing   Reviews    Users
        Routes    Routes    Routes
          |         |         |
          v         v         v
       Listing   Review     User
        Model     Model     Model
          |         |         |
          +---------+---------+
                    |
                    v
                 MongoDB
```

Validation middleware, asynchronous error handling, session management, and flash messages support the request-handling process.

---

## 🔐 Authentication and Security

The application uses Passport Local authentication with session-based user persistence.

- Passwords are managed through `passport-local-mongoose`, which handles password hashing and salting.
- Passport serializes and deserializes users for session management.
- Express sessions maintain session state across requests.
- The session cookie is configured with an `httpOnly` option.

---

## 📚 Learning and Development Progress

This project is being developed phase by phase, with each phase introducing new backend and full-stack concepts.

| Phase | Topics Covered |
|---|---|
| Phase 1 (Part A) | Project setup, MongoDB, Mongoose, EJS, listing model, seed data, and CRUD operations |
| Phase 1 (Part B) | EJS-Mate layouts, Bootstrap navbar, footer, and UI styling |
| Phase 1 (Part C) | Client-side validation, Joi validation, custom errors, and centralized error handling |
| Phase 2 (Part A) | Review model, listing-review relationship, review CRUD, and Mongoose middleware |
| Phase 2 (Part B) | Express Router, route modularization, and mergeParams |
| Phase 2 (Part C) | Express sessions, cookie configuration, connect-flash, and res.locals |
| Phase 2 (Part D) | Authentication concepts, Passport.js, LocalStrategy, signup, and login |

---

## 🎯 Project Objective

The objective of Solace is to build a full-stack web application while developing a practical understanding of backend engineering concepts, database relationships, application architecture, validation, error handling, session management, and authentication.

The project will continue to evolve as additional features and improvements are implemented.

---

## 👨‍💻 Developer

**Syed Mohammad Wasique Junaid**

GitHub: [Syed-mohammad-wasique-Junaid](https://github.com/Syed-mohammad-wasique-Junaid)

---

*Solace — Built step by step, one feature at a time.*