import * as allCategories from "../resositories/categories.repository.js";

async function getCategoryController(req, res) {
  try {
    const result = await allCategories.getCategoryRepoditory();
    
    return res.send(result.rows);
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
}
async function postCategoryController(req, res) {
  let { name } = req.body
  name = name.trim().replace(/( )+/g, " ");
  try {
    await allCategories.postCategoryRepoditory(name);
   
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
}

export { getCategoryController, postCategoryController };
