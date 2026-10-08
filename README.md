# a-Note
a Web Application for Notes.

# Overview
a-Note is a web application designed for note-taking and organization. The application allows users to create, edit, and manage their notes in a simple and intuitive interface.

# Features
Note Creation: Users can create new notes with a title & content.

Note Editing: Users can edit existing notes, changing the title & content.

User Authentication: Users can sign up and log in to access their notes.

Profile Managment: Users Can Manage Their Profile. (In Development!)

# Technology Stack
* Frontend: Built using React, React Router, and Vite.
* Backend: Built using Node.js and Express.
* Database: Uses MongoDB for storing user data and notes.

# Project Structure
The project is divided into two main directories: client and server.

* client: Contains the frontend code, including React components, CSS styles, and JavaScript files.
* server: Contains the backend code, including Node.js server files, database schema, and authentication logic.

# Installation
To run the application, follow these steps:

Clone the repository: git clone [https://github.com/AbeniB/a-note.git]

Install dependencies: npm install (or yarn install)
Start the server: npm run start (or yarn start) or npm run dev (if you have installed nodemon globally)
Start the client: npm run dev (or yarn dev)

# Local Development
Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` if you want MongoDB-backed storage. Copy `client/.env.example` to `client/.env` if you need to change the API URL to production or local. The example files contain no credentials and are safe to commit.

From the project root, start the API in the server directory and then launch the frontend in the client directory.

- API: cd server && npm install && npm start
- Frontend: cd client && npm install && npm run dev

The backend uses in-memory storage only in development when MongoDB is not configured or unavailable. Production startup requires a working MongoDB connection and a `LONG_ENCRYPTION_STRING` of at least 32 characters. Generate a strong session secret with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` and store it only in the server environment.

For deployment, set `NODE_ENV=production`, `MONGODB_URI`, `MONGODB_DB_NAME=a_note`, `LONG_ENCRYPTION_STRING`, and `CLIENT_ORIGINS` on the backend. `CLIENT_ORIGINS` is a comma-separated allowlist of frontend origins (for example `https://notes.example.com`). Set `VITE_API_URL` to the backend origin when building the frontend. Do not include credentials in the frontend API URL.

## MongoDB Atlas

The server connects to the `a_note` database by default. Set these values in `server/.env`:

- `MONGODB_URI`: your Atlas cluster connection URI (keep credentials private).
- `MONGODB_DB_NAME=a_note`: optional; this is already the default database name.

The application uses the `users` and `notes` collections in that database.

# Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

# License
This project is licensed under the ISC License.
