const Product = require("../models/product.model");
const api = require("../utils/api");
const { Types } = require("mongoose");

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    api.success(res, products);
  } catch (error) {
    api.error(res, error.message, "Error in fetching all products");
  }
}

module.exports.getProduct = async (req, res) => {
  try {
    const query = [
      {
        $match: {
          _id: new Types.ObjectId(`${req.params.id}`)
        }
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "productId",
          as: "reviews",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
              }
            },
            {
              $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: false
              }
            },
            {
              $project: {
                comment: 1,
                rating: 1,
                user: {
                  name: 1,
                  email: 1
                }
              }
            }
          ]
        }
      }
    ];

    const [product] = await Product.aggregate(query);
    api.success(res, product);
  } catch (error) {
    api.error(res, error.message, "Error in fetching the product");
  }
}

module.exports.createProduct = async (req, res) => {
try {
    const product = await Product.create({...req.body, sellerId: req.user.id});
    api.success(res, product);
  } catch (error) {
    api.error(res, error.message, "Error in creating the product");
  }
}

module.exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    api.success(res, product);
  } catch (error) {
    api.error(res, error.message, "Error in updating the product");
  }
}

module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    api.success(res, product);
  } catch (error) {
    api.error(res, error.message, "Error in deleting the product");
  }
}

