const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.review.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New review created");
  res.redirect(`/listing/${req.params.id}`);
};

module.exports.destroyReview = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.id, {
    $pull: { review: req.params.review_id },
  });
  await Review.findByIdAndDelete(req.params.review_ia);
  req.flash("success", "review deleted");
  res.redirect(`/listing/${req.params.id}`);
};
