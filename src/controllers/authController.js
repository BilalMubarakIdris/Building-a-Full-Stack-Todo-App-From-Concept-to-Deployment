const User = require("../models/User");

exports.getLogin = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

exports.getRegister = (req, res) => {
  res.render("auth/register", { title: "Register" });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (password !== confirmPassword) {
      return res.render("auth/register", {
        error: "Passwords do not match",
        username,
        email,
      });
    }

    const user = await User.create({ username, email, password });

    // Store user info in session - ADD THESE LINES
    req.session.userId = user._id;
    req.session.username = user.username; // Store username in session

    res.redirect("/tasks");
  } catch (error) {
    res.render("auth/register", {
      error: "Registration failed. Please try again.",
      ...req.body,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.render("auth/login", {
        error: "Invalid email or password",
        email,
      });
    }

    // Store user info in session - ADD THESE LINES
    req.session.userId = user._id;
    req.session.username = user.username; // Store username in session

    res.redirect("/tasks");
  } catch (error) {
    res.render("auth/login", {
      error: "Login failed. Please try again.",
      email: req.body.email,
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/tasks");
    }
    res.redirect("/");
  });
};
