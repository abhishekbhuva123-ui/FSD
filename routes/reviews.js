const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {
  isLoggedIn,
  validateReview,
  isReviewAuthor,
} = require("../middleware.js");
const reviewContrller = require("../controllers/reviews.js");

//Reviews post route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewContrller.createReview),
);

//Delete Review Route
router.delete(
  "/:review_id",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewContrller.destroyReview),
);

module.exports = router;
