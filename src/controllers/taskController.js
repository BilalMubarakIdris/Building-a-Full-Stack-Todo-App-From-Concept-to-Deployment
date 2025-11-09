const Task = require("../models/Task");

// Middleware to protect routes
exports.requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};

// Get all tasks for user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.session.userId }).sort({
      createdAt: -1,
    });

    res.render("tasks/index", {
      title: "My Tasks",
      tasks,
      currentPage: "tasks",
    });
  } catch (error) {
    res.render("tasks/index", {
      title: "My Tasks",
      tasks: [],
      error: "Failed to load tasks",
    });
  }
};

// Show new task form - ADD THIS METHOD
exports.getNewTaskForm = (req, res) => {
  res.render("tasks/new", {
    title: "Add New Task",
  });
};

// Show edit task form - ADD THIS METHOD
exports.getEditTaskForm = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.session.userId,
    });

    if (!task) {
      return res.redirect("/tasks");
    }

    res.render("tasks/edit", {
      title: "Edit Task",
      task,
    });
  } catch (error) {
    res.redirect("/tasks");
  }
};

// Create new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    await Task.create({
      title,
      description,
      priority,
      dueDate: dueDate || null,
      user: req.session.userId,
    });

    res.redirect("/tasks");
  } catch (error) {
    res.render("tasks/new", {
      title: "Add Task",
      error: "Failed to create task",
      formData: req.body,
    });
  }
};

// Update task
// In your taskController.js - UPDATE THIS METHOD
exports.updateTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;

    await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.session.userId },
      {
        title: title || undefined,
        description: description || undefined,
        priority: priority || undefined,
        dueDate: dueDate || null,
        // FIX: Handle both checkbox and hidden input
        completed: completed === "on" || completed === "true",
      }
    );

    res.redirect("/tasks");
  } catch (error) {
    console.error("Update task error:", error);
    res.redirect("/tasks");
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.session.userId,
    });
    res.redirect("/tasks");
  } catch (error) {
    res.redirect("/tasks");
  }
};
