import * as allRentals from "../resositories/rentals.repository.js";
import * as allCustomers from "../resositories/customers.repository.js";


async function postRentalsController(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const id = gameId;
  const consult = "games";
  const rentDate = new Date().toLocaleDateString();
  const pricePerDay = await allCustomers.getIdCustomersRepository({
    id,
    consult,
  });
  const originalPrice = pricePerDay.rows[0].pricePerDay * daysRented;
  const returnDate = null;
  const delayFee = null;
  try {
    await allRentals.postRentalsRepoditory({
      customerId,
      gameId,
      daysRented,
      rentDate,
      originalPrice,
      returnDate,
      delayFee,
    });
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
}

export {   postRentalsController };
