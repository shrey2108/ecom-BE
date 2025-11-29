const router = require("express").Router();
const controller = require("../controllers/product.controller");
const { isAuthenticated, isSeller } = require("../middlewares/auth");
const { validateRequest } = require("../middlewares/validateRequest");
const createProductScheam = require("../schema/products/create.schema");
const reviewRoutes = require("./review.routes")

router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProduct);


router.post("/", 
  validateRequest(createProductScheam), 
  isAuthenticated, 
  isSeller,
  controller.createProduct
);

router.put("/:id",
  isAuthenticated,
  isSeller,
  controller.updateProduct
);
router.delete("/:id", 
  isAuthenticated,
  isSeller,
  controller.deleteProduct
);


module.exports = router;