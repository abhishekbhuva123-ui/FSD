const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userCntroler = require("../controllers/users.js");

router
  .route("/signup")
  .get(userCntroler.renderSignupForm)
  .post(wrapAsync(userCntroler.signup));

router
  .route("/login")
  .get(userCntroler.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    wrapAsync(userCntroler.login),
  );

router.get("/logout", userCntroler.logout);

module.exports = router;
