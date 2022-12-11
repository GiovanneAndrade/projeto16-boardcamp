import * as allCustomers from "../resositories/customers.repository.js";
import * as allRentals from "../resositories/rentals.repository.js";


 
async function postRentalsMiddlewares(req, res, next) {
 

 
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
    return res.sendStatus(400);
  }
  next();
}

async function postIdRentalsMiddlewares(req, res, next) {
  let { id } = req.params;
  id = Number(id) * 1;
  if (!id) {
    return res.status(404).send("id not specified");
  }
  const consult = "rentals";
  const consultRentals = await allCustomers.getIdCustomersRepository({
    id,
    consult,
  });
  if (consultRentals.rows.length === 0) {
    return res.sendStatus(404);
  }
  const { returnDate } = consultRentals.rows[0];
  if (returnDate) {
    return res.sendStatus(400);
  }
  next();
}

async function deleteIdRentalsMiddlewares(req, res, next) {
  let { id } = req.params;
  id = Number(id) * 1;
  if (!id) {
    return res.status(404).send("id not specified");
  }
  const consult = "rentals";
  const consultRentals = await allCustomers.getIdCustomersRepository({
    id,
    consult,
  });
  if (consultRentals.rows.length === 0) {
    return res.sendStatus(404);
  }
  const { returnDate } = consultRentals.rows[0];
  if (!returnDate) {
    return res.sendStatus(400);
  }
  next();
}



export {
  
  postRentalsMiddlewares,
  postIdRentalsMiddlewares,
  deleteIdRentalsMiddlewares,
};
