import * as allUrls from '../resositories/categories.repository.js'

async function getCategoryController(req, res) {
  try {
    const result = await allUrls.getCategoryRepoditory();
    return res.send(result.rows);
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
}

export { getCategoryController };
