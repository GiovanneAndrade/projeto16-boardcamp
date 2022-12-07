import Joi from "joi";
import * as allCategories from "../resositories/categories.repository.js";

const urlSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
});

const postcategoryMiddlewares = async function (req, res, next) {
  let { name } = req.body;
  name = name.replace(/[^a-z0-9]/gi, "");
  const result = await allCategories.getCategoryRepoditory();
  const validationName = result.rows.filter(
    (i) => i.name.replace(/[^a-z0-9]/gi, "") === name
  );
  console.log(validationName);
  if (validationName.length > 0) {
    return res.sendStatus(400);
  }

  const valiCadastro = urlSchema.validate(req.body, { abortEarly: false });
  if (valiCadastro.error) {
    const erro = valiCadastro.error.details.map((err) => err.message);
    return res.sendStatus(409);
  }
  next();
};
export { postcategoryMiddlewares };
