const controller = require("../controllers/review.controller");
const { isAuthenticated } = require("../middlewares/auth");
const router = require("express").Router();

router.post("/products/:productId", isAuthenticated, controller.createReview);
router.get("/", controller.getAllReviews);

module.exports = router;