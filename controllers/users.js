const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);

    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      } else {
        req.flash("success", "Welcome to Wonderlast!");
        res.redirect("/listing");
      }
    });
  } catch (e) {
    console.log(e);
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Login successful on Wonderlust!");
  if (res.locals.redirectUrl) {
    res.redirect(res.locals.redirectUrl);
  } else {
    res.redirect("/listing");
  }
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    } else {
      req.flash("success", "You are log out");
      res.redirect("/listing");
    }
  });
};
