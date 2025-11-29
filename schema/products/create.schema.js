const Joi = require("joi");

const createProductScheam = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().trim(),
  price: Joi.number().required(),
  imageUrl: Joi.string().trim()
})

module.exports = createProductScheam