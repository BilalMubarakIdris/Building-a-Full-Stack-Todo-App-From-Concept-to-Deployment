const express = require("express");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
const { addUserToViews } = require("./src/middleware/authMiddleware"); // Add this line

// Import database connection
const connectDB = require("./src/config/db");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));

// Session configuration
app.use(
  session({
    secret: "your-secret-key-change-this-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

// Add user to all views - ADD THIS MIDDLEWARE
app.use(addUserToViews);

// EJS configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Routes
app.use("/", require("./src/routes/authRoutes"));
app.use("/tasks", require("./src/routes/taskRoutes"));

// Basic route for testing
app.get("/", (req, res) => {
  res.redirect("/login");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
