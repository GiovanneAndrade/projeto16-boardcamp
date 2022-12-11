import * as allRentals from "../resositories/rentals.repository.js";
import * as allCustomers from "../resositories/customers.repository.js";
import dayjs from "dayjs";
async function getRentalsController(req, res) {
  let consult = req.query.customerId;
  let consultWhere = "customers.id";
  function organizedResult(result) {
    const response = result.rows.map((rentals) => {
      return {
        id: rentals.id,
        customerId: rentals.customerId,
        gameId: rentals.gameId,
        rentDate: rentals.rentDate,
        daysRented: rentals.daysRented,
        returnDate: rentals.returnDate,
        originalPrice: rentals.originalPrice,
        delayFee: rentals.delayFee,
        customer: {
          id: rentals.customerId,
          name: rentals.customerName,
        },
        game: {
          id: rentals.gameId,
          name: rentals.gameName,
          categoryId: rentals.categoryId,
          categoryName: rentals.categoryName,
        },
      };
    });
    return res.status(200).send(response);
  }

  try {
    if (consult) {
      const result = await allRentals.getRentalsRepoditory({
        consult,
        consultWhere,
      });
      return organizedResult(result);
    } else {
      consult = req.query.gameId;
      consultWhere = "games.id";
      const result = await allRentals.getRentalsRepoditory({
        consult,
        consultWhere,
      });
      return organizedResult(result);
    }
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
}

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

async function postIdRentalsController(req, res) {
  const { id } = req.params;
  const consult = "rentals";
  const consultRentals = await allCustomers.getIdCustomersRepository({
    id,
    consult,
  });

  const { rentDate, daysRented, originalPrice } = consultRentals.rows[0];
  const date = dayjs().format("YYYY-MM-DD");
  const isDelay = dayjs().diff(rentDate, "day");
  let delayFee;
  if (isDelay > daysRented) delayFee = isDelay - daysRented;
  else delayFee = 0;
  delayFee = delayFee * originalPrice;
  try {
    await allRentals.postIdRentalsRepoditory({ date, delayFee, id });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
}

async function deleteIdRentalsController(req, res) {
  const { id } = req.params;
  try {
    await allRentals.deleteIdRentalsRepoditory({ id });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
}

export {
  getRentalsController,
  postRentalsController,
  postIdRentalsController,
  deleteIdRentalsController,
};
