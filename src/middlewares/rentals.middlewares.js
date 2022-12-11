import * as allCustomers from "../resositories/customers.repository.js";
import * as allRentals from "../resositories/rentals.repository.js";

async function postRentalsMiddlewares(req, res, next) {
  const convertgameId = Number(req.body.gameId);
  const convertCustomerId = Number(req.body.customerId);
  const convertDaysRented = Number(req.body.daysRented);
  
  if (!convertDaysRented || !convertCustomerId || !convertgameId) {
    return res.send("customerId, gameId, daysRented error");
  }
  let { customerId, gameId, daysRented } = req.body;
  daysRented = Number(daysRented) * 1;
  let id = gameId;
  let consult = "games";
  const consultGames = await allCustomers.getIdCustomersRepository({
    id,
    consult,
  });

  id = customerId;
  consult = "customers";
  const consultCustomers = await allCustomers.getIdCustomersRepository({
    id,
    consult,
  });

  let consultRentals = await allRentals.getConsultRentalsRepoditory({ gameId });
  consultRentals = consultRentals.rows.filter((i) => i.returnDate === null);
  consultRentals = consultRentals.length - 1;

  if (
    daysRented === 0 ||
    consultCustomers.rows.length === 0 ||
    consultGames.rows.length === 0 ||
    consultGames.rows[0].stockTotal < consultRentals
  ) {
    return res.sendStatus(404);
  }
  next();
}
export { postRentalsMiddlewares };
