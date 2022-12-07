import Joi from "joi";


const postCategorySchema = Joi.object().keys({
  name: Joi.string().trim().required(),
});
export {
  postCategorySchema
}