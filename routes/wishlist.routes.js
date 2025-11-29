const router = require("express").Router();
const controller = require("../controllers/wishlist.controller");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/", isAuthenticated, controller.getWishlist);
router.post("/", isAuthenticated, controller.addOrRemove);

module.exports = router;