const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product"
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model("Review", reviewSchema);