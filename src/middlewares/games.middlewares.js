import * as allCategories from "../resositories/categories.repository.js";
import { postGamesSchema } from "../schemas/games.schema.js";

const postGamesMiddlewares = async function (req, res, next) {
  let { name, categoryId, stockTotal, pricePerDay } = req.body;

  let consult = "games";
  const resultGames = await allCategories.getCategoryRepository(consult);
  name = name.replace(/[^a-z0-9]/gi, "");
  const validationName = resultGames.rows.filter(
    (i) => i.name.replace(/[^a-z0-9]/gi, "") === name
  );
  if (validationName.length > 0 ) {
    return res.sendStatus(409);
  }
  
  consult = "categories";
  const resultCategories = await allCategories.getCategoryRepository(consult);
  const validationCategories = resultCategories.rows.filter(
    (i) => i.id === categoryId
  );

  const valiCadastro = postGamesSchema.validate(req.body, {
    abortEarly: false,
  });
  if (valiCadastro.error || validationCategories.length === 0 ) {
    return res.sendStatus(400);
  }
  next();
};
export { postGamesMiddlewares };
