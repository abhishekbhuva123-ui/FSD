const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  let listings = await Listing.find({});
  res.render("listings/index", { listings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    res.redirect("/listing");
  } else {
    res.render("listings/show", { listing });
  }
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.secure_url || req.file.url || req.file.path;
  let filename = req.file.public_id || req.file.filename;

  console.log(url, filename);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New listing created");
  res.redirect("/listing");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested update does not exist");
    res.redirect("/listing");
  } else {
    res.render("listings/edit", { listing });
  }
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, req.body.listing);
  if (req.file) {
    let url = req.file.secure_url || req.file.url || req.file.path;
    let filename = req.file.public_id || req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Update Listing");
  res.redirect("/listing");
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Delete Listing");
  res.redirect("/listing");
};
