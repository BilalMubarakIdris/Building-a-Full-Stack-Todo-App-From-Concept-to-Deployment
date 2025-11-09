const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", (req, res) => res.redirect("/tasks"));
router.get("/login", authController.getLogin);
router.get("/register", authController.getRegister);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);

module.exports = router;
