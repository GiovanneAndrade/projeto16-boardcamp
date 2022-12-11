import * as allCategories from "../resositories/categories.repository.js";
import { postCategorySchema } from "../schemas/categories.schema.js";

const postcategoryMiddlewares = async function (req, res, next) {
  const consult = 'categories'
  let { name } = req.body;
  name = name.replace(/[^a-z0-9]/gi, "");
  const result = await allCategories.getCategoryRepository(consult);
  const validationName = result.rows.filter(
    (i) => i.name.replace(/[^a-z0-9]/gi, "") === name
  );
 
  if (validationName.length > 0) {
    return res.sendStatus(409);
  }

  const valiCadastro = postCategorySchema.validate(req.body, {
    abortEarly: false,
  });
  if (valiCadastro.error) {
    /* const erro = valiCadastro.error.details.map((err) => err.message); */
    return res.sendStatus(400);
  }
  next();
};
export { postcategoryMiddlewares };
