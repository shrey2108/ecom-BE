const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  sellerId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
