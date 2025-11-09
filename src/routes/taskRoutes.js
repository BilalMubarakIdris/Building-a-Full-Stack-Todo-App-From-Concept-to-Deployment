const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Protect all task routes
router.use(taskController.requireAuth);

// Task routes - ADD THE MISSING ROUTES
router.get("/", taskController.getTasks);
router.get("/new", taskController.getNewTaskForm); // ADD THIS LINE
router.post("/", taskController.createTask);
router.get("/:id/edit", taskController.getEditTaskForm); // ADD THIS LINE
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
