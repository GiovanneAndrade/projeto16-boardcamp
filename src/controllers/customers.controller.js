import * as allCustomers from "../resositories/customers.repository.js";
import * as allGames from "../resositories/games.repository.js";

async function getCustomersController(req, res) {
  const { cpf } = req.query;
  const toQuery = "customers";
  const toWhere = "cpf";
  const toValue = cpf;
  if (cpf) {
    const resultCpfQuery = await allGames.getQueryGamesRepoditory({
      toValue,
      toQuery,
      toWhere,
    });
    return res.send(resultCpfQuery.rows);
  }
  try {
    const result = await allCustomers.getCustomersRepository();
    return res.send(result.rows);
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
}



export { getCustomersController };
