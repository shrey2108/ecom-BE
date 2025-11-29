const router = require("express").Router();
const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const reviewRoutes = require("./review.routes");
const wishlistRoutes = require("./wishlist.routes");

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
// router.use("/products/:productId/reviews", reviewRoutes);
router.use("/reviews", reviewRoutes);
router.use("/wishlist", wishlistRoutes);

module.exports = router;