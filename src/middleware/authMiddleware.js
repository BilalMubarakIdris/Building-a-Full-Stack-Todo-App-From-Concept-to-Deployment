// Middleware to make user available to all views
const addUserToViews = (req, res, next) => {
  // Make user available to all EJS templates
  res.locals.user = req.session.userId
    ? {
        id: req.session.userId,
        username: req.session.username,
      }
    : null;
  next();
};

module.exports = { addUserToViews };
