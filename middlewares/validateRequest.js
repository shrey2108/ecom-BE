const Joi = require("joi");
// const createProductSchema = require("../schema/products/create.schema");
// const updateProductSchema = require("../schema/products/update.schema");
const api = require("../utils/api");

module.exports.validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if(error){
      const errorMgs = error.details.map(err => err.message);
      return api.error(res, errorMgs, "Validation failed", 400);
    }

    req.body = value;
    next();
  }
}

// module.exports.validateCreateProduct = (req, res, next) => {
//   const { error, value } = createProductSchema.validate(req.body, { abortEarly: false });
//   console.log(error);
//   if(error){
//     const errorMgs = error.details.map(err => err.message);
//     return api.error(res, errorMgs, "Validation failed", 400);
//   }
//   req.body = value;
//   next();
// }

// module.exports.validateUpdateProduct = (req, res, next) => {
//   const { error, value } = updateProductSchema.validate(req.body, { abortEarly: false });
//   console.log(error);
//   if(error){
//     const errorMgs = error.details.map(err => err.message);
//     return api.error(res, errorMgs, "Validation failed", 400);
//   }

//   req.body = value;
//   next();
// }