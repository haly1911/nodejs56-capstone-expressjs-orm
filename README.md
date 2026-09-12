# Capstone ExpressJS ORM - Pinterest API
Backend service for a Pinterest clone application built with Express.js, Prisma ORM, MySQL, and secured using JSON Web Tokens (JWT).

# Project Overview
The application provides a robust set of RESTful APIs to power a Pinterest-like platform, supporting user authentication, dynamic image feeds, search functionality, detail views, comments, and profile management. Security is strictly enforced via JWT middleware, where user context is automatically extracted from tokens to handle operations like profile updates, image creation, deletion, and saved states.

# Getting Started
● Install Dependencies:
Run npm install to download all required packages.
● Configure Environment Variables:
Create a .env file in the root directory specifying your database connection string, JWT secret key, and application port.
● Database Setup:
Initialize and synchronize your database schema using Prisma via npx prisma generate and npx prisma db push.
● Run the Application:
Start the development server using npm run dev.

# API Documentation & Testing
The project provides two ways to inspect and test the APIs:
● Swagger UI: Once the server is running locally, you can access the interactive Swagger documentation directly in your browser at http://localhost:<PORT>/api-docs to view and test all endpoints.
● Postman Collection: A complete and pre-configured Postman collection is included in the repository at postman/pinterest.postman_collection.json. It features organized functional folders and a dynamic {{domain}} environment variable for seamless evaluation.