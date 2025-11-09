# Building-a-Full-Stack-Todo-App-From-Concept-to-Deployment
This a Full-Stack Todo App created for the purpose of showing how to implement the concept of Software Construction for our Iconic Open University Department  of Information  Technology
Full-Stack Todo Application
Connecting Software Construction Concepts

Frontend + Backend Integration

Database Design & Management

RESTful API Architecture

Deployment & DevOps

#Learning Objectives
What Students Will Build & Learn
✅ Full-Stack Architecture: Client → Server → Database

✅ CRUD Operations: Create, Read, Update, Delete

✅ RESTful API Design: Proper endpoint structure

✅ Database Modeling: MongoDB with Mongoose

✅ Authentication: User sessions & security

✅ Deployment: Cloud deployment strategies

#Architecture Overview
The Full-Stack Picture
text
🌐 CLIENT (Browser)
    ↓
🔄 EXPRESS SERVER (Node.js)
    ↓
🗄️  DATABASE (MongoDB)
    ↓
☁️  DEPLOYMENT (Render/Vercel)
Technology Stack:

Frontend: EJS Templates + CSS + JavaScript

Backend: Node.js + Express.js

Database: MongoDB + Mongoose ODM

Authentication: Express Sessions

Deployment: Render + MongoDB Atlas

#Step 1 - Project Setup & Structure
Initializing the Project
bash
# Create project directory
mkdir todo-app
cd todo-app

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express mongoose ejs method-override express-session bcryptjs
npm install -D nodemon

# Create folder structure
mkdir -p src/{config,models,controllers,routes,views/layouts} public/css public/js
Folder Structure:

text
todo-app/
├── src/
│   ├── config/     # Database configuration
│   ├── models/     # Data models (Mongoose)
│   ├── controllers/# Business logic
│   ├── routes/     # API routes
│   └── views/      # EJS templates
├── public/         # Static files
└── server.js       # Entry point
