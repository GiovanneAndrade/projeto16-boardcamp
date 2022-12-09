import * as allGames from "../resositories/games.repository.js";

async function getGamesController(req, res) {
  const { name } = req.query
  const toQuery = 'games'
  const toWhere =   'name'
  const toValue = name
  if(name){
    const resultGameQuery = await allGames.getQueryGamesRepoditory({toValue, toQuery, toWhere});
    return res.send(resultGameQuery.rows);
  }
  try {
    const result = await allGames.getGamesRepoditory();
    return res.send(result.rows);
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
}

async function postGamesController(req, res) {
  let { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  name = name.trim().replace(/( )+/g, " ");
  try {
    await allGames.postGamesRepository({
      name,
      image,
      stockTotal,
      categoryId,
      pricePerDay,
    });

    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
}

export { getGamesController, postGamesController };
