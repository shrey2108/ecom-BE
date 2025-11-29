const Review = require("../models/review.model");
const api = require("../utils/api");

module.exports.createReview = async (req, res) => {
  try {
    // console.log(req.params)
    const productId = req.params.productId;
    // console.log(productId)
    const { comment, rating } = req.body;
    const userId = req.user.id;
    const review = await Review.create({ comment, rating, productId, userId });
    api.success(res, review, "Review created successfully");
  } catch (error) {
    api.error(res, error.message, "Something went wrong in creating review");
  }
};

module.exports.updateReview = async (req, res) => {
  try {
    // find perticular review (userId)
    // req.user.id
  } catch (error) {
    api.error(res, error.message, "Something went wrong in creating review");
  }
};

module.exports.deleteReview = async (req, res) => {
  try {
    
  } catch (error) {
    api.error(res, error.message, "Something went wrong in creating review");
  }
};

module.exports.getAllReviews = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = Review.find({productId})
    api.success(res, reviews);

  } catch (error) {
    api.error(res, error.message, "Something went wrong in creating review");
  }
};
