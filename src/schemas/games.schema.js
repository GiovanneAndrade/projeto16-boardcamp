import Joi from "joi";

const postGamesSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  image: Joi.string().trim().required(),
  stockTotal: Joi.number().required().min(1),
  categoryId: Joi.number().required(),
  pricePerDay: Joi.number().required().min(1),
});
export { postGamesSchema };
